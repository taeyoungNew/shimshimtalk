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
const follows_1 = __importDefault(require("../database/models/follows"));
const logger_1 = __importDefault(require("../config/logger"));
const userinfos_1 = __importDefault(require("../database/models/userinfos"));
class FollowRepository {
    constructor() {
        // 팔로잉
        this.following = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Repository",
                    className: "FollowRepository",
                    functionName: "following",
                });
                yield follows_1.default.create({
                    followerId: params.userId,
                    followingId: params.followingId,
                });
            }
            catch (error) {
                throw error;
            }
        });
        // 팔로잉 끊기
        this.stopFollowing = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Repository",
                    className: "FollowRepository",
                    functionName: "stopFollowing",
                });
                yield follows_1.default.destroy({
                    where: {
                        followerId: params.userId,
                        followingId: params.followingId,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
        // 자신이 팔로잉한 유저들을조회
        this.getFollowings = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Repository",
                    className: "FollowRepository",
                    functionName: "getFollowings",
                });
                return yield follows_1.default.findAll({
                    attributes: ["followingId"],
                    where: {
                        followerId: param,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
        // 자신의 팔로워들을조회
        this.getFollowers = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Repository",
                    className: "FollowRepository",
                    functionName: "getFollowers",
                });
                return yield follows_1.default.findAll({
                    attributes: ["followerId"],
                    where: {
                        followingId: param.userId,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
        this.getFollowInfos = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Repository",
                    className: "FollowRepository",
                    functionName: "getFollowInfos",
                });
                return yield userinfos_1.default.findAll({
                    attributes: ["userId", "nickname", "username"],
                    where: {
                        userId: params,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
        // 팔로잉한 한명의 유저를 조회
        this.getFollowing = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Repository",
                    className: "FollowRepository",
                    functionName: "getFollowing",
                });
                return yield follows_1.default.findOne({
                    where: {
                        followingId: params.followingId,
                        followerId: params.userId,
                    },
                });
            }
            catch (error) {
                throw error;
            }
        });
        // 차단?
    }
}
exports.default = FollowRepository;
