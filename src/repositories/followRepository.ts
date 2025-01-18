import {
  FollowingEntity,
  GetFollowersEntity,
  GetFollowingsEntity,
  StopFollowingEntity,
} from "../entity/followEntity";
import Follows from "../database/models/follows";
import UserInfos from "../database/models/userinfos";
import Users from "../database/models/users";

class FollowRepository {
  // 팔로잉
  public following = async (params: FollowingEntity) => {
    console.log("팔로잉하기");

    try {
      await Follows.create({
        followerId: params.userId,
        followingId: params.followingId,
      });
    } catch (error) {
      throw error;
    }
  };
  // 팔로잉 끊기
  public stopFollowing = async (params: StopFollowingEntity) => {
    try {
      await Follows.destroy({
        where: {
          followerId: params.userId,
          followingId: params.followingId,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // 자신의 팔로잉 팔로워의 숫자를 조회
  // public getMyFollowers = async (userId: string) => {
  //   try {
  //     return await Follows.findAndCountAll({
  //       attributes: [],
  //       where: {

  //       }
  //     })
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // 자신이 팔로잉한 유저들을조회
  public getFollowings = async (params: GetFollowingsEntity) => {
    try {
      return await Follows.findAll({
        attributes: ["followingId"],
        where: {
          followerId: params,
        },
      });
    } catch (error) {
      throw error;
    }
  };
  // 자신의 팔로워들을조회
  public getFollowers = async (params: GetFollowersEntity) => {
    try {
      return await Follows.findAll({
        where: {
          followingId: params.userId,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // 팔로잉한 한명의 유저를 조회
  public getFollowing = async (params: FollowingEntity) => {
    try {
      return await Follows.findOne({
        where: {
          followingId: params.followingId,
          followerId: params.userId,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // 차단?
}

export default FollowRepository;
