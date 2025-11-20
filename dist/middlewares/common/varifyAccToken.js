"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../config/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 토큰이 유효한지 확인
const verifyAccToken = (tokenPayment) => {
    try {
        logger_1.default.info("", {
            layer: "middlewares/common",
            functionName: "verifyAccToken",
        });
        const { token, type } = tokenPayment;
        const secretKey = type === "accToken"
            ? process.env.SECRET_ACCTOKEN_KEY
            : process.env.SECRET_REFTOKEN_KEY;
        const result = jsonwebtoken_1.default.verify(String(token), secretKey, (err, decoded) => {
            if (err) {
                switch (err.name) {
                    case "TokenExpiredError":
                        return "jwt exired";
                }
            }
            return decoded;
        });
        return result;
    }
    catch (error) {
        throw error;
    }
};
exports.default = verifyAccToken;
