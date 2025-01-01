import { tokenType } from "../../types/tokenType";
import jwt, { JwtPayload } from "jsonwebtoken";

// 토큰이 유효한지 확인
const verifyRefToken = (tokenPayment: tokenType) => {
  try {
    const { token, type } = tokenPayment;
    const refToken = JSON.parse(JSON.stringify(token))["refToken"];
    const secretKey =
      type === "accToken"
        ? process.env.SECRET_ACCTOKEN_KEY
        : process.env.SECRET_REFTOKEN_KEY;

    const result = jwt.verify(String(refToken), secretKey, (err, decoded) => {
      if (err) {
        console.log("jwt.verify = ", err.name);

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

export default verifyRefToken;