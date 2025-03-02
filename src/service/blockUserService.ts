import {
  BlockUserDto,
  BlockUserListDto,
  UnBlockUserDto,
} from "../dtos/blockUserDto";
import UserService from "./usersService";
import BlockUserRepository from "../repositories/blockUserRepository";
import logger from "../config/logger";
class BlockUserService {
  private blockUserRepository = new BlockUserRepository();
  private userService = new UserService();
  /**
   * 유저차단
   */
  public blockUser = async (blockUserPayment: BlockUserDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "BlockUserService",
        functionName: "blockUser",
      });
      const { blockedId, blockerId } = blockUserPayment;
      // 차단할 유저가 존재하는지 유무
      await this.userService.findUserById(blockedId);

      await this.blockUserRepository.blockUser(blockUserPayment);
    } catch (error) {
      throw error;
    }
  };
  /**
   * 유저차단풀기
   */
  public unBLockUser = async (unBlockUserPayment: UnBlockUserDto) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "BlockUserService",
        functionName: "unBLockUser",
      });
      const { blockedId, blockerId } = unBlockUserPayment;
      // 차단을 해제할 유저가 존재하는지 유무
      await this.userService.findUserById(blockedId);

      await this.blockUserRepository.unBLockUser(unBlockUserPayment);
    } catch (error) {
      throw error;
    }
  };
  /**
   * 차단한 유저리스트 불러오기
   */
  // public blockUserList = async (blockUserListPayment: BlockUserListDto) => {
  //   try {
  //     logger.info("", {
  //       layer: "Service",
  //       className: "BlockUserService",
  //       functionName: "blockUserList",
  //     });

  //     return await this.blockUserRepository.blockUserList(blockUserListPayment);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
}

export default BlockUserService;
