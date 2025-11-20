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
const comments_1 = __importDefault(require("../database/models/comments"));
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../config/logger"));
class CommentRepository {
    constructor() {
        // 댓글작성
        this.createComment = (commentPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "CommentRepository",
                functionName: "createComment",
            });
            return yield comments_1.default.create({
                userId: commentPayment.userId,
                postId: commentPayment.postId,
                content: commentPayment.content,
                userNickname: commentPayment.userNickname,
            });
        });
        // 댓글수정
        this.modifyComment = (commentPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "CommentRepository",
                functionName: "modifyComment",
            });
            yield comments_1.default.update({
                content: commentPayment.comment,
            }, {
                where: {
                    id: commentPayment.commentId,
                },
            });
        });
        // 해당댓글조회
        this.getComment = (commentPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "CommentRepository",
                functionName: "getComment",
            });
            return yield comments_1.default.findOne({
                where: {
                    id: commentPayment.commentId,
                },
            });
        });
        // 해당 게시물의 댓글들을 조회
        // lastId방식으로 10개씩 가져오자
        this.getComments = (commentPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "CommentRepository",
                functionName: "getComments",
            });
            let where = {};
            if (commentPayment.commentLastId != null) {
                where = {
                    id: {
                        [sequelize_1.Op.lt]: commentPayment.commentLastId,
                    },
                    postId: commentPayment.postId,
                };
            }
            else {
                where = {
                    postId: commentPayment.postId,
                };
            }
            return yield comments_1.default.findAll({
                attributes: ["id", "nickname", "content", "createdAt"],
                limit: 10,
                order: [["createdAt", "desc"]],
                where,
            });
        });
        // 게시물삭제
        this.deleteComment = (commentPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "CommentRepository",
                functionName: "deleteComment",
            });
            yield comments_1.default.destroy({
                where: { id: commentPayment.commentId, userId: commentPayment.userId },
            });
        });
        this.existComment = (params) => __awaiter(this, void 0, void 0, function* () {
            let id;
            if ("object" == typeof params) {
                id = params.commentId;
            }
            else {
                id = params;
            }
            logger_1.default.info("", {
                layer: "Repository",
                className: "CommentRepository",
                functionName: "existComment",
            });
            return yield comments_1.default.findOne({
                where: {
                    id,
                },
            });
        });
    }
}
exports.default = CommentRepository;
