import { Bucket$, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "./r2Client";
import { v4 as uuid } from "uuid";
import path from "path";

interface UploadToR2Params {
  file: Express.Multer.File;
  folder: string; // ex) chat, profile, post
}

export const uploadToR2 = async ({
  file,
  folder,
}: UploadToR2Params): Promise<string> => {
  const ext = path.extname(file.originalname);
  const key = `${folder}/${uuid()}${ext}`;
  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return `${key}`;
};
