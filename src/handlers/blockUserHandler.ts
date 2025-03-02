import { Response, Request, RequestHandler, NextFunction } from "express";
import BlockUserService from "../service/blockUserService";
import {
  BlockUserDto,
  BlockUserListDto,
  UnBlockUserDto,
} from "../dtos/blockUserDto";
import logger from "../config/logger";
class BlockUserHandler {
  private blockUserService = new BlockUserService();
  public blockUser = async (
    req: Request<{ blockedId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        layer: "Handler",
        className: "BlockUserHandler",
        functionName: "blockUser",
      });
      const userId = res.locals.userInfo.userId;
      const blockUserPayment: BlockUserDto = {
        blockedId: req.params.blockedId,
        blockerId: userId,
      };
      console.log(req.params.blockedId, userId);

      await this.blockUserService.blockUser(blockUserPayment);

      return res.status(200).send({ message: "해당유저를 차단하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  public unBlockUser = async (
    req: Request<{ unblockedId: string }, {}, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info("", {
        layer: "Handler",
        className: "BlockUserHandler",
        functionName: "unBlockUser",
      });
      const userId = res.locals.userInfo.userId;
      const unBlockUserPayment: UnBlockUserDto = {
        blockedId: req.params.unblockedId,
        blockerId: userId,
      };
      console.log(req.params.unblockedId);

      await this.blockUserService.blockUser(unBlockUserPayment);

      return res
        .status(200)
        .send({ message: "해당유저의 차단을 해제하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  // public blockUserList = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) => {
  //   try {
  //     logger.info("", {
  //       layer: "Handler",
  //       className: "BlockUserHandler",
  //       functionName: "unBlockUser",
  //     });
  //     const userId = res.locals.userInfo.userId;
  //     const blockUserListPayment: BlockUserListDto = {
  //       userId,
  //     };
  //     const blockedUserList =
  //       await this.blockUserService.blockUserList(blockUserListPayment);
  //     return res.status(200).json({ datas: blockedUserList });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default BlockUserHandler;
