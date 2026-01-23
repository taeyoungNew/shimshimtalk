import { Response, Request, RequestHandler, NextFunction } from "express";
import SuggestedUserService from "../service/suggestedUserService";
import logger from "../config/logger";
class SuggestedUserHandler {
  private suggestedUserService = new SuggestedUserService();
  public getSuggestedUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    logger.info("", {
      method: "get",
      url: "api/suggested-user/",
      layer: "Handlers",
      className: "SuggestedUserHandler",
      functionName: "getSuggestedUsers",
    });
    try {
      const userId = res.locals.userInfo.userId;
      const result = await this.suggestedUserService.getSuggestedUsers(userId);

      return res.status(200).json(result);
    } catch (error) {
      next();
    }
  };
}

export default SuggestedUserHandler;
