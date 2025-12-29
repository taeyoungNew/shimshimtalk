export interface SaveMessageEntity {
  senderId: string;
  chatRoomId: string;
  content: string;
  contentType: "TEXT" | "IMAGE" | "FILE" | "SYSTEM";
}
