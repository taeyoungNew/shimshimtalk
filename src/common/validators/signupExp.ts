export const emailExp = (param: string): Boolean => {
  const exp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (exp.test(param)) return true;
  return false;
};

export const passwordExp = (param: string) => {
  const exp = /[1-9]/;
  if (exp.test(param)) return true;
  return false;
};

export const nicknameExp = (param: string) => {
  const exp = /[a-zA-Z0-9]{1,10}/;
  if (exp.test(param)) return true;
  return false;
};
