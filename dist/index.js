"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_2 = __importDefault(require("./common/cacheLocal/index"));
const morgan_1 = __importDefault(require("./middlewares/morgan"));
const logger_1 = __importDefault(require("./config/logger"));
const morgan_2 = __importDefault(require("morgan"));
const express_2 = require("express");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const PORT = 3001;
dotenv_1.default.config();
app.use((0, cors_1.default)({ origin: process.env.FRONT_CORS, credentials: true }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, express_2.json)());
app.use("/api", index_1.default);
// 모든 곳에서 발생하는 에러를 catch
app.use(index_2.default);
app.use((0, morgan_2.default)("combined", {
    skip: function (req, res) {
        return res.statusCode < 400;
    },
}));
app.use(morgan_1.default);
app.all(/(.*)/, (req, res) => {
    res
        .status(404)
        .json({ errorCode: "COMMON_NOT_FOUND", message: "잘못된 경로입니다. " });
});
app.use(errorHandler_middleware_1.errorHandler);
app.listen(PORT, () => {
    logger_1.default.info("심심톡 실행 PORT: ${PORT}");
});
