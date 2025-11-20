"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// accToken생성
const accessToken = (userId, email) => {
    dotenv_1.default.config();
    try {
        const accToken = jsonwebtoken_1.default.sign({ userId, email }, process.env.SECRET_ACCTOKEN_KEY, {
            expiresIn: process.env.ACCTOKEN_EXPIRA,
        });
        return accToken;
    }
    catch (error) {
        throw error;
    }
};
exports.accessToken = accessToken;
