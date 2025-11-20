"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentHandler_1 = __importDefault(require("../handlers/commentHandler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const commentRouter = (0, express_1.Router)();
const commentHandler = new commentHandler_1.default();
// 댓글작성
commentRouter.post("/:postId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, commentHandler.createComent);
// 댓글수정
commentRouter.put("/:commentId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, commentHandler.modifyComment);
// 댓글삭제
commentRouter.delete("/:commentId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, commentHandler.deleteComment);
// 하나의 댓글조회
commentRouter.get("/:commentId", commentHandler.getComment);
exports.default = commentRouter;
