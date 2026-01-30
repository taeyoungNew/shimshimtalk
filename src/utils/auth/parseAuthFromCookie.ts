import cookie from "cookie";

export function parseAuthFromCookie(cookieHeader?: string) {
  if (!cookieHeader) return null;

  const parsed = cookie.parse(cookieHeader);
  const authorization = parsed.authorization;

  if (!authorization) return null;

  const [tokenType, token] = authorization.split(" ");

  if (tokenType !== "Bearer" || !token) return null;

  return { tokenType, token };
}
