// 이메일형식
export const emailExp = (param: string): Boolean => {
  const exp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (exp.test(param)) return true;
  return false;
};

// 패스워드형식
export const passwordExp = (param: string) => {
  const exp = /[1-9]/;
  if (exp.test(param)) return true;
  return false;
};

// 닉네임형식
export const nicknameExp = (param: string) => {
  const exp = /[a-zA-Z0-9]{1,10}/;
  if (exp.test(param)) return true;
  return false;
};

// 이름
export const username = (param: string) => {
  const exp = /[a-zA-Zㄱ-ㅎ가-힣]{, 30}/;
  if (exp.test(param)) return true;
  return false;
};

// 자기소개형식
export const aboutMeExp = (param: string) => {
  const exp = /.{1, 100}/;
  if (exp.test(param)) return true;
  return false;
};

// 나이형식
export const ageExp = (param: number) => {
  const exp = /[0-9]{, 100}/;
  if (exp.test(String(param))) return true;
  return false;
};
