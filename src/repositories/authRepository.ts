import db from "../database/models/index";
import logger from "../config/logger";

const { Users } = db;
class AuthRepository {
  public saveRefToken = async (refToken: string, userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "AuthRepository",
      functionName: "saveRefToken",
    });
    await Users.update(
      {
        refToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  };

  public logoutUser = async (userId: string) => {
    logger.info("", {
      layer: "Repository",
      className: "AuthRepository",
      functionName: "logoutUser",
    });
    await Users.update({ refToken: "" }, { where: { id: userId } });
  };
}

export default AuthRepository;
