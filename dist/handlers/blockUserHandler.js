"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockUserService_1 = __importDefault(require("../service/blockUserService"));
const logger_1 = __importDefault(require("../config/logger"));
/**
 * ブロッククラス
 *
 */
class BlockUserHandler {
    constructor() {
        this.blockUserService = new blockUserService_1.default();
        /**
         * ユーザブロックAPI
         *
         * @param req ブロック対象のID
         * @param res 自分のID
         * @param next
         * @returns
         */
        this.blockUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Handler",
                    className: "BlockUserHandler",
                    functionName: "blockUser",
                });
                const userId = res.locals.userInfo.userId;
                const blockUserPayment = {
                    blockedId: req.params.blockedId,
                    blockerId: userId,
                };
                yield this.blockUserService.blockUser(blockUserPayment);
                return res.status(200).send({ message: "해당유저를 차단하였습니다." });
            }
            catch (error) {
                next(error);
            }
        });
        this.unBlockUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Handler",
                    className: "BlockUserHandler",
                    functionName: "unBlockUser",
                });
                const userId = res.locals.userInfo.userId;
                const unBlockUserPayment = {
                    blockedId: req.params.unblockedId,
                    blockerId: userId,
                };
                yield this.blockUserService.blockUser(unBlockUserPayment);
                return res
                    .status(200)
                    .send({ message: "해당유저의 차단을 해제하였습니다." });
            }
            catch (error) {
                next(error);
            }
        });
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
}
exports.default = BlockUserHandler;
