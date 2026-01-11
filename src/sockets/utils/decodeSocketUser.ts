import { Socket } from "socket.io";
import * as cookie from "cookie";
import { tokenType } from "../../types/tokenType";
import verifyAccToken from "../../middlewares/common/varifyAccToken";

export const decodeSocketUser = (socket: Socket) => {
  const cookieHeader = socket.request.headers.cookie;

  if (!cookieHeader) return null;
  const { authorization } = cookie.parse(cookieHeader);
  if (!authorization) return null;
  const [type, token] = authorization.split(" ");

  const accTokenPayment: tokenType = {
    token: token,
    type: "accToken",
  };

  // acctoken이 유효한지 확인
  const decodeAccToken = verifyAccToken(accTokenPayment);

  return decodeAccToken;
};
