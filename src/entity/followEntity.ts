export interface FollowingEntity {
  userId: string;
  followingId: string;
}

export interface StopFollowingEntity {
  userId: string;
  followingId: string;
}

export interface GetFollowingsEntity {
  userId: string;
}

export interface GetFollowersEntity {
  userId: string;
}
