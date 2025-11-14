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
const usersService_1 = __importDefault(require("../service/usersService"));
const followService_1 = __importDefault(require("../service/followService"));
const logger_1 = __importDefault(require("../config/logger"));
const userExp_1 = require("../common/validators/userExp");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
const customError_1 = require("../errors/customError");
class UserHandler {
    constructor() {
        this.userService = new usersService_1.default();
        this.followService = new followService_1.default();
        /**
         * 회원가입
         *
         * @param req
         * @param res
         * @param next
         * @returns
         */
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/user/signup",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "createUser",
                });
                const { email, password, aboutMe, age, nickname, username } = req.body;
                if (!(0, userExp_1.emailExp)(email))
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.EMAIL_INVALID.status, error_codes_json_1.default.AUTH.EMAIL_INVALID.code, "이메일형식이 맞지 않습니다. ");
                if (!(0, userExp_1.passwordExp)(password))
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.PASSWORD_INVALID.status, error_codes_json_1.default.AUTH.PASSWORD_INVALID.code, "패스워드형식이 맞지 않습니다. ");
                if (!(0, userExp_1.nicknameExp)(nickname))
                    throw new customError_1.CustomError(error_codes_json_1.default.USER.NICKNAME_INVALID.status, error_codes_json_1.default.USER.NICKNAME_INVALID.code, "닉네임형식에 맞지않습니다.");
                const signupInfo = {
                    email,
                    password,
                    aboutMe,
                    age,
                    nickname,
                    username,
                };
                yield this.userService.createUser(signupInfo);
                return res.status(200).json({ message: "회원가입이 완료되었습니다. " });
            }
            catch (e) {
                next(e);
            }
        });
        /**
         * 모든 회원정보리스트
         *
         * @param req
         * @param res
         * @param next
         * @returns 프로필, 닉네임, id
         *
         *
         */
        this.findAllUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/user/",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "findAllUser",
                });
                const result = yield this.userService.findAllUser();
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * 자신의 정보가져오기
         *
         * @param req
         * @param res
         * @param next
         * @returns id, email, follower, folloing, blockedUsers, info
         *
         *
         */
        this.findMyInfos = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/user/",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "findMyInfos",
                });
                const myId = res.locals.userInfo.userId;
                const result = yield this.userService.findMyInfos(myId);
                return res.status(200).json({ data: result });
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * 특정유저의 정보가져오기
         *
         * @param req
         * @param res
         * @param next
         */
        this.findUserInfos = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/user/:userId",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "findUserInfos",
                });
                const myId = (_a = res.locals.userInfo) === null || _a === void 0 ? void 0 : _a.userId;
                const userId = req.params.userId;
                const result = yield this.userService.findUserInfos({ userId, myId });
                result.dataValues.isFollowinged =
                    result.dataValues.isFollowinged === 1 ? true : false;
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        // 특정유저의 정보가져오기
        this.findUserByEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/user/:email",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "findUserByEmail",
                });
                const email = req.params.email;
                const result = yield this.userService.findUserByEmail(email);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        // 자신의 정보가져오기
        this.findUserById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "get",
                    url: "api/user/myinfo/:userId",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "findUserById",
                });
                const userId = res.locals.userInfo.userId;
                const result = yield this.userService.findUserById(userId);
                return res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        /**
         *
         * @param req
         * @param res
         * @param next
         * @return 자신의 팔로잉 팔로워리스트 가져오기
         */
        // 회원정보 수정하기
        this.modifyUserInfo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "put",
                    url: "api/user/:id",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "modifyUserInfo",
                });
                const userInfo = {
                    userId: res.locals.userInfo.userId,
                    username: req.body.username,
                    aboutMe: req.body.aboutMe,
                    age: req.body.age,
                };
                // aboutMe형식
                if ((0, userExp_1.aboutMeExp)(userInfo.aboutMe))
                    throw new Error("500자이내로 써주세요.");
                // age형식
                if ((0, userExp_1.ageExp)(userInfo.age))
                    throw new Error("나이형식에 맞지않습니다.");
                // username형식
                if ((0, userExp_1.username)(userInfo.username))
                    throw new Error("유저이름형식에 맞지않습니다. ");
                yield this.userService.modifyUserInfo(userInfo);
                return res.status(200).json({ message: "유저정보가 변경되었습니다. " });
            }
            catch (error) {
                next(error);
            }
        });
        // 회원탈퇴
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "delete",
                    url: "api/user/:id",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "deleteUser",
                });
                const id = res.locals.userInfo.userId;
                yield this.userService.deleteUser(id);
                return res.status(200).send({ message: "회원탈퇴가 완료되었습니다." });
            }
            catch (error) {
                next(error);
            }
        });
        this.getBlockedUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "delete",
                    url: "api/user/get-blockedusers-list",
                    layer: "Handlers",
                    className: "UserHandler",
                    functionName: "getBlockedUsers",
                });
                const params = {
                    blockedUserIds: req.body.blockedUserIds,
                };
                const result = yield this.userService.getBlockedUsers(params);
                return res.status(200).json({ datas: result });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserHandler;
