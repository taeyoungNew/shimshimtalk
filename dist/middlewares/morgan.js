"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../config/logger"));
// Morganのストリームを定義
const stream = {
    write: (message) => {
        logger_1.default.info(message.trim());
    },
};
// カスタムフォーマットの定義
const format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';
// Morganミドルウェアの作成
const morganMiddleware = (0, morgan_1.default)(format, { stream });
exports.default = morganMiddleware;
