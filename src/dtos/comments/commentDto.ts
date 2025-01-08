// 댓글작성
export interface CreateCommentDto {
  userId: string;
  postId: number;
  content: string;
  userNickname: string;
}

// 댓글수정
export interface ModifyCommentDto {
  userId: string;
  commentId: number;
  newContent: string;
}

// 해당댓글조회
export interface GetCommentDto {
  commentId: number;
}

// 해당게시물의 댓글들 조회
export interface GetCommentsDto {
  postId: number;
  commentLastId: number;
}

// 댓글삭제
export interface DeleteCommentDto {
  userId: string;
  commentId: number;
}

// 댓글이 유저의 것인지 확인
export interface IsUserCommentDto {
  userId: string;
  commentId: number;
}
