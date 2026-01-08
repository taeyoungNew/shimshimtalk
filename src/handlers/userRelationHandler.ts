import { Response, Request, NextFunction } from "express";
import UserRelationService from "../service/userRelationService";

const userRelationService = new UserRelationService();
class UserRelationHandler {
  public getFollowings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.userInfo.userId;

      const result = await userRelationService.getFollowings(userId);
      console.log("result = ", result);

      const rows = result.map(
        (row: {
          followingId: any;
          User: { UserInfos: { nickname: any } };
        }) => ({
          followingId: row.followingId,
          nickname: row.User.UserInfos.nickname,
        })
      );
      return res.status(200).json({ rows });
    } catch (error) {
      next(error);
    }
  };
}

export default UserRelationHandler;
