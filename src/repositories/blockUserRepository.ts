import {
  BlockUserEntity,
  UnBlockUserEntity,
  BlockUserListEntity,
} from "../entity/blockUserEntity";
import logger from "../config/logger";
import BlockUser from "../database/models/blockuser";

class BlockUserRepository {
  /**
   * 유저차단하기
   */
  public blockUser = async (blockUserPayment: BlockUserEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "BlockUserRepository",
      functionName: "blockUser",
    });
    const { blockedId, blockerId } = blockUserPayment;
    await BlockUser.create({
      blockerId,
      blockedId,
    });
  };

  /**
   * 유저차단풀기
   */
  public unBLockUser = async (unBlockUserPayment: UnBlockUserEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "BlockUserRepository",
      functionName: "unBLockUser",
    });
    const { blockedId, blockerId } = unBlockUserPayment;
    await BlockUser.destroy({
      where: {
        blockerId,
        blockedId,
      },
    });
  };

  /**
   * 자신이 차단한 유저리스트 불러오기
   */
  public blockUserList = async (unBlockUserPayment: BlockUserListEntity) => {
    logger.info("", {
      layer: "Repository",
      className: "BlockUserRepository",
      functionName: "blockUserList",
    });
    const { userId } = unBlockUserPayment;
    await BlockUser.findAll({
      where: {
        blockerId: userId,
      },
    });
  };
}

export default BlockUserRepository;
