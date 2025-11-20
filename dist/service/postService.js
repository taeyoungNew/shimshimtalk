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
const postsRepository_1 = __importDefault(require("../repositories/postsRepository"));
const usersService_1 = __importDefault(require("./usersService"));
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
const logger_1 = __importDefault(require("../config/logger"));
const postLikeRepository_1 = __importDefault(require("../repositories/postLikeRepository"));
const customError_1 = require("../errors/customError");
class PostService {
    constructor() {
        this.postLikeRepository = new postLikeRepository_1.default();
        this.postRepository = new postsRepository_1.default();
        this.userService = new usersService_1.default();
        // 자신이 좋아요를 누른 게시물의 id와 isLiked의 리스트 구하기
        this.getIsLikedPostIds = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "getIsLikedPostIds",
                });
                const isLikedPostIds = yield this.postLikeRepository.getIsLikedPostIds(param);
                return isLikedPostIds;
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물작성
        this.createPost = (postInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "createPost",
                });
                const newPost = yield this.postRepository.createPost(postInfo);
                const newPostInfo = {
                    postUserId: newPost.userId,
                    postId: newPost.id,
                    userId: newPost.userId,
                };
                return yield this.getPost(newPostInfo);
            }
            catch (error) {
                throw error;
            }
        });
        // 한 게시물만 조회
        this.getPost = (postInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "getPost",
                });
                // 그 게시물이 있는지 확인
                yield this.existPost(postInfo);
                const result = yield this.postRepository.getPost(postInfo);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        // 유저가 작성한 게시물들만 조회'
        this.getUserPosts = (postInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "getUserPosts",
                });
                // 해당 유저가 있는지 확인?
                yield this.userService.findUserById(postInfo.userId);
                return yield this.postRepository.getUserPosts(postInfo);
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물 수정
        this.modifyPost = (postInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "modifyPost",
                });
                // 그 게시물이 있는지 확인
                yield this.existPost(postInfo);
                yield this.isUserPost(postInfo);
                yield this.postRepository.modifyPost(postInfo);
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물 모두조회
        this.getAllPosts = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "getAllPosts",
                });
                let result = yield this.postRepository.getAllPosts();
                result = result.map((el) => {
                    el.dataValues.isLiked = el.dataValues.isLiked === 0 ? false : true;
                    return el;
                });
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물 삭제
        this.deletePost = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "deletePost",
                });
                // 그 게시물이 있는지 확인
                yield this.existPost(param);
                // 자신의 게시물인지 확인
                yield this.isUserPost(param);
                yield this.postRepository.deletePost(param);
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물이 해당유저의 게시물인지 확인하는 모듈
        this.isUserPost = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "isUserPost",
                });
                const post = yield this.postRepository.getPost(param);
                if (post.userId !== param.userId)
                    throw new customError_1.CustomError(error_codes_json_1.default.POST.FORBIDDEN.status, error_codes_json_1.default.POST.FORBIDDEN.code, "자신의 게시물이 아닙니다.");
            }
            catch (error) {
                throw error;
            }
        });
        // 그 게시물이 있는지 확인
        this.existPost = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostService",
                    functionName: "existPost",
                });
                const result = yield this.postRepository.existPost(param);
                if (!result)
                    throw new customError_1.CustomError(error_codes_json_1.default.POST.NOT_FOUND.status, error_codes_json_1.default.POST.NOT_FOUND.code, "해당 게시물이 존재하지 않습니다.");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PostService;
