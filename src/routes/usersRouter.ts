import { Router } from "express";
import {
  userSignup,
  editUserInfo,
  userInfo,
  usersInfo,
  deleteId,
} from "../handlers/userHandler";

const userRouter = Router();

// 회원가입
userRouter.post("/user/signup", userSignup);

// 모든회원정보가져오기
userRouter.get("/users", usersInfo);

// 특정회원정보가져오기
userRouter.get("/user/:id", userInfo);

// 회원정보변경하기
userRouter.put("/user/:id", editUserInfo);

// 회원탈퇴
userRouter.delete("/user/:id", deleteId);

export default userRouter;
