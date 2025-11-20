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
const followRepository_1 = __importDefault(require("../repositories/followRepository"));
const usersService_1 = __importDefault(require("./usersService"));
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
const customError_1 = require("../errors/customError");
class FollowService {
    constructor() {
        this.followRepository = new followRepository_1.default();
        this.userService = new usersService_1.default();
        // 팔로잉하기
        this.following = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "FollowService",
                    functionName: "following",
                });
                // 팔로잉하려는 유저가 존재하는지
                yield this.userService.findUserById(params.followingId);
                // 이미 팔로잉하고있는지
                yield this.checkFollowingUser(params);
                yield this.followRepository.following(params);
            }
            catch (error) {
                throw error;
            }
        });
        // 팔로잉끊기
        this.stopFollowing = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "FollowService",
                    functionName: "stopFollowing",
                });
                // 팔로잉하려는 유저가 존재하는지
                yield this.userService.findUserById(params.followingId);
                yield this.checkUnFollowingUser(params);
                yield this.followRepository.stopFollowing(params);
            }
            catch (e) {
                throw e;
            }
        });
        // 자신이 팔로잉한 유저조회
        this.getFollowings = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "FollowService",
                    functionName: "getFollowings",
                });
                return yield this.followRepository.getFollowings(param);
            }
            catch (e) {
                throw e;
            }
        });
        // 자신의 팔로워조회
        this.getFollowers = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "FollowService",
                    functionName: "getFollowers",
                });
                return yield this.followRepository.getFollowers(param);
            }
            catch (e) {
                throw e;
            }
        });
        // 상대방을 팔로잉하고있는지 확인
        this.checkFollowingUser = (followingId) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "FollowService",
                    functionName: "checkFollowingUser",
                });
                const result = yield this.followRepository.getFollowing(followingId);
                if (result)
                    throw new customError_1.CustomError(error_codes_json_1.default.FOLLOW.FOLLOWING_ALREADY_EXISTS.status, error_codes_json_1.default.FOLLOW.FOLLOWING_ALREADY_EXISTS.code, "이미 팔로잉하고있는 유저입니다.");
            }
            catch (e) {
                throw e;
            }
        });
        // 상대방을 팔로잉
        // 상대방을 팔로잉하고있는지 확인
        this.checkUnFollowingUser = (followingId) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "FollowService",
                    functionName: "checkUnFollowingUser",
                });
                const result = yield this.followRepository.getFollowing(followingId);
                if (!result)
                    throw new customError_1.CustomError(error_codes_json_1.default.FOLLOW.BAD_REQUEST.status, error_codes_json_1.default.FOLLOW.BAD_REQUEST.code, "팔로잉하고 있지 않습니다.");
            }
            catch (e) {
                throw e;
            }
        });
    }
}
exports.default = FollowService;
