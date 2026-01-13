import logger from "../config/logger";
import UserRelationRepository from "../repositories/userRelationRepository";

const userRelationRepository = new UserRelationRepository();
class UserRelationService {
  public getFriends = async (userId: string) => {
    logger.info("", {
      layer: "Service",
      className: "UserRelationService",
      functionName: "getFriends",
    });
    try {
      const result = await userRelationRepository.getFriends(userId);

      return result;
    } catch (error) {
      throw error;
    }
  };
  public getFollowings = async (userId: string) => {
    logger.info("", {
      layer: "Service",
      className: "UserRelationService",
      functionName: "getFrgetFollowingsiends",
    });
    try {
      const result = await userRelationRepository.getFollowings(userId);

      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default UserRelationService;
