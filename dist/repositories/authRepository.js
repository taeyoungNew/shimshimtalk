"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("../database/models/users"));
const logger_1 = __importDefault(require("../config/logger"));
class AuthRepository {
    constructor() {
        this.saveRefToken = (refToken, userId) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "AuthRepository",
                functionName: "saveRefToken",
            });
            yield users_1.default.update({
                refToken,
            }, {
                where: {
                    id: userId,
                },
            });
        });
        this.logoutUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("", {
                layer: "Repository",
                className: "AuthRepository",
                functionName: "logoutUser",
            });
            yield users_1.default.update({ refToken: "" }, { where: { id: userId } });
        });
    }
}
exports.default = AuthRepository;
