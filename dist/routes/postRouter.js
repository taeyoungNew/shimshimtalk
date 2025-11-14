"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const optional_auth_middleware_1 = require("../middlewares/optional.auth.middleware");
const postHandler_1 = __importDefault(require("../handlers/postHandler"));
const postRouter = (0, express_1.Router)();
const postHandler = new postHandler_1.default();
// 게시물작성
// authenticate가 필요
postRouter.post("/", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, postHandler.createPost);
// 게시물 수정
postRouter.put("/:postId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, postHandler.modifyPost);
// 유저의 게시물들을 조회
postRouter.get("/user-posts", optional_auth_middleware_1.optionalAuthMiddleware, 
// isLogoutMiddleware,
// authMiddleware,
postHandler.getUserPosts);
// 모든 게시물을 조회
postRouter.get("/", optional_auth_middleware_1.optionalAuthMiddleware, postHandler.getAllPosts);
// 한 게시물만 조회
postRouter.get("/detail", optional_auth_middleware_1.optionalAuthMiddleware, postHandler.getPost);
// 게시물 삭제
postRouter.delete("/:postId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, postHandler.deletePost);
exports.default = postRouter;
