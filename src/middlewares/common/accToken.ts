import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// accToken생성
export const accesssToken = (userId: string, email: string) => {
  dotenv.config();
  const accToken = jwt.sign(
    { userId, email },
    process.env.SECRET_ACCTOKEN_KEY,
    {
      expiresIn: process.env.ACCTOKEN_EXPIRA,
    }
  );
  return accToken;
};
