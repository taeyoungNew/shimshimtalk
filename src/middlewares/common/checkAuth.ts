import { CustomError } from "../../errors/customError";
import errorCodes from "../../constants/error-codes.json";

export const checkAuth = (
  // authorization: string,
  tokenType: string,
  token: string,
) => {
  // if (!authorization)
  //   throw new CustomError(
  //     errorCodes.AUTH.UNAUTHORIZED.status,
  //     errorCodes.AUTH.UNAUTHORIZED.code,
  //     "로그인 후 이용가능합니다."
  //   );
  if (tokenType !== "Bearer" || !token)
    throw new CustomError(
      errorCodes.AUTH.UNAUTHORIZED.status,
      errorCodes.AUTH.UNAUTHORIZED.code,
      "로그인 후 이용가능합니다.",
    );
};
