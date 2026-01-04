export interface UploadDto {
  chatRoomId: string;
  type: "TEXT" | "FILE" | "SYSTEM" | "IMAGE";
  content: string;
  senderId: string;
}
