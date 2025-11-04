import { Request, Response, NextFunction } from "express";

export const ownershipMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.userInfo.userId;
    const paramUserId = req.params.id;
  } catch (error) {
    next(error);
  }
};
