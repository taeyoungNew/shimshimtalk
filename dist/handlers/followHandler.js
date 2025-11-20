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
const followService_1 = __importDefault(require("../service/followService"));
const logger_1 = __importDefault(require("../config/logger"));
class FollowHandler {
    constructor() {
        this.followService = new followService_1.default();
        // 팔로잉하기
        this.following = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/follow/:followingId",
                    layer: "Handlers",
                    className: "FollowHandler",
                    functionName: "following",
                });
                const payment = {
                    userId: res.locals.userInfo.userId,
                    followingId: req.params.followingId,
                };
                yield this.followService.following(payment);
                return res.status(200).json({ message: "팔로잉되었습니다." });
            }
            catch (e) {
                next(e);
            }
        });
        // 팔로잉끊기
        this.stopFollowing = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/follow/:followingId",
                    layer: "Handlers",
                    className: "FollowHandler",
                    functionName: "stopFollowing",
                });
                const payment = {
                    userId: res.locals.userInfo.userId,
                    followingId: req.params.followingId,
                };
                yield this.followService.stopFollowing(payment);
                return res.status(200).json({ message: "팔로잉을 취소했습니다." });
            }
            catch (e) {
                next(e);
            }
        });
        // 자신이 팔로잉한 유저들 조회
        this.getFollowings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/follow/myfollowins",
                    layer: "Handlers",
                    className: "FollowHandler",
                    functionName: "getFollowings",
                });
                const userId = res.locals.userInfo.userId;
                const result = yield this.followService.getFollowings(userId);
                return res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
        // 자신의 팔로워들 조회
        this.getFollowers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/follow/myfollews",
                    layer: "Handlers",
                    className: "FollowHandler",
                    functionName: "getFollowers",
                });
                const userId = res.locals.userInfo.userId;
                const result = yield this.followService.getFollowers(userId);
                return res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.default = FollowHandler;
