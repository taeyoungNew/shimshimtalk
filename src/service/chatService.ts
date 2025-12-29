import { ChatChatRoom, CreateChatRoom } from "../dtos/chatDto";
import UserService from "./usersService";
import ChatRepository from "../repositories/chatRepository";
import logger from "../config/logger";
import { CustomError } from "../errors/customError";
import errorCodes from "../constants/error-codes.json";

class ChatService {
  private userService = new UserService();
  private chatRepository = new ChatRepository();
  public createChatRoom = async ({ userId, targetUserId }: CreateChatRoom) => {
    // 먼저 상대방이 현제 존재하는 유저인지 확인
    await this.userService.findUserById(targetUserId);

    const pairKey = [userId, targetUserId].sort().join("_");
    console.log("pairKey = ", pairKey);

    let chatRoom = await this.isChatRoom({ pairKey });

    let isNew = false;

    if (!chatRoom) {
      chatRoom = await this.chatRepository.createChatRoom({
        userId,
        targetUserId,
        pairKey,
      });
      isNew = true;
    }

    return {
      chatRoomId: chatRoom.id,
      isNew,
    };
  };

  private isChatRoom = async ({ pairKey }: ChatChatRoom) => {
    try {
      logger.info("", {
        layer: "Service",
        className: "ChatRoomService",
        functionName: "isChatRoom",
      });
      const result = await this.chatRepository.checkChatRoom({ pairKey });
      return result;
    } catch (error) {
      throw error;
    }
  };
}

export default ChatService;
