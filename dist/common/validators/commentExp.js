"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentContentExp = void 0;
// 댓글내용형식
const commentContentExp = (param) => {
    const exp = /.{1,200}$/i;
    if (exp.test(param))
        return true;
    return false;
};
exports.commentContentExp = commentContentExp;
