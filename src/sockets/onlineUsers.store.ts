type OnlineUserData = {
  socketIds: Set<string>; // 현재 로그인된 소켓ID들
  lastPing: number; // 마지막 하트비트 시간
};

export const onlineUsers = new Map<string, OnlineUserData>();
