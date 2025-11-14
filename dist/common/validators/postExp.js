"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postContentExp = exports.postTitleExp = void 0;
// 게시물 제목형식
const postTitleExp = (param) => {
    const exp = /.{1,50}$/i;
    if (exp.test(param))
        return true;
    return false;
};
exports.postTitleExp = postTitleExp;
// 게시물 내용형식
const postContentExp = (param) => {
    const exp = /.{1,500}$/i;
    if (exp.test(param))
        return true;
    return false;
};
exports.postContentExp = postContentExp;
