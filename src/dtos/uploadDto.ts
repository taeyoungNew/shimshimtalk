export interface UploadDto {
  chatRoomId: string;
  type: "TEXT" | "FILE" | "SYSTEM" | "IMAGE";
  originalName: string;
  content: string;
  senderId: string;
}
