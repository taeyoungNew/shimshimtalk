import { Router } from "express";
import AuthHandler from "../handlers/authHandler";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";
import { isLoginMiddleware } from "../middlewares/isLogin.middleware";

const authRouter = Router();
const authHandler = new AuthHandler();
// 로그인
authRouter.post("/login", isLoginMiddleware, authHandler.loginUser);
// 로그아웃
authRouter.delete("/logout", isLogoutMiddleware, authHandler.logoutUser);

export default authRouter;
