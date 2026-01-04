import { RequestHandler } from "express-serve-static-core";
import { uploadToR2 } from "../common/r2Cloud/uploadToR2";
import logger from "../config/logger";
import UploadService from "../service/uploadService";
import { UploadDto } from "../dtos/uploadDto";

const uploadService = new UploadService();
class UploadHandler {
  public uploadImage: RequestHandler = async (req, res, next) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/post/",
        layer: "Handlers",
        className: "UploadHandler",
        functionName: "uploadImage",
      });
      const file = req.file;
      const senderId = res.locals.userInfo.userId;
      const chatRoomId = req.body.chatRoomId;

      if (!file) return res.status(400).json({ message: "파일이 없습니다." });

      const key = await uploadToR2({ file: req.file, folder: "chat" });
      const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

      const payload: UploadDto = {
        chatRoomId,
        content: `${publicUrl}`,
        type: "IMAGE",
        senderId,
      };
      // if (key) uploadService.uploadImage(payload);

      return res
        .status(200)
        .json({
          chatRoomId,
          content: payload.content,
          contentType: payload.type,
          senderId,
        });
    } catch (e) {
      next(e);
    }
  };
}

export default UploadHandler;
