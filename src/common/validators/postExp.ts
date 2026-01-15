// 게시물 제목형식
export const postTitleExp = (param: string): Boolean => {
  const exp = /.{1,50}$/i;

  if (exp.test(param)) return true;
  return false;
};

// 게시물 내용형식
export const postContentExp = (param: string): Boolean => {
  const normalized = param.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  return normalized.length >= 1 && normalized.length <= 300;
};
