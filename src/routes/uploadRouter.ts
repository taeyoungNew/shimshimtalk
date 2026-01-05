import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import UploadHandler from "../handlers/uploadHandler";
const uploadRouter = Router();
const uploadHandler = new UploadHandler();

uploadRouter.post(
  "/image",
  authMiddleware,
  upload.single("file"),
  uploadHandler.uploadImage
);

uploadRouter.post(
  "/file",
  authMiddleware,
  upload.single("file"),
  uploadHandler.uploadFile
);

export default uploadRouter;
