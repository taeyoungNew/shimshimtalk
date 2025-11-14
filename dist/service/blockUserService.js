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
const usersService_1 = __importDefault(require("./usersService"));
const blockUserRepository_1 = __importDefault(require("../repositories/blockUserRepository"));
const logger_1 = __importDefault(require("../config/logger"));
class BlockUserService {
    constructor() {
        this.blockUserRepository = new blockUserRepository_1.default();
        this.userService = new usersService_1.default();
        /**
         * 유저차단
         */
        this.blockUser = (blockUserPayment) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "BlockUserService",
                    functionName: "blockUser",
                });
                const { blockedId, blockerId } = blockUserPayment;
                // 차단할 유저가 존재하는지 유무
                yield this.userService.findUserById(blockedId);
                yield this.blockUserRepository.blockUser(blockUserPayment);
            }
            catch (error) {
                throw error;
            }
        });
        /**
         * 유저차단풀기
         */
        this.unBLockUser = (unBlockUserPayment) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "BlockUserService",
                    functionName: "unBLockUser",
                });
                const { blockedId, blockerId } = unBlockUserPayment;
                // 차단을 해제할 유저가 존재하는지 유무
                yield this.userService.findUserById(blockedId);
                yield this.blockUserRepository.unBLockUser(unBlockUserPayment);
            }
            catch (error) {
                throw error;
            }
        });
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
}
exports.default = BlockUserService;
