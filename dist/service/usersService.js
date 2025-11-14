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
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
const logger_1 = __importDefault(require("../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
class UserService {
    constructor() {
        this.userRepository = new usersRepository_1.default();
        /**
         *
         * @param userInfo
         *
         * 회원가입
         */
        this.createUser = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "createUser",
                });
                // 중복된 이메일을 쓰는지 확인
                yield this.checkUserByEmail(userInfo.email);
                // 중복된 닉네임인지 확인
                yield this.checkNickname(userInfo.nickname);
                // password암호화하기
                const hashpassword = bcrypt_1.default.hashSync(userInfo.password, Number(process.env.SALT_ROUND));
                // payment
                const signupUser = {
                    email: userInfo.email,
                    password: hashpassword,
                };
                // User회원가입
                yield this.userRepository.createUser(signupUser);
                // email로 회원가입하는 회원의 id값을 가져옴
                const result = yield this.findUserByEmail(userInfo.email);
                const signupUserInfo = {
                    userId: result.id,
                    username: userInfo.username,
                    aboutMe: userInfo.aboutMe,
                    nickname: userInfo.nickname,
                    age: userInfo.age,
                };
                // userInfo저장
                yield this.userRepository.createUserInfo(signupUserInfo);
            }
            catch (e) {
                throw e;
            }
        });
        /**
         *
         * @returns 모든회원정보들
         *
         * 모든회원정보가져오기
         */
        this.findAllUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "findAllUser",
                });
                const result = yield this.userRepository.findAllUser();
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         * 자신의 정보가져오기
         *
         * @param myId: string
         * @returns id, email, follower, folloing, blockedUsers, info
         */
        this.findMyInfos = (myId) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "findMyInfos",
                });
                const result = yield this.userRepository.findMyInfos(myId);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         * 타유저의 정보가져오기
         *
         * @param userId
         * @returns
         */
        this.findUserInfos = (params) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "findUserInfos",
                });
                const result = yield this.userRepository.findUserInfos(params);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         *
         * @param email
         * @returns 유저의 정보
         *
         * email로 특정회원정보찾기
         */
        this.getUserInfo = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "getUserInfo",
                });
                yield this.findUserByEmail(email);
                return yield this.userRepository.findByEmail(email);
            }
            catch (error) {
                throw error;
            }
        });
        this.findUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "findUser",
                });
                yield this.findUserById(id);
                const result = yield this.userRepository.findById(id);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         *
         * @param userInfo
         *
         * 회원정보변경
         */
        this.modifyUserInfo = (userInfo) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "modifyUserInfo",
                });
                yield this.findUserById(userInfo.userId);
                yield this.userRepository.modifyUserInfos(userInfo);
            }
            catch (error) {
                throw error;
            }
        });
        //
        /**
         *
         * @param userId
         * @returns 유저의 정보
         *
         * 특정회원의 정보(id)
         */
        this.findUserById = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "findUserById",
                });
                const result = yield this.userRepository.findById(userId);
                if (!result) {
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.USER_NOT_FOUND.status, error_codes_json_1.default.AUTH.USER_NOT_FOUND.code, "존재하지않는 회원입니다.");
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         *
         * @param email
         *
         * 특정회원의 중복유무
         */
        this.checkUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "checkUserByEmail",
                });
                const result = yield this.userRepository.findByEmail(email);
                if (result) {
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.USER_ALREADY_EXISTS.status, error_codes_json_1.default.AUTH.USER_ALREADY_EXISTS.code, "이미 존재하는 회원입니다. ");
                }
            }
            catch (error) {
                throw error;
            }
        });
        /**
         *
         * @param nickname
         *
         * 닉네임중복체크
         */
        this.checkNickname = (nickname) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "checkNickname",
                });
                const result = yield this.userRepository.checkNickname(nickname);
                if (result) {
                    throw new customError_1.CustomError(error_codes_json_1.default.USER.NICKNAME_ALREADY_EXISTS.status, error_codes_json_1.default.USER.NICKNAME_ALREADY_EXISTS.code, "이미 사용중인 닉네임입니다..");
                }
            }
            catch (error) {
                throw error;
            }
        });
        /**
         * * 회원의 email로 회원정보가져오기
         * @param email
         * @returns 회원정보
         *
         *
        
         */
        this.findUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "findUserByEmail",
                });
                const result = yield this.userRepository.findByEmail(email);
                if (!result) {
                    throw new customError_1.CustomError(error_codes_json_1.default.AUTH.USER_NOT_FOUND.status, error_codes_json_1.default.AUTH.USER_NOT_FOUND.code, "존재하지않는 회원입니다.");
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        });
        /**
         *
         * @param id
         *
         * 회원탈퇴
         */
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    layer: "Service",
                    className: "UserService",
                    functionName: "deleteUser",
                });
                yield this.findUserById(id);
                yield this.userRepository.deleteAccount(id);
            }
            catch (error) {
                throw error;
            }
        });
        /**
         * 차단한 유저리스트 불러오기
         *
         * @param blockedUserIds[]
         *  @return blockedUserId, nickname
         */
        this.getBlockedUsers = (param) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getBlockedUsers(param);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserService;
