"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoginMiddleware = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
// 로그인을 이미 하고이는지 확인하는 미들웨어
// 되어있으면 에러반환
// 어차피 로그인한 상태에서 로그인을  다시하려고 할때 거르는 용도로만 쓰일것임
const isLoginMiddleware = (req, res, next) => {
    try {
        if (req.cookies.authorization !== undefined) {
            logger_1.default.error("현재 로그인상태입니다.", {
                method: "post",
                url: "/api/auth",
                status: 402,
            });
            throw new customError_1.CustomError(error_codes_json_1.default.AUTH.BAD_REQUEST.status, error_codes_json_1.default.AUTH.BAD_REQUEST.code, "현재 로그인상태입니다. ");
        }
        next();
    }
    catch (error) {
        throw error;
    }
};
exports.isLoginMiddleware = isLoginMiddleware;
