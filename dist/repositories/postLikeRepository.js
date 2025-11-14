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
const postlikes_1 = __importDefault(require("../database/models/postlikes"));
const logger_1 = __importDefault(require("../config/logger"));
/**
 * 게시물좋아요 리포지토리
 *
 */
class PostLikeRepository {
    constructor() {
        // 해당게시물 좋아요
        this.postLike = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostLikeRepository",
                functionName: "postLike",
            });
            yield postlikes_1.default.create({
                userId: params.userId,
                postId: params.postId,
            });
        });
        // 해당게시물 좋아요 취소
        this.postLikeCancel = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostLikeRepository",
                functionName: "postLikeCancel",
            });
            yield postlikes_1.default.destroy({
                where: {
                    userId: params.userId,
                    postId: params.postId,
                },
            });
        });
        // 자신이 좋아요를 누른 게시물의 id를 가져오기
        this.getIsLikedPostIds = (param) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostLikeRepository",
                functionName: "getIsLikedPostIds",
            });
            // log;
            return postlikes_1.default.findAll({
                attributes: ["postId"],
                where: {
                    userId: param,
                },
            });
        });
        // 자신의 게시물들이 받은 좋아요 총 갯수
        this.postLikeCnt = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostLikeRepository",
                functionName: "postLikeCnt",
            });
            return postlikes_1.default.findAll({
                attributes: [],
                where: {
                    userId: params.userId,
                },
            });
        });
        this.existPostLike = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "PostLikeRepository",
                functionName: "existPostLike",
            });
            return postlikes_1.default.findOne({
                where: {
                    userId: params.userId,
                    postId: params.postId,
                },
            });
        });
    }
}
exports.default = PostLikeRepository;
