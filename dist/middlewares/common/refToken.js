"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// refToken생성
const refreshToken = (userId, email) => {
    dotenv_1.default.config();
    const refToken = jsonwebtoken_1.default.sign({ userId, email }, process.env.SECRET_REFTOKEN_KEY, { expiresIn: process.env.REFTOKEN_EXPIRA });
    return refToken;
};
exports.refreshToken = refreshToken;
