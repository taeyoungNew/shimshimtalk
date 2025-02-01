import { Response, Request, RequestHandler, NextFunction } from "express";
import {
  FollowingDto,
  StopFollowingDto,
  GetFollowersDto,
  GetFollowingsDto,
} from "../dtos/followDto";
import FollowService from "../service/followService";
import logger from "../config/logger";

class FollowHandler {
  private followService = new FollowService();
  // 팔로잉하기
  public following = async (
    req: Request<{ followingId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/follow/:followingId",
        layer: "Handlers",
        className: "FollowHandler",
        functionName: "following",
      });
      const payment: FollowingDto = {
        userId: res.locals.userInfo.userId,
        followingId: req.params.followingId,
      };
      await this.followService.following(payment);
      return res.status(200).json({ message: "팔로잉되었습니다." });
    } catch (e) {
      next(e);
    }
  };
  // 팔로잉끊기
  public stopFollowing = async (
    req: Request<{ followingId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "post",
        url: "api/follow/:followingId",
        layer: "Handlers",
        className: "FollowHandler",
        functionName: "stopFollowing",
      });
      const payment: FollowingDto = {
        userId: res.locals.userInfo.userId,
        followingId: req.params.followingId,
      };
      await this.followService.stopFollowing(payment);
      return res.status(200).json({ message: "팔로잉을 취소했습니다." });
    } catch (e) {
      next(e);
    }
  };
  // 자신이 팔로잉한 유저들 조회
  public getFollowings = async (
    req: Request<{}, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/follow/myfollowins",
        layer: "Handlers",
        className: "FollowHandler",
        functionName: "getFollowings",
      });
      const userId = res.locals.userInfo.userId;
      const result = await this.followService.getFollowings(userId);
      return res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  };

  // 자신의 팔로워들 조회
  public getFollowers = async (
    req: Request<{}, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        method: "get",
        url: "api/follow/myfollews",
        layer: "Handlers",
        className: "FollowHandler",
        functionName: "getFollowers",
      });
      const userId = res.locals.userInfo.userId;
      const result = await this.followService.getFollowers(userId);
      return res.status(200).json({ data: result });
    } catch (e) {
      next(e);
    }
  };
}

export default FollowHandler;
