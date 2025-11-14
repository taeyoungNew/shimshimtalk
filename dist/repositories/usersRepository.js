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
const sequelize_1 = __importDefault(require("sequelize"));
const index_1 = __importDefault(require("../database/models/index"));
const sequelize_2 = require("sequelize");
const { Users, UserInfos } = index_1.default;
class UserRepository {
    constructor() {
        // refToken취득
        this.getRefToken = (userId) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "getRefToken",
            });
            const result = yield Users.findByPk(userId, {
                attributes: ["refToken"],
                raw: true,
            });
            return result;
        });
        // Users 회원가입
        this.createUser = (signupInfo) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "createUser",
            });
            yield Users.create({
                email: signupInfo.email,
                password: signupInfo.password,
            });
        });
        // UserInfos 회원가입
        this.createUserInfo = (signupInfo) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "createUserInfo",
            });
            yield UserInfos.create({
                userId: signupInfo.userId,
                username: signupInfo.username,
                aboutMe: signupInfo.aboutMe,
                nickname: signupInfo.nickname,
                age: signupInfo.age,
            });
        });
        /**
         * 자신의 정보가져오기
         *
         * @param myId: string
         * @returns id, email, follower, folloing, blockedUsers, info
         */
        this.findMyInfos = (myId) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "findMyInfos",
            });
            // 에러가 난이유는 서브쿼라의 from절에서 테이블을 찾지못했기때문
            // migrate의 모델명으로 해야한다
            const result = yield Users.findOne({
                attributes: {
                    exclude: [
                        "refToken",
                        "password",
                        "refTokenExp",
                        "createdAt",
                        "updatedAt",
                    ],
                    // 서브쿼리
                    include: [
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN followingId = '${myId}' THEN 1 END)
                FROM Follows
            )`),
                            "followerCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN followerId = '${myId}' THEN 1 END)
                FROM Follows
            )`),
                            "followingCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN blockerId = '${myId}' THEN 1 END)
                FROM BlockUsers
            )`),
                            "blockedCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN userId = '${myId}' THEN 1 END)
                FROM Posts 
            )`),
                            "postCnt",
                        ],
                    ],
                },
                include: [
                    {
                        model: UserInfos,
                        attributes: ["username", "nickname", "aboutMe", "age"],
                    },
                    {
                        model: Users,
                        as: "Followings",
                        attributes: ["id"],
                        include: [
                            { model: UserInfos, attributes: ["id", "nickname", "username"] },
                        ],
                    },
                ],
                subQuery: true,
                where: { id: myId },
            });
            return result;
        });
        // 타유저의 정보가져오기
        this.findUserInfos = (params) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "findUserInfos",
            });
            const isFollowingLiteral = params.myId
                ? sequelize_1.default.literal(`(
            SELECT CASE
              WHEN COUNT(*) > 0
              THEN true
              ELSE false
               END
              FROM Follows as follows
             WHERE follows.followerId = '${params.myId}'
               AND follows.followingId = '${params.userId}'
          
          )`)
                : sequelize_1.default.literal(`0`);
            const result = yield Users.findOne({
                attributes: {
                    exclude: [
                        "refToken",
                        "password",
                        "refTokenExp",
                        "createdAt",
                        "updatedAt",
                    ],
                    // 서브쿼리
                    include: [
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN followingId = '${params.userId}' THEN 1 END)
                FROM Follows
            )`),
                            "followerCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN followerId = '${params.userId}' THEN 1 END)
                FROM Follows
            )`),
                            "followingCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN blockerId = '${params.userId}' THEN 1 END)
                FROM BlockUsers
            )`),
                            "blockedCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN userId = '${params.userId}' THEN 1 END)
                FROM Posts 
            )`),
                            "postCnt",
                        ],
                        [isFollowingLiteral, "isFollowinged"],
                    ],
                },
                include: [
                    {
                        model: UserInfos,
                        attributes: ["username", "nickname", "aboutMe", "age"],
                    },
                ],
                subQuery: true,
                where: { id: params.userId },
            });
            return result;
        });
        // email로 회원정보가져오기
        this.findByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "findByEmail",
            });
            const result = yield Users.findOne({
                attributes: ["id", "email", "password"],
                include: [
                    {
                        model: UserInfos,
                        attributes: ["username", "nickname", "aboutMe", "age"],
                    },
                ],
                where: {
                    email,
                },
            });
            return result;
        });
        // id로 회원정보가져오기
        this.findById = (id) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "findById",
            });
            // 에러가 난이유는 서브쿼라의 from절에서 테이블을 찾지못했기때문
            // migrate의 모델명으로 해야한다
            const result = yield Users.findOne({
                attributes: {
                    exclude: [],
                    include: [
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN followingId = '${id}' THEN 1 END)
                FROM Follows
            )`),
                            "followerCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN followerId = '${id}' THEN 1 END)
                FROM Follows
            )`),
                            "followingCnt",
                        ],
                        [
                            sequelize_1.default.literal(`(
              SELECT COUNT(CASE WHEN userId = '${id}' THEN 1 END)
                FROM Posts 
            )`),
                            "postCnt",
                        ],
                    ],
                },
                include: {
                    model: UserInfos,
                    attributes: ["username", "nickname", "aboutMe", "age"],
                },
                subQuery: true,
                where: { id },
            });
            return result;
        });
        // 닉네임 취득
        this.checkNickname = (nickname) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "checkNickname",
            });
            const result = yield UserInfos.findOne({
                where: {
                    nickname,
                },
            });
            return result;
        });
        // 모든 회원정보가져오기
        this.findAllUser = () => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "findAllUser",
            });
            const result = yield Users.findAll({
                attributes: ["email"],
                include: {
                    model: UserInfos,
                    attributes: ["username", "aboutMe", "nickname"],
                },
            });
            return result;
        });
        // nickname수정
        this.modifyNickname = (userId, newNickname) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "modifyNickname",
            });
            yield UserInfos.update({ nickname: newNickname }, {
                where: {
                    userId: userId,
                },
            });
        });
        // aboutMe수정
        this.modifyAboutMe = (userId, aboutMe) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "modifyAboutMe",
            });
            yield UserInfos.update({ aboutMe: aboutMe }, {
                where: {
                    userId: userId,
                },
            });
        });
        // age수정
        this.modifyAge = (userId, age) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "modifyAge",
            });
            yield UserInfos.update({ age }, { where: { userId } });
        });
        // password수정
        this.modifyPasssword = (userId, password) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "modifyPasssword",
            });
            yield Users.update({ password: password }, {
                where: {
                    userId: userId,
                },
            });
        });
        // 회원정보수정
        this.modifyUserInfos = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "modifyUserInfos",
            });
            yield UserInfos.update(userInfo, { where: { userId: userInfo.userId } });
        });
        // 회원탈퇴
        this.deleteAccount = (id) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "deleteAccount",
            });
            yield Users.destroy({ where: { id } });
        });
        /**
         * 차단한 유저의 리스트가져오기
         *
         * @param blockedUserIds[]
         * @return blockedUserId, nickname
         */
        this.getBlockedUsers = (param) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "UserRepository",
                functionName: "getBlockedUsers",
            });
            const userIds = param.blockedUserIds.map((el) => {
                return {
                    userId: el,
                };
            });
            return yield Users.findAll({
                attributes: ["id"],
                include: {
                    model: UserInfos,
                    attributes: ["nickname"],
                    where: {
                        [sequelize_2.Op.and]: userIds,
                    },
                },
            });
        });
    }
}
exports.default = UserRepository;
