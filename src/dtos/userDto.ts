export interface SignupDto {
  email: string;
  password: string;
  username: string;
  nickname: string;
  aboutMe: string;
  age: number;
}
export interface ModifyUserDto {
  userId: string;
  username: string;
  aboutMe: string;
  age: number;
}

export interface GetBlockedUsersDto {
  blockedUserIds: string[];
}

export interface GetFindUserInfosDto {
  myId?: string;
  userId: string;
}

export interface ChangeUserProfileImg {
  userId: string;
  profileUrl: string;
  timestamp: number;
}

export interface ChangeUserBackgroundImg {
  userId: string;
  backgroundUrl: string;
  timestamp: number;
}
