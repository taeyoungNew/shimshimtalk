export interface BlockUserEntity {
  blockerId: string;
  blockedId: string;
}

export interface UnBlockUserEntity {
  blockerId: string;
  blockedId: string;
}

export interface BlockUserListEntity {
  userId: string;
}
