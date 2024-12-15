export const checkAuth = (authorization: string) => {
  if (!authorization) throw new Error("로그인 후 이용가능합니다.");
};
