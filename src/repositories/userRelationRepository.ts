import logger from "../config/logger";
import db from "../database/models/index";
const { Follows, Users, UserInfos } = db;
class UserRelationRepository {
  public getFollowings = async (userId: string) => {
    try {
      logger.info("", {
        layer: "Repository",
        className: "UserRelationRepository",
        functionName: "getFollowings",
      });
      console.log(
        "Follows.associations = ",
        Follows.associations.following.target.associations.UserInfo
      );
      return await Follows.findAll({
        where: { followerId: userId },
        attributes: ["id", "followingId"],
        include: [
          {
            association: Follows.associations.following,
            required: false, // 중요
            attributes: ["id", "email"],
            include: [
              {
                association:
                  Follows.associations.following.target.associations.UserInfo,
                attributes: ["nickname"],
              },
            ],
          },
        ],
        raw: true,
      });
      // console.log("rows = ", rows);

      // return await Follows.findAll({
      //   attributes: ["followingId"],
      //   include: [
      //     {
      //       association: Follows.associations.following,
      //       attributes: ["id"],
      //       include: [
      //         {
      //           association:
      //             Follows.associations.following.target.associations.UserInfo,
      //           attributes: ["nickname"],
      //         },
      //       ],
      //     },
      //   ],
      //   where: {
      //     followerId: userId,
      //   },
      // });
    } catch (error) {
      throw error;
    }
  };
}

export default UserRelationRepository;
