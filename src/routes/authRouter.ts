import { Router } from "express";
import AuthHandler from "../handlers/authHandler";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";
import { isLoginMiddleware } from "../middlewares/isLogin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();
const authHandler = new AuthHandler();
// 로그인
authRouter.post("/login", isLoginMiddleware, authHandler.loginUser);

// 로그아웃
authRouter.delete("/logout", isLogoutMiddleware, authHandler.logoutUser);

// 로그인상태확인
authRouter.get("/auth-me", authHandler.authMe);

export default authRouter;
