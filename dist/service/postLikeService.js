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
const postLikeRepository_1 = __importDefault(require("../repositories/postLikeRepository"));
const postService_1 = __importDefault(require("./postService"));
const logger_1 = __importDefault(require("../config/logger"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
class PostLikeService {
    constructor() {
        this.postLikeRepository = new postLikeRepository_1.default();
        this.postService = new postService_1.default();
        // 게시물 좋아요
        this.postLike = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostLikeService",
                    functionName: "postLike",
                });
                yield this.postService.existPost(params);
                yield this.checkPostLike(params);
                yield this.postLikeRepository.postLike(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물 좋아요 취소
        this.postLikeCancel = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostLikeService",
                    functionName: "postLikeCancel",
                });
                yield this.postService.existPost(params);
                yield this.checkPostLikeCencle(params);
                yield this.postLikeRepository.postLikeCancel(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 자신의 게시물들이 받은 좋아요 총 갯수
        this.postLikeCnt = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostLikeService",
                    functionName: "postLikeCnt",
                });
                const result = yield this.postLikeRepository.postLikeCnt(params);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물을 좋아요 눌렀는지 확인
        this.checkPostLike = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostLikeService",
                    functionName: "checkPostLike",
                });
                const result = yield this.postLikeRepository.existPostLike(params);
                if (result) {
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.USER_ALREADY_EXISTS.status, error_codes_json_1.default.AUTH.USER_ALREADY_EXISTS.code, "이미 좋아요를 누른 게시물입니다.");
                }
            }
            catch (error) {
                throw error;
            }
        });
        // 게시물에 좋아요를 취소한지 체크
        this.checkPostLikeCencle = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "PostLikeService",
                    functionName: "checkPostLikeCencle",
                });
                const result = yield this.postLikeRepository.existPostLike(params);
                if (!result) {
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.USER_ALREADY_EXISTS.status, error_codes_json_1.default.AUTH.USER_ALREADY_EXISTS.code, "이미 좋아요를 취소한 게시물입니다.");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PostLikeService;
