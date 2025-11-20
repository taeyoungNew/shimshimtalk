"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message || errorCode);
        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
