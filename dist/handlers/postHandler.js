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
const dotenv_1 = __importDefault(require("dotenv"));
const postExp_1 = require("../common/validators/postExp");
const postService_1 = __importDefault(require("../service/postService"));
const logger_1 = __importDefault(require("../config/logger"));
const postCache_1 = require("../common/cacheLocal/postCache");
const userPostsCache_1 = require("../common/cacheLocal/userPostsCache");
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
const followService_1 = __importDefault(require("../service/followService"));
dotenv_1.default.config();
class PostHandler {
    constructor() {
        this.postService = new postService_1.default();
        this.followService = new followService_1.default();
        // 게시물 작성
        this.createPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/post/",
                    layer: "Handlers",
                    className: "PostHandler",
                    functionName: "createPost",
                });
                const userId = res.locals.userInfo.userId;
                const { content } = req.body;
                // content형식체크
                if (!(0, postExp_1.postContentExp)(content))
                    throw new customError_1.CustomError(error_codes_json_1.default.POST.VALIDATION_ERROR.status, error_codes_json_1.default.POST.VALIDATION_ERROR.code, "500자내로 적어주세요. ");
                const postPayment = {
                    userId,
                    content,
                };
                const newPost = yield this.postService.createPost(postPayment);
                // posts:list와 post의 TTL을 조회
                const postListTTL = yield postCache_1.postCache.ttl("posts:list");
                if (postListTTL !== -2) {
                    yield postCache_1.postCache.lPush("posts:list", String(newPost.id));
                    const cacheUserPostIds = yield userPostsCache_1.userPostsCache.lRange(`userPosts:${userId}:List`, 0, -1);
                    if (cacheUserPostIds.length !== 0) {
                        const userPostListTTL = yield userPostsCache_1.userPostsCache.ttl(`userPosts:${userId}:List`);
                        yield userPostsCache_1.userPostsCache.lPush(`userPosts:${userId}:List`, String(newPost.id));
                        yield userPostsCache_1.userPostsCache.expire(`userPosts:${userId}:List`, userPostListTTL);
                        yield userPostsCache_1.userPostsCache.set(`post:${newPost.id}`, JSON.stringify({
                            id: String(newPost.dataValues.id),
                            userId: newPost.dataValues.userId,
                            content: newPost.dataValues.content,
                            userNickname: newPost.dataValues.userNickname,
                            likeCnt: newPost.dataValues.likeCnt,
                            commentCnt: newPost.dataValues.commentCnt,
                            Comments: newPost.dataValues.Comments,
                        }), { EX: userPostListTTL });
                    }
                    yield postCache_1.postCache.expire("posts:list", postListTTL);
                    yield postCache_1.postCache.set(`post:${newPost.id}`, JSON.stringify({
                        id: String(newPost.dataValues.id),
                        userId: newPost.dataValues.userId,
                        content: newPost.dataValues.content,
                        userNickname: newPost.dataValues.userNickname,
                        likeCnt: newPost.dataValues.likeCnt,
                        commentCnt: newPost.dataValues.commentCnt,
                        Comments: newPost.dataValues.Comments,
                    }), { EX: postListTTL });
                }
                else {
                    const postList = [];
                    postList.push(newPost);
                    this.cachePosts(postList);
                    this.cacheUserPosts(postList, userId);
                }
                res.status(200).json({
                    message: "게시물이 작성되었습니다.",
                    data: newPost,
                });
            }
            catch (e) {
                next(e);
            }
        });
        // 게시물 모두조회
        this.getAllPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/post/",
                    layer: "Handlers",
                    className: "PostHandler",
                    functionName: "getAllPosts",
                });
                const postLastId = Number(req.query.postLastId);
                const userId = (_a = res.locals.userInfo) === null || _a === void 0 ? void 0 : _a.userId;
                const ids = yield postCache_1.postCache.lRange("posts:list", 0, -1);
                let isLikedPostIds;
                let isFollowingedUserIds;
                let result = [];
                if (userId) {
                    isLikedPostIds = yield this.postService.getIsLikedPostIds(userId);
                    isFollowingedUserIds = yield this.followService.getFollowings(userId);
                }
                // 첫랜더링
                if (ids.length === 0) {
                    result = yield this.postService.getAllPosts(userId);
                    yield this.cachePosts(result);
                    let posts;
                    if (result.length != 0) {
                        posts = result.splice(0, 5);
                        const isLast = posts.length < 5 ? true : false;
                        return res
                            .status(200)
                            .json({ posts, isLast, isLikedPostIds, isFollowingedUserIds });
                    }
                }
                else {
                    // 두번째랜더링
                    const lastPostIdx = ids.findIndex((id) => {
                        return Number(id) === Number(postLastId);
                    });
                    const targetIds = ids.slice(lastPostIdx + 1, lastPostIdx + 6);
                    const postJsons = yield Promise.all(targetIds.map((id) => postCache_1.postCache.get(`post:${id}`)));
                    const posts = postJsons.map((post) => JSON.parse(post));
                    const isLast = posts.length < 5 ? true : false;
                    return res
                        .status(200)
                        .json({ posts, isLast, isLikedPostIds, isFollowingedUserIds });
                }
            }
            catch (e) {
                next(e);
            }
        });
        // 한 게시물만 조회
        this.getPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/post/:postId",
                    layer: "Handlers",
                    className: "PostHandler",
                    functionName: "getPost",
                });
                const userId = (_a = res.locals.userInfo) === null || _a === void 0 ? void 0 : _a.userId;
                const postId = Number(req.query.postId);
                const postUserId = req.query.postUserId;
                const payload = { postId, userId, postUserId };
                const ids = yield postCache_1.postCache.lRange("posts:list", 0, -1);
                // 그전에 레디스에 데이터들이 있는지 확인
                if (ids.length === 0) {
                    const result = yield this.postService.getAllPosts(userId);
                    yield this.cachePosts(result);
                }
                // 레디스에서 확인
                const checkPostId = ids.find((id) => id === postId);
                let result;
                // 레디스에 해당 게시물이 있으면 반환
                if (checkPostId) {
                    const postStr = yield postCache_1.postCache.get(`post:${checkPostId}`);
                    result = JSON.parse(postStr);
                }
                else {
                    result = yield this.postService.getPost(payload);
                    result.dataValues.isLiked =
                        result.dataValues.isLiked === 0 ? false : true;
                    result.dataValues.isFollowinged =
                        result.dataValues.isFollowinged === 0 ? false : true;
                    postCache_1.postCache.set(`post:${result.dataValues.id}`, JSON.stringify({
                        id: result.dataValues.id,
                        userId: result.dataValues.userId,
                        isLiked: result.dataValues.isLiked,
                        content: result.dataValues.content,
                        userNickname: result.dataValues.userNickname,
                        likeCnt: result.dataValues.likeCnt,
                        isFollowinged: result.dataValues.isFollowinged,
                        commentCnt: result.dataValues.commentCnt,
                        Comments: result.dataValues.Comments,
                    }), { EX: 600 });
                }
                // 레디스에 없으면 DB에서 가져오고 redis에도 저장
                res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
        // 게시물 수정
        this.modifyPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "put",
                    url: "api/post/:postId",
                    layer: "Handlers",
                    className: "PostHandler",
                    functionName: "modifyPost",
                });
                // 수정대상게시물의 id
                const postId = Number(req.params.postId);
                const postUserId = req.query.postUserId;
                // 현재로그인한 유저의 id
                const userId = res.locals.userInfo.userId;
                const { content } = req.body;
                // content형식체크
                if (!(0, postExp_1.postContentExp)(content))
                    throw new customError_1.CustomError(error_codes_json_1.default.POST.VALIDATION_ERROR.status, error_codes_json_1.default.POST.VALIDATION_ERROR.code, "500자내로 적어주세요. ");
                const modifyPayment = {
                    userId,
                    postId,
                };
                yield this.postService.isUserPost(modifyPayment);
                const payment = {
                    userId,
                    postId,
                    content,
                };
                // DB데이터를 우선으로 수정
                yield this.postService.modifyPost(payment);
                // read-through적용
                // 캐싱정보가져오기
                let postParse;
                const post = yield postCache_1.postCache.get(`post:${postId}`);
                if (post) {
                    postParse = yield JSON.parse(post);
                    postParse.content = content;
                    yield postCache_1.postCache.set(`post:${postId}`, JSON.stringify(postParse));
                    yield userPostsCache_1.userPostsCache.set(`post:${postId}`, JSON.stringify(postParse));
                }
                else {
                    // redis에 해당 게시물의 데이터가 없을경우
                    const post = {
                        postId,
                        postUserId,
                        userId,
                    };
                    const result = yield this.postService.getPost(post);
                    this.cachePost(result);
                }
                res
                    .status(200)
                    .json({ message: "해당게시물이 수정되었습니다.", data: postParse });
            }
            catch (e) {
                next(e);
            }
        });
        // user의 게시물 조회
        this.getUserPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/post/:userId",
                    layer: "Handlers",
                    className: "PostHandler",
                    functionName: "getUserPosts",
                });
                const ids = yield userPostsCache_1.userPostsCache.lRange(`userPosts:${req.query.userId}:List`, 0, -1);
                let isLikedPostIds;
                const userId = (_a = res.locals.userInfo) === null || _a === void 0 ? void 0 : _a.userId;
                let result = [];
                if (userId) {
                    isLikedPostIds = yield this.postService.getIsLikedPostIds(userId);
                }
                // 첫 랜더링
                if (ids.length === 0) {
                    const param = {
                        userId: req.query.userId,
                        postLastId: undefined,
                    };
                    result = yield this.postService.getUserPosts(param);
                    // 유저의 게시물id를 캐싱하기
                    yield this.cacheUserPosts(result, param.userId);
                    // 캐싱한 id들중 최신 10개만
                    const userPosts = result.splice(0, 5);
                    const isLast = userPosts.length < 5 ? true : false;
                    return res.status(200).json({ userPosts, isLast, isLikedPostIds });
                }
                else {
                    const postLastId = req.query.postLastId;
                    // 두번째이상의 랜더링
                    const lastUserPostIdx = ids.findIndex((id) => {
                        return Number(id) === Number(postLastId);
                    });
                    const targetIds = ids.slice(lastUserPostIdx + 1, lastUserPostIdx + 6);
                    const postJsons = yield Promise.all(targetIds.map((id) => postCache_1.postCache.get(`post:${id}`)));
                    const userPosts = postJsons.map((post) => JSON.parse(post));
                    const isLast = userPosts.length < 5 ? true : false;
                    return res.status(200).json({ userPosts, isLast, isLikedPostIds });
                }
            }
            catch (e) {
                next(e);
            }
        });
        // 게시물 삭제
        this.deletePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "delete",
                    url: "api/post/:postId",
                    layer: "Handlers",
                    className: "PostHandler",
                    functionName: "deletePost",
                });
                const userId = res.locals.userInfo.userId;
                const postId = req.params.postId;
                const postPayment = {
                    userId,
                    postId: Number(postId),
                };
                // 먼저 DB에 있는 게시물데이터삭제
                yield this.postService.deletePost(postPayment);
                // 먼저 posts:list가 있는지 확인
                const ids = yield postCache_1.postCache.lRange("posts:list", 0, -1);
                const userPostIds = yield userPostsCache_1.userPostsCache.lRange(`userPosts:${userId}:List`, 0, -1);
                const param = {
                    userId,
                    postLastId: undefined,
                };
                if (ids.length === 0) {
                    const result = yield this.postService.getAllPosts(userId);
                    yield this.cachePosts(result);
                }
                else {
                    // 해당 삭제할 게시물의 id값을 없앤 posts:list로 덮어쓰기
                    const cacheIds = yield postCache_1.postCache.lRange("posts:list", 0, -1);
                    const postListTTL = yield postCache_1.postCache.ttl("posts:list");
                    const ids = cacheIds.map((el) => JSON.parse(el));
                    const filterIds = ids.filter((el) => {
                        return el.toString() !== postId;
                    });
                    yield postCache_1.postCache.del("posts:list");
                    yield postCache_1.postCache.rPush("posts:list", filterIds.map((el) => JSON.stringify(el)));
                    yield postCache_1.postCache.expire("posts:list", postListTTL);
                }
                if (userPostIds.length === 0) {
                    const userGetPostsResult = yield this.postService.getUserPosts(param);
                    yield this.cacheUserPosts(userGetPostsResult, userId);
                }
                else {
                    // userCache의 게시물도 삭제
                    const cacheUserPostIds = yield userPostsCache_1.userPostsCache.lRange(`userPosts:${userId}:List`, 0, -1);
                    const userPostListTTL = yield userPostsCache_1.userPostsCache.ttl(`userPosts:${userId}:List`);
                    const userPostIds = cacheUserPostIds.map((el) => JSON.parse(el));
                    const filterUserPostIds = userPostIds.filter((el) => {
                        return el.toString() !== postId;
                    });
                    yield userPostsCache_1.userPostsCache.del(`userPosts:${userId}:List`);
                    yield userPostsCache_1.userPostsCache.rPush(`userPosts:${userId}:List`, filterUserPostIds.map((el) => JSON.stringify(el)));
                    yield userPostsCache_1.userPostsCache.expire(`userPosts:${userId}:List`, userPostListTTL);
                }
                const checkPostCache = yield postCache_1.postCache.get(`post:${postId}`);
                if (checkPostCache) {
                    yield postCache_1.postCache.del(`post:${postId}`);
                    yield userPostsCache_1.userPostsCache.del(`post:${postId}`);
                }
                res.status(200).json({ message: "게시물이 삭제되었습니다." });
            }
            catch (e) {
                next(e);
            }
        });
        // 게시물데이터들을 다시 캐싱하기
        this.cachePosts = (posts) => __awaiter(this, void 0, void 0, function* () {
            const ids = posts.map((el) => el.id);
            if (ids.length !== 0) {
                yield postCache_1.postCache.rPush("posts:list", ids.map(String));
                yield postCache_1.postCache.expire("posts:list", 600);
            }
            for (let idx = 0; idx < posts.length; idx++) {
                yield postCache_1.postCache.set(`post:${posts[idx].dataValues.id}`, JSON.stringify({
                    id: posts[idx].dataValues.id,
                    userId: posts[idx].dataValues.userId,
                    content: posts[idx].dataValues.content,
                    userNickname: posts[idx].dataValues.userNickname,
                    likeCnt: posts[idx].dataValues.likeCnt,
                    istLiked: posts[idx].dataValues.isLiked,
                    commentCnt: posts[idx].dataValues.commentCnt,
                    Comments: posts[idx].dataValues.Comments,
                }), { EX: 600 });
            }
        });
        this.cachePost = (post) => __awaiter(this, void 0, void 0, function* () {
            yield postCache_1.postCache.set(`post:${post.dataValues.postId}`, JSON.stringify({
                id: post.dataValues.id,
                userId: post.dataValues.userId,
                content: post.dataValues.content,
                userNickname: post.dataValues.userNickname,
                likeCnt: post.dataValues.likeCnt,
                commentCnt: post.dataValues.commentCnt,
                Comments: post.dataValues.Comments,
            }), { EX: 600 });
        });
        // 유저의 게시물을 캐싱하기
        this.cacheUserPosts = (userPosts, userId) => __awaiter(this, void 0, void 0, function* () {
            const ids = userPosts.map((el) => el.id);
            yield userPostsCache_1.userPostsCache.rPush(`userPosts:${userId}:List`, ids.map(String));
            yield userPostsCache_1.userPostsCache.expire(`userPosts:${userId}:List`, 600);
            for (let idx = 0; idx < userPosts.length; idx++) {
                yield userPostsCache_1.userPostsCache.set(`post:${userPosts[idx].dataValues.id}`, JSON.stringify({
                    id: userPosts[idx].dataValues.id,
                    userId: userPosts[idx].dataValues.userId,
                    content: userPosts[idx].dataValues.content,
                    userNickname: userPosts[idx].dataValues.userNickname,
                    likeCnt: userPosts[idx].dataValues.likeCnt,
                    commentCnt: userPosts[idx].dataValues.commentCnt,
                    Comments: userPosts[idx].dataValues.Comments,
                }), { EX: 600 });
            }
        });
    }
}
exports.default = PostHandler;
