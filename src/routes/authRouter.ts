import { Router } from "express";
import AuthHandler from "../handlers/authHandler";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();
const authHandler = new AuthHandler();
// 로그인
authRouter.post("/login", authHandler.loginUser);
// 로그아웃
authRouter.delete("/logout", authMiddleware, authHandler.logoutUser);

export default authRouter;
