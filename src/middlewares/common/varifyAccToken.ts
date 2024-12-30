import { tokenType } from "../../types/tokenType";
import jwt, { JwtPayload } from "jsonwebtoken";

// 토큰이 유효한지 확인
const verifyAccToken = (tokenPayment: tokenType) => {
  try {
    const { token, type } = tokenPayment;
    console.log("token = ", JSON.stringify(token));

    const secretKey =
      type === "accToken"
        ? process.env.SECRET_ACCTOKEN_KEY
        : process.env.SECRET_REFTOKEN_KEY;

    const result = jwt.verify(String(token), secretKey, (err, decoded) => {
      if (err) {
        console.log("jwt.verify = ", err.name);

        switch (err.name) {
          case "TokenExpiredError":
            return "jwt exired";
        }
      }
      return decoded;
    });
    console.log("result = ", result);

    return result;
  } catch (error) {
    throw error;
  }
};

export default verifyAccToken;
