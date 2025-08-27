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
