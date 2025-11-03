export interface PostLikeDto {
  userId: string;
  postId: number;
}

export interface PostLikeCancelDto {
  userId: string;
  postId: number;
}

export interface PostLikeCntDto {
  userId: string;
}

export interface GetIsLikedPostIdsDto {
  userId: string;
}
