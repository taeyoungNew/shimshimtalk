"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authHandler_1 = __importDefault(require("../handlers/authHandler"));
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const isLogin_middleware_1 = require("../middlewares/isLogin.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const authRouter = (0, express_1.Router)();
const authHandler = new authHandler_1.default();
// 로그인
authRouter.post("/login", isLogin_middleware_1.isLoginMiddleware, authHandler.loginUser);
// 로그아웃
authRouter.delete("/logout", isLogout_middleware_1.isLogoutMiddleware, authHandler.logoutUser);
// 로그인상태확인
authRouter.get("/auth-me", auth_middleware_1.authMiddleware, authHandler.authMe);
exports.default = authRouter;
