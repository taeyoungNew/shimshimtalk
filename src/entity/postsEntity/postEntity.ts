export interface CreatePostEntity {
  userId: string;
  title: string;
  content: string;
}

export interface ModifyPostEntity {
  userId: string;
  postId: number;
  title: string;
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
