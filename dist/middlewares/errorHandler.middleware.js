"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const customError_1 = require("../errors/customError");
const error_codes_json_1 = __importDefault(require("../constants/error-codes.json"));
const errorHandler = (error, req, res, next) => {
    logger_1.default.error(`${error.message}`);
    if (error instanceof customError_1.CustomError) {
        return res.status(error.statusCode).json({
            status: error.statusCode,
            errorCode: error.errorCode,
            message: error.message,
        });
    }
    // 예상 못한 에러 → 공통 에러로 응답
    return res.status(500).json({
        status: 500,
        errorCode: error_codes_json_1.default.COMMON.INTERNAL_ERROR,
        message: "서버 내부 오류가 발생했습니다.",
    });
};
exports.errorHandler = errorHandler;
