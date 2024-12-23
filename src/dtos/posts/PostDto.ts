export interface CreatePostDto {
  userId: string;
  title: string;
  content: string;
}

export interface ModifyPostDto {
  userId: string;
  postId: string;
  title: string;
  content: string;
}

export interface GetPostDto {
  postId: string;
}

export interface GetUserPostsDto {
  userId: string;
}

export interface DeletePostDto {
  userId: string;
  postId: string;
}
