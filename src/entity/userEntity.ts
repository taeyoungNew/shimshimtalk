export interface SignupUserEntity {
  email: string;
  password: string;
}
export interface SignupUserInfosEntity {
  userId: string;
  username: string;
  nickname: string;
  aboutMe: string;
  age: number;
}

export interface ModifyUserEntity {
  userId: string;
  username: string;
  aboutMe: string;
  age: number;
}

export interface GetBlockedUsersEntity {
  blockedUserIds: string[];
}
