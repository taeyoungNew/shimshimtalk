import express from "express";
import authRouter from "../routes/authRouter";
import userRouter from "./usersRouter";
import postRouter from "./postRouter";
import commentRouter from "./commentRouter";
import followRouter from "./followRouter";
import postLikeRouter from "./postLikeRouter";
import blockUserRouter from "./blockUsersRouter";
import chatRouter from "./chatRouter";
import uploadRouter from "./uploadRouter";
import messageAlramRouter from "./messageAlramRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/follow", followRouter);
router.use("/post-like", postLikeRouter);
router.use("/block-user", blockUserRouter);
router.use("/chat", chatRouter);
router.use("/upload", uploadRouter);
router.use("/message-alram", messageAlramRouter);

export default router;
