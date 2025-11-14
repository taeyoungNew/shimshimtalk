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
Object.defineProperty(exports, "__esModule", { value: true });
const postCache_1 = require("./postCache");
const userIdCache_1 = require("./userIdCache");
const userPostsCache_1 = require("./userPostsCache");
const connetCache = () => __awaiter(void 0, void 0, void 0, function* () {
    userIdCache_1.userCache;
    postCache_1.postCache;
    userPostsCache_1.userPostsCache;
});
exports.default = connetCache;
