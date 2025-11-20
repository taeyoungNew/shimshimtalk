"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const customError_1 = require("../../errors/customError");
const error_codes_json_1 = __importDefault(require("../../constants/error-codes.json"));
const checkAuth = (authorization, tokenType, token) => {
    if (!authorization)
        throw new customError_1.CustomError(error_codes_json_1.default.AUTH.UNAUTHORIZED.status, error_codes_json_1.default.AUTH.UNAUTHORIZED.code, "로그인 후 이용가능합니다.");
    if (tokenType !== "Bearer" || !token)
        throw new customError_1.CustomError(error_codes_json_1.default.AUTH.UNAUTHORIZED.status, error_codes_json_1.default.AUTH.UNAUTHORIZED.code, "로그인 후 이용가능합니다.");
};
exports.checkAuth = checkAuth;
