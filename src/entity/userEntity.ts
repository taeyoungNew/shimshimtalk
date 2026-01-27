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

export interface ChangeMyProfileImgEntity {
  userId: string;
  profileUrl: string;
  timestamp: number;
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

export interface GetFindUserInfosEntity {
  myId?: string;
  userId: string;
}
