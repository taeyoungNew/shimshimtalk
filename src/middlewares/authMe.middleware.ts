import { NextFunction } from "express";

export const authMeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
