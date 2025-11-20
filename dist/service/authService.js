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
const authRepository_1 = __importDefault(require("../repositories/authRepository"));
class AuthService {
    constructor() {
        this.authRepository = new authRepository_1.default();
        // refToken저장
        this.saveRefToken = (refToken, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authRepository.saveRefToken(refToken, userId);
            }
            catch (error) {
                throw error;
            }
        });
        //
        this.logoutUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.authRepository.logoutUser(userId);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AuthService;
