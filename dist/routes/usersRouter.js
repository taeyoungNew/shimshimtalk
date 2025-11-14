"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersHandler_1 = __importDefault(require("../handlers/usersHandler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const optional_auth_middleware_1 = require("../middlewares/optional.auth.middleware");
const userRouter = (0, express_1.Router)();
const userHandler = new usersHandler_1.default();
// 회원가입
userRouter.post("/signup", userHandler.createUser);
// 모든회원정보가져오기
userRouter.get("/", userHandler.findAllUser);
// 나의 회원정보 가져오기
userRouter.get("/my-info", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, userHandler.findMyInfos);
// 특정유저의 회원정보 가져오기
userRouter.get(`/user-info/:userId`, optional_auth_middleware_1.optionalAuthMiddleware, userHandler.findUserInfos);
// 차단한 유저의 리스트 가져오기
userRouter.get("/get-blockedusers-list", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, userHandler.getBlockedUsers);
// 특정회원정보가져오기
userRouter.get("/:email", userHandler.findUserByEmail);
// 회원정보변경하기
userRouter.put("/:id", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, userHandler.modifyUserInfo);
// 회원탈퇴
userRouter.delete("/", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, userHandler.deleteUser);
exports.default = userRouter;
