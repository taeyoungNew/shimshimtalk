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
