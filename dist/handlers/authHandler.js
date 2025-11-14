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
const accToken_1 = require("../middlewares/common/accToken");
const refToken_1 = require("../middlewares/common/refToken");
const userIdCache_1 = require("../common/cacheLocal/userIdCache");
const usersService_1 = __importDefault(require("../service/usersService"));
const authService_1 = __importDefault(require("../service/authService"));
const logger_1 = __importDefault(require("../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
class AuthHandler {
    constructor() {
        this.userService = new usersService_1.default();
        this.authService = new authService_1.default();
        /**
         * ログインAPI
         *
         * @param req email & pw
         * @param res
         * @param next
         * @returns accToken refToken
         */
        this.loginUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/auth/login",
                    layer: "Handlers",
                    className: "AuthHandler",
                    functionName: "loginUser",
                });
                // 로그인정보로 회원유무확인
                const getUserInfo = yield this.userService.findUserByEmail(email);
                // 패스워드확인
                this.validPassword(password, getUserInfo.password);
                // acc & ref token생성
                const accToken = (0, accToken_1.accessToken)(getUserInfo.id, getUserInfo.email);
                // refToken 생성
                const refToken = (0, refToken_1.refreshToken)(getUserInfo.id, getUserInfo.email);
                // refToken 저장
                yield this.authService.saveRefToken(refToken, getUserInfo.id);
                const loginUserInfo = {
                    id: getUserInfo.id,
                    email: getUserInfo.email,
                    userNickname: getUserInfo.UserInfo.nickname,
                };
                // cache에 유저id저장
                yield userIdCache_1.userCache.set(`token:${accToken}`, JSON.stringify(loginUserInfo));
                // accToken쿠기에 담기
                res.cookie("authorization", `Bearer ${accToken}`, {
                    sameSite: "strict",
                    httpOnly: true,
                });
                logger_1.default.info("로그인되었습니다.", {
                    status: 200,
                    user: getUserInfo.email,
                    method: "post",
                    uer: "api/auth/login",
                });
                return res.status(200).json({
                    message: "로그인되었습니다. ",
                    data: {
                        id: getUserInfo.id,
                        email: getUserInfo.email,
                        nickname: getUserInfo.UserInfo.nickname,
                    },
                });
            }
            catch (e) {
                next(e);
            }
        });
        /**
         * ログアウAPI
         *
         * @param req
         * @param res
         * @param next
         * @returns
         */
        this.logoutUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/auth/login",
                    layer: "Handlers",
                    className: "AuthHandler",
                    functionName: "logoutUser",
                });
                const { authorization } = req.cookies;
                const [tokenType, token] = authorization.split(" ");
                yield userIdCache_1.userCache.del(`token:${token}`);
                res.clearCookie("authorization");
                logger_1.default.info("로그아웃되었습니다.", {
                    status: 200,
                    method: "post",
                    uer: "api/auth/logput",
                });
                return res.status(200).json({
                    message: "로그아웃되었습니다. ",
                });
            }
            catch (e) {
                next(e);
            }
        });
        this.authMe = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info("", {
                    method: "post",
                    url: "api/auth/auth-me",
                    layer: "Handlers",
                    className: "AuthHandler",
                    functionName: "authMe",
                });
                const { authorization } = req.cookies;
                const [tokenType, token] = authorization.split(" ");
                if (authorization === undefined || authorization === null)
                    return res.status(401).json({
                        isLogin: false,
                    });
                const getUserLoginInfo = JSON.parse(yield userIdCache_1.userCache.get(`token:${token}`));
                if (getUserLoginInfo) {
                    return res.status(200).json({
                        isLogin: true,
                        user: {
                            id: getUserLoginInfo.id,
                            email: getUserLoginInfo.email,
                            nickname: getUserLoginInfo.userNickname,
                        },
                    });
                }
                else {
                    return res.status(404).json({ message: "로그인하지 않았습니다." });
                }
            }
            catch (e) {
                next(e);
            }
        });
        /**
         * PW確認モジュール
         *
         * @param password 入力パスワード
         * @param exPassword DB上のパスワード
         *
         */
        this.validPassword = (password, exPassword) => {
            const result = bcrypt_1.default.compareSync(password, exPassword);
            if (!result)
                throw new customError_1.CustomError(error_codes_json_1.default.AUTH.PASSWORD_INVALID.status, error_codes_json_1.default.AUTH.PASSWORD_INVALID.code, "패스워드가 일치하지않습니다.");
        };
    }
}
exports.default = AuthHandler;
