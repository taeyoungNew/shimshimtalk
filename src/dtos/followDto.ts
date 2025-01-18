export interface FollowingDto {
  userId: string;
  followingId: string;
}

export interface StopFollowingDto {
  userId: string;
  followingId: string;
}

export interface GetFollowingsDto {
  userId: string;
}

export interface GetFollowersDto {
  userId: string;
}
