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
const logger_1 = __importDefault(require("../config/logger"));
const blockuser_1 = __importDefault(require("../database/models/blockuser"));
class BlockUserRepository {
    constructor() {
        /**
         * 유저차단하기
         */
        this.blockUser = (blockUserPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "BlockUserRepository",
                functionName: "blockUser",
            });
            const { blockedId, blockerId } = blockUserPayment;
            yield blockuser_1.default.create({
                blockerId,
                blockedId,
            });
        });
        /**
         * 유저차단풀기
         */
        this.unBLockUser = (unBlockUserPayment) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "BlockUserRepository",
                functionName: "unBLockUser",
            });
            const { blockedId, blockerId } = unBlockUserPayment;
            yield blockuser_1.default.destroy({
                where: {
                    blockerId,
                    blockedId,
                },
            });
        });
        /**
         * 자신이 차단한 유저리스트 불러오기
         *
         * @retrun id, blockerdUserNickname, blockerdUserId
         */
        // public blockUserList = async (unBlockUserPayment: BlockUserListEntity) => {
        //   logger.info("", {
        //     layer: "Repository",
        //     className: "BlockUserRepository",
        //     functionName: "blockUserList",
        //   });
        //   const { userId } = unBlockUserPayment;
        //   await BlockUser.findAll({
        //     attributes: ["id", "createdAt"],
        //     include: [{ model: Users, required: true, where: {
        //       id:
        //     } }],
        //     where: {
        //       blockerId: userId,
        //     },
        //   });
        // };
    }
}
exports.default = BlockUserRepository;
