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
const commentRepository_1 = __importDefault(require("../repositories/commentRepository"));
const postService_1 = __importDefault(require("./postService"));
const logger_1 = __importDefault(require("../config/logger"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
class CommentService {
    constructor() {
        this.postService = new postService_1.default();
        this.commentRepository = new commentRepository_1.default();
        // 댓글작성
        this.createComment = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "CommentService",
                    functionName: "createComment",
                });
                // 게시물이 있는지 확인
                yield this.postService.existPost(params);
                return yield this.commentRepository.createComment(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 댓글수정
        this.modifyComment = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "CommentService",
                    functionName: "modifyComment",
                });
                // 자신의 댓글인지 확인
                yield this.isUserComment(params);
                // 댓글이 달린 게시물이 있는지 확인
                const postId = params;
                yield this.postService.existPost(postId);
                // 해당 댓글이 있는지 확인
                yield this.existComment(params);
                yield this.commentRepository.modifyComment(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 하나의 댓글불러오기
        this.getComment = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "CommentService",
                    functionName: "getComment",
                });
                yield this.existComment(params);
                return yield this.commentRepository.getComment(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 댓글삭제
        this.deleteComment = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "CommentService",
                    functionName: "deleteComment",
                });
                yield this.existComment(params);
                // 자신의 댓글인지 확인
                yield this.isUserComment(params);
                yield this.commentRepository.deleteComment(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 댓글이 해당유저의 댓글인지 확인하는 모듈
        this.isUserComment = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "CommentService",
                    functionName: "isUserComment",
                });
                const comment = yield this.commentRepository.getComment(params);
                if (comment.userId !== params.userId)
                    throw new customError_1.CustomError(error_codes_json_1.default.COMMENT.FORBIDDEN.status, error_codes_json_1.default.COMMENT.FORBIDDEN.code, "자신의 댓글이 아닙니다.");
            }
            catch (error) {
                throw error;
            }
        });
        // 댓글이 있는지 확인
        this.existComment = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "CommentService",
                    functionName: "existComment",
                });
                const result = yield this.commentRepository.existComment(param);
                if (!result)
                    throw new customError_1.CustomError(error_codes_json_1.default.COMMENT.NOT_FOUND.status, error_codes_json_1.default.COMMENT.NOT_FOUND.code, "해당 댓글이 존재하지 않습니다.");
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CommentService;
