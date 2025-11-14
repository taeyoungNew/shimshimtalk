"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const posts_1 = __importDefault(require("../database/models/posts"));
const comments_1 = __importDefault(require("../database/models/comments"));
const logger_1 = __importDefault(require("../config/logger"));
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
class PostRepository {
    constructor() {
        this.findPostById = (postId) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "findPostById",
            });
            const id = postId.postId;
            return yield posts_1.default.findByPk(id);
        });
        // Post 작성
        this.createPost = (postInfo) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "createPost",
            });
            return yield posts_1.default.create({
                userId: postInfo.userId,
                content: postInfo.content,
            });
        });
        // 한 게시물만 조회
        this.getPost = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "getPost",
            });
            let id;
            let postUserId;
            if ("object" == typeof params) {
                id = params.postId;
                postUserId = params.postUserId;
            }
            else {
                id = params;
            }
            const isLikedLiteral = params.userId
                ? sequelize_2.default.literal(`(
          SELECT CASE
            WHEN COUNT(*) > 0
            THEN true
            ELSE false
              END
            FROM PostLikes AS postLikes
            WHERE postLikes.postId = Posts.id
              AND postLikes.userId = '${params.userId}'
          )`)
                : sequelize_2.default.literal(`0`);
            const isFollowingLiteral = params.postUserId
                ? sequelize_2.default.literal(`(
        SELECT CASE
          WHEN COUNT(*) > 0
          THEN true
          ELSE false
           END
          FROM Follows as follows
         WHERE follows.followerId = '${params.userId}'
           AND follows.followingId = '${params.postUserId}'
      
      )`)
                : sequelize_2.default.literal(`0`);
            return yield posts_1.default.findOne({
                attributes: {
                    exclude: ["Posts.id"],
                    include: [
                        [
                            sequelize_2.default.literal(`(
              select userinfo.nickname
                FROM Users AS users
           LEFT JOIN UserInfos AS userinfo
                  ON users.id = userinfo.userId
               WHERE users.id = Posts.userId
            )`),
                            "userNickname",
                        ],
                        [
                            sequelize_2.default.literal(`(
              SELECT COUNT(*)
                FROM PostLikes AS postLike
               WHERE postLike.postId = Posts.id
            )`),
                            "likeCnt",
                        ],
                        [isLikedLiteral, "isLiked"],
                        [isFollowingLiteral, "isFollowinged"],
                    ],
                },
                include: {
                    model: comments_1.default,
                    attributes: ["id", "postId", "userId", "content", "createdAt"],
                },
                where: { id },
            });
        });
        // Post 수정
        this.modifyPost = (postInfo) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "modifyPost",
            });
            yield posts_1.default.update({
                content: postInfo.content,
            }, {
                where: {
                    userId: postInfo.userId,
                    id: postInfo.postId,
                },
            });
        });
        // user의 Post 불러오기
        this.getUserPosts = (param) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "getUserPosts",
            });
            let where = {};
            param.postLastId != null
                ? (where = {
                    id: {
                        [sequelize_1.Op.lt]: param.postLastId,
                    },
                    userId: param.userId,
                })
                : (where = {
                    userId: param.userId,
                });
            return yield posts_1.default.findAll({
                attributes: {
                    exclude: ["Posts.id"],
                    include: [
                        [
                            sequelize_2.default.literal(`(
              select userinfo.nickname
                FROM Users AS users
           LEFT JOIN UserInfos AS userinfo
                  ON users.id = userinfo.userId
               WHERE users.id = Posts.userId
            )`),
                            "userNickname",
                        ],
                        [
                            sequelize_2.default.literal(`(
              SELECT COUNT(*)
                FROM PostLikes AS postLike
               WHERE postLike.postId = Posts.id
            )`),
                            "likeCnt",
                        ],
                    ],
                },
                include: {
                    model: comments_1.default,
                    attributes: ["id", "postId", "userId", "content", "createdAt"],
                },
                group: ["Posts.id"],
                where,
                limit: 50,
                order: [["createdAt", "desc"]],
            });
        });
        // Post 모두 불러오기
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "getAllPosts",
            });
            return yield posts_1.default.findAll({
                attributes: {
                    exclude: ["Posts.id"],
                    include: [
                        [
                            sequelize_2.default.literal(`(
              select userinfo.nickname
                FROM Users AS users
           LEFT JOIN UserInfos AS userinfo
                  ON users.id = userinfo.userId
               WHERE users.id = Posts.userId
            )`),
                            "userNickname",
                        ],
                        [
                            sequelize_2.default.literal(`(
              SELECT COUNT(*)
                FROM PostLikes AS postLike
               WHERE postLike.postId = Posts.id
            )`),
                            "likeCnt",
                        ],
                        [
                            sequelize_2.default.literal(`(
              SELECT COUNT(*)
                FROM Comments AS comments
               WHERE comments.postId = Posts.id
              )`),
                            "commentCnt",
                        ],
                    ],
                },
                include: [
                    {
                        model: comments_1.default,
                        attributes: ["id", "userId", "userNickname", "content"],
                    },
                ],
                group: ["Posts.id", "Comments.id"],
                order: [["createdAt", "desc"]],
                subQuery: false,
            });
        });
        // Post 삭제
        this.deletePost = (param) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "deletePost",
            });
            yield posts_1.default.destroy({ where: { id: param.postId, userId: param.userId } });
        });
        // 게시물 존재유무확인
        this.existPost = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostRepository",
                functionName: "existPost",
            });
            return yield posts_1.default.findOne({
                where: {
                    id: params.postId,
                },
            });
        });
    }
}
exports.default = PostRepository;
