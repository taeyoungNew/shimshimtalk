import {
  FollowingDto,
  StopFollowingDto,
  GetFollowersDto,
  GetFollowingsDto,
} from "../dtos/followDto";
import logger from "../config/logger";
import FollowRepository from "../repositories/followRepository";
import UserService from "./usersService";

class FollowService {
  followRepository = new FollowRepository();
  userService = new UserService();
  // 팔로잉하기
  public following = async (params: FollowingDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "FollowService",
        functionName: "following",
      });
      // 팔로잉하려는 유저가 존재하는지
      await this.userService.findUserById(params.followingId);

      // 이미 팔로잉하고있는지
      await this.checkFollowingUser(params);
      await this.followRepository.following(params);
    } catch (error) {
      throw error;
    }
  };
  // 팔로잉끊기
  public stopFollowing = async (params: StopFollowingDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "FollowService",
        functionName: "stopFollowing",
      });
      // 팔로잉하려는 유저가 존재하는지
      await this.userService.findUserById(params.followingId);

      await this.checkUnFollowingUser(params);
      await this.followRepository.stopFollowing(params);
    } catch (e) {
      throw e;
    }
  };
  // 자신이 팔로잉한 유저조회
  public getFollowings = async (param: GetFollowingsDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "FollowService",
        functionName: "getFollowings",
      });
      return await this.followRepository.getFollowings(param);
    } catch (e) {
      throw e;
    }
  };

  // 자신의 팔로워조회
  public getFollowers = async (param: GetFollowersDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "FollowService",
        functionName: "getFollowers",
      });
      return await this.followRepository.getFollowers(param);
    } catch (e) {
      throw e;
    }
  };

  // 상대방을 팔로잉하고있는지 확인
  public checkFollowingUser = async (
    followingId: FollowingDto
  ): Promise<void> => {
    try {
      logger.info("", {
        layer: "Service",
        className: "FollowService",
        functionName: "checkFollowingUser",
      });
      const result = await this.followRepository.getFollowing(followingId);
      if (result) {
        throw new Error("이미 팔로잉하고있습니다.");
      }
    } catch (e) {
      throw e;
    }
  };

  // 상대방을 팔로잉
  // 상대방을 팔로잉하고있는지 확인
  public checkUnFollowingUser = async (
    followingId: FollowingDto
  ): Promise<void> => {
    try {
      logger.info("", {
        layer: "Service",
        className: "FollowService",
        functionName: "checkUnFollowingUser",
      });
      const result = await this.followRepository.getFollowing(followingId);
      if (!result) {
        throw new Error("팔로잉하고 있지 않습니다..");
      }
    } catch (e) {
      throw e;
    }
  };
}

export default FollowService;
