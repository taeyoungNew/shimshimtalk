import { Router } from "express";
import UserHandler from "../handlers/usersHandler";
import { authMiddleware } from "../middlewares/auth.middleware";
import { isLoginMiddleware } from "../middlewares/isLogin.middleware";
import { isLogoutMiddleware } from "../middlewares/isLogout.middleware";

const userRouter = Router();

const userHandler = new UserHandler();

// 회원가입
userRouter.post("/signup", userHandler.createUser);

// 모든회원정보가져오기
userRouter.get("/", userHandler.findAllUser);

// 특정회원정보가져오기
userRouter.get("/:id", userHandler.findUser);

// 회원정보변경하기
userRouter.put(
  "/:id",
  isLogoutMiddleware,
  authMiddleware,
  userHandler.modifyUserInfo
);

// 회원탈퇴
userRouter.delete(
  "/:id",
  isLogoutMiddleware,
  authMiddleware,
  userHandler.deleteUser
);

export default userRouter;
