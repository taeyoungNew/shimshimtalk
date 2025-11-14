"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postLikeHandler_1 = __importDefault(require("../handlers/postLikeHandler"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isLogout_middleware_1 = require("../middlewares/isLogout.middleware");
const postLikeRouter = (0, express_1.Router)();
const postLikeHandler = new postLikeHandler_1.default();
postLikeRouter.post("/:postId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, postLikeHandler.postLike);
postLikeRouter.delete("/:postId", isLogout_middleware_1.isLogoutMiddleware, auth_middleware_1.authMiddleware, postLikeHandler.postLikeCancel);
exports.default = postLikeRouter;
