"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DIALECT = exports.DB_PORT = exports.DB_DATABASE = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USERNAME = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env` });
_a = Object.assign({}, process.env), exports.PORT = _a.PORT, exports.DB_USERNAME = _a.DB_USERNAME, exports.DB_PASSWORD = _a.DB_PASSWORD, exports.DB_HOST = _a.DB_HOST, exports.DB_DATABASE = _a.DB_DATABASE, exports.DB_PORT = _a.DB_PORT, exports.DB_DIALECT = _a.DB_DIALECT;
