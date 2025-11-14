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
const postLikeService_1 = __importDefault(require("../service/postLikeService"));
const logger_1 = __importDefault(require("../config/logger"));
const postCache_1 = require("../common/cacheLocal/postCache");
class PostLikeHandler {
    constructor() {
        this.postLikeService = new postLikeService_1.default();
        // 게시물 좋아요
        this.postLike = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/post-like/:postId",
                    layer: "Handlers",
                    className: "PostLikeHandler",
                    functionName: "postLike",
                });
                const userId = res.locals.userInfo.userId;
                const postId = Number(req.params.postId);
                const payment = {
                    userId,
                    postId,
                };
                yield this.postLikeService.postLike(payment);
                const post = yield postCache_1.postCache.get(`post:${postId}`);
                // 캐싱된 게시물데이터의 좋아요갯수를 갱신
                if (post) {
                    const postParse = yield JSON.parse(post);
                    postParse.likeCnt = postParse.likeCnt + 1;
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(postParse));
                }
                return res
                    .status(200)
                    .json({ message: "해당 게시물에 좋아요를 눌렀습니다." });
            }
            catch (e) {
                next(e);
            }
        });
        // 게시물 좋아요 취소
        this.postLikeCancel = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "delete",
                    url: "api/post-like/:postId",
                    layer: "Handlers",
                    className: "PostLikeHandler",
                    functionName: "postLikeCancel",
                });
                const userId = res.locals.userInfo.userId;
                const postId = Number(req.params.postId);
                const payment = {
                    userId,
                    postId,
                };
                yield this.postLikeService.postLikeCancel(payment);
                const post = yield postCache_1.postCache.get(`post:${postId}`);
                if (post) {
                    const postParse = yield JSON.parse(post);
                    postParse.likeCnt = postParse.likeCnt - 1;
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(postParse));
                }
                return res
                    .status(200)
                    .send({ message: "해당 게시물에 좋아요를 취소했습니다." });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = PostLikeHandler;
