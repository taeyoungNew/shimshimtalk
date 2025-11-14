"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ageExp = exports.aboutMeExp = exports.username = exports.nicknameExp = exports.passwordExp = exports.emailExp = void 0;
// 이메일형식
const emailExp = (param) => {
    const exp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (exp.test(param))
        return true;
    return false;
};
exports.emailExp = emailExp;
// 패스워드형식
const passwordExp = (param) => {
    const exp = /[1-9]{1,30}/;
    if (exp.test(param))
        return true;
    return false;
};
exports.passwordExp = passwordExp;
// 닉네임형식
const nicknameExp = (param) => {
    const exp = /[a-zA-Z0-9]{1,10}/;
    if (exp.test(param))
        return true;
    return false;
};
exports.nicknameExp = nicknameExp;
// 이름
const username = (param) => {
    const exp = /[a-zA-Zㄱ-ㅎ가-힣]{, 30}/;
    if (exp.test(param))
        return true;
    return false;
};
exports.username = username;
// 자기소개형식
const aboutMeExp = (param) => {
    const exp = /.{1, 100}/;
    if (exp.test(param))
        return true;
    return false;
};
exports.aboutMeExp = aboutMeExp;
// 나이형식
const ageExp = (param) => {
    const exp = /[0-9]{, 100}/;
    if (exp.test(String(param)))
        return true;
    return false;
};
exports.ageExp = ageExp;
