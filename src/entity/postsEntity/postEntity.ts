export interface CreatePostEntity {
  userId: string;
  title: string;
  content: string;
}

export interface ModifyPostEntity {
  userId: string;
  postId: string;
  title: string;
  content: string;
}

export interface GetUserPostsEntity {
  userId: string;
}

export interface GetPostEntity {
  postId: string;
}

export interface DeletePostEntity {
  userId: string;
  postId: string;
}
