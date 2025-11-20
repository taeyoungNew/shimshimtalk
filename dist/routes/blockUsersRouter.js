"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blockUserHandler_1 = __importDefault(require("../handlers/blockUserHandler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const blockUserRouter = (0, express_1.Router)();
const blockUserHandler = new blockUserHandler_1.default();
// 해당유저 차단하기
blockUserRouter.post("/:blockedId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, blockUserHandler.blockUser);
// 해당유저 차단풀기
blockUserRouter.delete("/unblock-user/:unblockedId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, blockUserHandler.unBlockUser);
// 자신이 차단한 유저리스트가져오기
// blockUserRouter.get(
//   "/blocked-list",
//   isLogoutMiddleware,
//   authMiddleware,
//   blockUserHandler.blockUserList
// );
exports.default = blockUserRouter;
