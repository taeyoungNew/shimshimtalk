import { Router } from "express";
import AuthHandler from "../handlers/authHandler";

const authRouter = Router();
const authHandler = new AuthHandler();

// 로그인
authRouter.post("/login", authHandler.loginUser);

export default authRouter;
