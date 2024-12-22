export const checkAuth = (
  authorization: string,
  tokenType: string,
  token: string
) => {
  if (!authorization) throw new Error("로그인 후 이용가능합니다.");
  if (tokenType !== "Bearer" || !token) {
    throw new Error("로그인 후에 이용가능합니다.");
  }
};
