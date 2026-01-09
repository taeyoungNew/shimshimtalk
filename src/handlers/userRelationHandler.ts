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

      const rows = result.map(
        (row: {
          id: number;
          followingId: string;
          "following.id": string;
          "following.email": string;
          "following.UserInfo.id": number;
          "following.UserInfo.nickname": string;
        }) => {
          return {
            id: row.id,
            followingId: row.followingId,
            followingEmail: row["following.email"],
            followingNickname: row["following.UserInfo.nickname"],
          };
        }
      );

      return res.status(200).json({ rows });
    } catch (error) {
      next(error);
    }
  };
}

export default UserRelationHandler;
