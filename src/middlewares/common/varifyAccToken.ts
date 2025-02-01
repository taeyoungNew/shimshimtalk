import logger from "../../config/logger";
import { tokenType } from "../../types/tokenType";
import jwt, { JwtPayload } from "jsonwebtoken";

// 토큰이 유효한지 확인
const verifyAccToken = (tokenPayment: tokenType) => {
  try {
    logger.info("", {
      layer: "middlewares/common",
      functionName: "verifyAccToken",
    });
    const { token, type } = tokenPayment;
    const secretKey =
      type === "accToken"
        ? process.env.SECRET_ACCTOKEN_KEY
        : process.env.SECRET_REFTOKEN_KEY;

    const result = jwt.verify(String(token), secretKey, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            return "jwt exired";
        }
      }
      return decoded;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default verifyAccToken;
