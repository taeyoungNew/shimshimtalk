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
exports.authMiddleware = void 0;
const checkAuth_1 = require("../middlewares/common/checkAuth");
const accToken_1 = require("../middlewares/common/accToken");
const userIdCache_1 = require("../common/cacheLocal/userIdCache");
const logger_1 = __importDefault(require("../config/logger"));
const varifyAccToken_1 = __importDefault(require("./common/varifyAccToken"));
const usersRepository_1 = __importDefault(require("../repositories/usersRepository"));
const varifyRefToken_1 = __importDefault(require("./common/varifyRefToken"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
/**
 * @param req
 * @param res
 * @param next
 *
 */
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = new usersRepository_1.default();
    try {
        logger_1.default.info("", {
            layer: "middleware",
            functionName: "authMiddleware",
        });
        const { authorization } = req.cookies;
        // acctoken의 유무를 확인
        //  -> 없으면 로그인하라는 에러와 함께 로그인화면으로 go
        let tokenType, token;
        [tokenType, token] = authorization.split(" ");
        (0, checkAuth_1.checkAuth)(authorization, tokenType, token);
        const accTokenPayment = {
            token: token,
            type: "accToken",
        };
        // acctoken이 유효한지 확인
        const decodeAccToken = (0, varifyAccToken_1.default)(accTokenPayment);
        if (typeof decodeAccToken === "string" && decodeAccToken === "jwt exired") {
            logger_1.default.warn("acc토큰이 만료", {
                layer: "middleware",
                functionName: "authMiddleware",
            });
            // accToken이 만료되었을경우
            //  -> 유효하지않으면 reftoken을 확인
            // 캐시에 저장된 userId를 가져온다
            const cacheUserInfo = yield userIdCache_1.userCache.get(`token:${token}`);
            const cacheUserInfoParse = JSON.parse(cacheUserInfo);
            if (cacheUserInfoParse == null) {
                logger_1.default.warn("redis의 userId가 null", {
                    layer: "middleware",
                    functionName: "authMiddleware",
                });
                res.clearCookie("authorization");
                throw new customError_1.CustomError(error_codes_json_1.default.AUTH.TOKEN_EXPIRED.status, error_codes_json_1.default.AUTH.TOKEN_EXPIRED.code, "다시 로그인 해주십시오.");
            }
            // DB에 저장된 유저의 refToken을 가져온다.
            const dbRefToken = yield userRepository.getRefToken(cacheUserInfoParse.id);
            // 유저테이블의 refToken을 확인하고
            const refTokenPayment = {
                token: dbRefToken,
                type: "refToken",
            };
            const decodeRefToken = (0, varifyRefToken_1.default)(refTokenPayment);
            // refToken이 만료되었을 경우
            if (typeof decodeRefToken === "string" &&
                decodeRefToken === "jwt exired") {
                // 리플레쉬토큰까지 만료가되었을 시 캐시의 정보도 같이 지워준다.
                logger_1.default.error("토큰이 만료되어 다시 로그인해주십시오.", {
                    layer: "middleware",
                    functionName: "authMiddleware",
                });
                yield userIdCache_1.userCache.del(`token:${token}`);
                res.clearCookie("authorization");
                // 다시 로그인하라고 에러
                throw new customError_1.CustomError(error_codes_json_1.default.AUTH.TOKEN_EXPIRED.status, error_codes_json_1.default.AUTH.TOKEN_EXPIRED.code, "토큰이 만료되어 다시 로그인해주십시오.");
            }
            else {
                // refToken이 유효할경우 user정보를 가져와서
                // accToken을 재발급하고
                const cacheUserInfo = yield userIdCache_1.userCache.get(`token:${token}`);
                const cacheUserInfoParse = JSON.parse(cacheUserInfo);
                const userInfo = yield userRepository.findById(cacheUserInfoParse.id // json.stringfy로 저장을 했기때문에 이렇게 한번 큰따옴표와 \를 없애야한다.
                );
                logger_1.default.info("acc토큰재발급", {
                    layer: "middleware",
                    functionName: "authMiddleware",
                });
                // 새로운 acc토큰을 발급받고
                const newAccToken = (0, accToken_1.accessToken)(userInfo.id, userInfo.email);
                // res.locals로 다음 모듈에 유저의 정보들을 넘겨준다.
                res.locals.userInfo = {
                    userId: userInfo.id,
                    email: userInfo.email,
                };
                const newSetUserInfo = {
                    id: userInfo.id,
                    email: userInfo.email,
                    userNickname: userInfo.UserInfo.nickname,
                };
                yield userIdCache_1.userCache.del(`token:${token}`);
                yield userIdCache_1.userCache.set(`token:${newAccToken}`, JSON.stringify(newSetUserInfo));
                res.cookie("authorization", `Bearer ${newAccToken}`);
                next();
            }
        }
        else {
            // 만료가 안되었을 경우
            if (typeof decodeAccToken === "object") {
                // 다음 모듈에 유저의 정보를 넘긴다.
                res.locals.userInfo = decodeAccToken;
                next();
            }
        }
        // -> reftoken도 유효하지않으면 로그인하라는 에러와 함께 로그인화면으로 go
        // -> 유효하면 인가를 받음
    }
    catch (error) {
        next(error);
    }
});
exports.authMiddleware = authMiddleware;
