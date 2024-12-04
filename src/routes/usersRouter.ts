import { Router } from "express";
import UserHandler from "../handlers/userHandler";

const userRouter = Router();

const userHandler = new UserHandler();
// 회원가입
userRouter.post("/user/signup", userHandler.createUser);

// 모든회원정보가져오기
userRouter.get("/users", userHandler.findAllUser);

// // 특정회원정보가져오기
userRouter.get("/user/:id", userHandler.findUser);

// // 회원정보변경하기
userRouter.put("/user/:id", userHandler.modifyUserInfo);

// // 회원탈퇴
userRouter.delete("/user/:id", userHandler.deleteUser);

export default userRouter;
