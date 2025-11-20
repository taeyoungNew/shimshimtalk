export interface CreatePostDto {
  userId: string;
  content: string;
}

export interface ModifyPostDto {
  userId: string;
  postId: number;
  content: string;
}

export interface GetPostDto {
  userId?: string;
  postId: number;
}

export interface GetPostDetailDto {
  userId?: string;
  postUserId?: string;
  postId: number;
}

export interface GetAllPostDto {
  userId?: string | null;
}

export interface GetUserPostsDto {
  userId: string;
  postLastId: number;
}

export interface DeletePostDto {
  userId: string;
  postId: number;
}

export interface IsUserPost {
  userId: string;
  postId: number;
}
