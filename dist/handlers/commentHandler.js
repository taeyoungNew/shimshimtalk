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
const commentService_1 = __importDefault(require("../service/commentService"));
const commentExp_1 = require("../common/validators/commentExp");
const userIdCache_1 = require("../common/cacheLocal/userIdCache");
const logger_1 = __importDefault(require("../config/logger"));
const postCache_1 = require("../common/cacheLocal/postCache");
const postService_1 = __importDefault(require("../service/postService"));
const userPostsCache_1 = require("../common/cacheLocal/userPostsCache");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
const customError_1 = require("../errors/customError");
/**
 * Comment handler
 */
class CommentHandler {
    constructor() {
        this.commentService = new commentService_1.default();
        this.postService = new postService_1.default();
        // 댓글작성
        this.createComent = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/comment/:postId",
                    layer: "Handlers",
                    className: "CommentHandler",
                    functionName: "createComent",
                });
                // 유저의 id가져오기
                const userId = res.locals.userInfo.userId;
                const postId = req.params.postId;
                const { authorization } = req.cookies;
                const [_, token] = authorization.split(" ");
                const getUserLoginInfo = JSON.parse(yield userIdCache_1.userCache.get(`token:${token}`));
                if (!(0, commentExp_1.commentContentExp)(req.body.comment))
                    throw new customError_1.CustomError(error_codes_json_1.default.COMMENT.VALIDATION_ERROR.status, error_codes_json_1.default.COMMENT.VALIDATION_ERROR.code, "200자내로 적어주세요.");
                // 댓글의 형식검사
                const payment = {
                    userId,
                    postId: Number(postId),
                    content: req.body.comment,
                    userNickname: getUserLoginInfo.userNickname,
                };
                const result = yield this.commentService.createComment(payment);
                const plainComment = result.get({ plain: true });
                // 레디스의 해당 게시물의 댓글에도 추가
                const post = yield postCache_1.postCache.get(`post:${postId}`);
                const userPost = yield userPostsCache_1.userPostsCache.get(`post:${postId}`);
                // 해당 댓글이 달린 게시물이 redis에 있는지 확인
                if (!post) {
                    const postPayMent = payment;
                    const getPost = yield this.postService.getPost(postPayMent);
                    getPost.Comments.push(plainComment);
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(getPost), {
                        EX: 600,
                    });
                }
                else {
                    const postParse = yield JSON.parse(post);
                    yield postParse.Comments.push(plainComment);
                    const postListTTL = yield postCache_1.postCache.ttl("posts:list");
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(postParse), {
                        expire: postListTTL,
                    });
                }
                // 해당 댓글이 달린 게시물이 redis에 있는지 확인
                if (!userPost) {
                    const postPayMent = payment;
                    const getPost = yield this.postService.getPost(postPayMent);
                    getPost.Comments.push(plainComment);
                    yield userPostsCache_1.userPostsCache.set(`post:${postId}`, JSON.stringify(getPost), {
                        EX: 600,
                    });
                }
                else {
                    const postParse = yield JSON.parse(userPost);
                    yield postParse.Comments.push(plainComment);
                    const postListTTL = yield userPostsCache_1.userPostsCache.ttl("posts:list");
                    yield userPostsCache_1.userPostsCache.set(`post:${postId}`, JSON.stringify(postParse), {
                        expire: postListTTL,
                    });
                }
                res
                    .status(200)
                    .json({ message: "댓글이 작성되었습니다. ", plainComment });
            }
            catch (e) {
                next(e);
            }
        });
        // 댓글수정
        this.modifyComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "put",
                    url: "api/comment/:commentId",
                    layer: "Handlers",
                    className: "CommentHandler",
                    functionName: "modifyComment",
                });
                const userId = res.locals.userInfo.userId;
                const commentId = req.params.commentId;
                const postId = req.body.postId;
                if (!(0, commentExp_1.commentContentExp)(req.body.comment))
                    throw new customError_1.CustomError(error_codes_json_1.default.COMMENT.VALIDATION_ERROR.status, error_codes_json_1.default.COMMENT.VALIDATION_ERROR.code, "200자내로 적어주세요.");
                const payment = {
                    userId,
                    postId: req.body.postId,
                    commentId: Number(commentId),
                    comment: req.body.comment,
                };
                yield this.commentService.modifyComment(payment);
                const post = yield postCache_1.postCache.get(`post:${postId}`);
                let returnComment;
                if (post) {
                    const postParse = yield JSON.parse(post);
                    const postTTL = yield postCache_1.postCache.ttl(`posts:list`);
                    for (let idx = 0; idx < postParse.Comments.length; idx++) {
                        if (postParse.Comments[idx].id === Number(commentId)) {
                            postParse.Comments[idx].content = req.body.comment;
                            returnComment = postParse.Comments[idx];
                            break;
                        }
                    }
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(postParse), {
                        EX: postTTL,
                    });
                }
                else {
                    const postId = payment;
                    const getPost = yield this.postService.getPost(postId);
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(getPost), {
                        EX: 600,
                    });
                }
                res.status(200).json({
                    message: "해당 댓글이 수정되었습니다.",
                    data: {
                        comment: returnComment,
                    },
                });
            }
            catch (e) {
                next(e);
            }
        });
        // 하나의 댓글불러오기
        this.getComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/comment/:commentId",
                    layer: "Handlers",
                    className: "CommentHandler",
                    functionName: "getComment",
                });
                const commentId = req.params.commentId;
                const payment = {
                    commentId,
                };
                const result = yield this.commentService.getComment(payment);
                return res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
        // 댓글삭제하기
        this.deleteComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                method: "delete",
                url: "api/comment/:commentId",
                layer: "Handlers",
                className: "CommentHandler",
                functionName: "deleteComment",
            });
            try {
                logger_1.default.info("", {
                    method: "delete",
                    url: "api/comment/:commentId",
                    layer: "Handlers",
                    className: "CommentHandler",
                    functionName: "deleteComment",
                });
                const userId = res.locals.userInfo.userId;
                const commentId = req.params.commentId;
                const postId = req.query.postId;
                const payment = {
                    userId,
                    commentId: Number(commentId),
                    postId: Number(postId),
                };
                yield this.commentService.deleteComment(payment);
                const post = yield postCache_1.postCache.get(`post:${postId}`);
                if (post) {
                    const postTtl = yield postCache_1.postCache.ttl(`posts:list`);
                    const postParse = yield JSON.parse(post);
                    postParse.Comments = postParse.Comments.filter((el) => el.id != Number(commentId));
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(postParse), {
                        EX: postTtl,
                    });
                }
                else {
                    const postId = payment;
                    const getPost = yield this.postService.getPost(postId);
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(getPost), {
                        EX: 600,
                    });
                }
                res.status(200).json({ message: "해당 댓글이 삭제되었습니다." });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = CommentHandler;
