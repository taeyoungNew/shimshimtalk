export interface CreatePostEntity {
  userId: string;
  content: string;
}

export interface ModifyPostEntity {
  userId: string;
  postId: number;
  content: string;
}

export interface GetPostEntity {
  postUserId?: string;
  userId?: string;
  postId: number;
}

export interface GetPostDetailEntity {
  userId?: string;
  postUserId: string;
  postId: number;
}

export interface GetAllPostEntity {
  postLastId: number;
}

export interface GetUserPostsEntity {
  userId: string;
  postLastId: number;
}

export interface DeletePostEntity {
  userId: string;
  postId: number;
}
