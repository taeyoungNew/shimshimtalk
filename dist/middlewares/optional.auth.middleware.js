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
exports.optionalAuthMiddleware = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const varifyAccToken_1 = __importDefault(require("./common/varifyAccToken"));
const optionalAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("", {
        layer: "middleware",
        functionName: "optionalMiddleware",
    });
    const authorization = req.cookies.authorization;
    if (!authorization) {
        next();
    }
    try {
        const [tokenType, token] = authorization.split(" ");
        const accTokenPayment = {
            token: token,
            type: "accToken",
        };
        const decodeAccToken = (0, varifyAccToken_1.default)(accTokenPayment);
        // 만료가 안되었을 경우
        if (typeof decodeAccToken === "object") {
            // 다음 모듈에 유저의 정보를 넘긴다.
            res.locals.userInfo = decodeAccToken;
        }
        next();
    }
    catch (error) {
        res.locals.userInfo = null;
        next();
    }
});
exports.optionalAuthMiddleware = optionalAuthMiddleware;
