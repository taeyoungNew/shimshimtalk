export interface CreatePostDto {
  userId: string;
  title: string;
  content: string;
}

export interface ModifyPostDto {
  userId: string;
  postId: number;
  title: string;
  content: string;
}

export interface GetPostDto {
  postId: number;
}

export interface GetAllPostDto {
  postLastId: number;
}

export interface GetUserPostsDto {
  userId: string;
  postLastId: number;
}

export interface DeletePostDto {
  userId: string;
  postId: number;
}
