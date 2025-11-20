"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const followHandler_1 = __importDefault(require("../handlers/followHandler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const followRouter = (0, express_1.Router)();
const followHandler = new followHandler_1.default();
// 팔로잉
followRouter.post("/:followingId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, followHandler.following);
// 팔로잉 끊기
followRouter.delete("/:followingId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, followHandler.stopFollowing);
// 자신이 팔로잉한 유저들조회
followRouter.get("/myfollowins", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, followHandler.getFollowings);
// 자신의 팔로워들 조회
followRouter.get("/myfollews", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, followHandler.getFollowers);
exports.default = followRouter;
