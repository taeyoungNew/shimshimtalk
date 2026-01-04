export interface GetMessagesByRoomEntity {
  chatRoomId: string;
}

export interface SaveMessageByRoomEntity {
  chatRoomId: string;
  senderId: string;
  content: string;
  contentType: "TEXT" | "FILE" | "SYSTEM" | "IMAGE";
}
