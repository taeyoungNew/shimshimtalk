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
      console.log(userId);

      return await Follows.findAll({
        attributes: ["followingId"],
        include: [
          {
            model: Users,
            attributes: ["id"],
            as: "following",
            include: [
              {
                model: UserInfos,
                attributes: ["nickname"],
              },
            ],
          },
        ],
        where: {
          followerId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  };
}

export default UserRelationRepository;
