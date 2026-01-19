import { onlineUsers } from "./onlineUsers.store";

export function isUserOnline(userId: string): boolean {
  return onlineUsers.has(userId);
}

export function getAllOnlineUserIds(): string[] {
  return Array.from(onlineUsers.keys());
}

export function getSocketIdsByUserId(userId: string): string[] {
  const user = onlineUsers.get(userId);

  if (!user) return [];
  return Array.from(user.socketIds);
}
