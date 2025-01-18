import express from "express";
import authRouter from "../routes/authRouter";
import userRouter from "./usersRouter";
import postRouter from "./postRouter";
import commentRouter from "./commentRouter";
import followRouter from "./followRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/follow", followRouter);

export default router;
