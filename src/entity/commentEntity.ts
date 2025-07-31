// 댓글작성
export interface CreateCommentEntity {
  userId: string;
  postId: number;
  content: string;
  userNickname: string;
}

// 댓글수정
export interface ModifyCommentEntity {
  commentId: number;
  comment: string;
}

// 해당댓글조회
export interface GetCommentEntity {
  commentId: number;
}

// 해당게시물의 댓글들 조회
export interface GetCommentsEntity {
  postId: number;
  commentLastId: number;
}

// 댓글삭제
export interface DeleteCommentEntity {
  commentId: number;
  userId: string;
}
