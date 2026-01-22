import { Response, Request, RequestHandler, NextFunction } from "express";

class SuggestedUserHandler {
  public getSuggestedUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
    } catch (error) {
      next();
    }
  };
}

export default SuggestedUserHandler;
