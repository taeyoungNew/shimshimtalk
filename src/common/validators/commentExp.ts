// 댓글내용형식
export const commentContentExp = (param: string): Boolean => {
  const exp = /.{1,200}$/i;

  if (exp.test(param)) return true;
  return false;
};
