export interface FollowingDto {
  isMyPage: boolean;
  userId: string;
  followingId: string;
}

export interface StopFollowingDto {
  isMyPage: boolean;
  userId: string;
  followingId: string;
}

export interface GetFollowingsDto {
  userId: string;
}

export interface GetFollowersDto {
  userId: string;
}
