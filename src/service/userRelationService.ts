import logger from "../config/logger";
import UserRelationRepository from "../repositories/userRelationRepository";

const userRelationRepository = new UserRelationRepository();
class UserRelationService {
  public getFollowings = async (userId: string) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "UserRelationService",
        functionName: "getFollowings",
      });
      const result = await userRelationRepository.getFollowings(userId);

      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default UserRelationService;
