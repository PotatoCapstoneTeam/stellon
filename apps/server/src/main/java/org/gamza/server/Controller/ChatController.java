package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.ChatDto.ChatResponseDto;
import org.gamza.server.Dto.ChatDto.LobbyChatDto;
import org.gamza.server.Entity.ChatModel;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Enum.RoomType;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.RoomEnterException;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Objects;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class ChatController {
  private final SimpMessageSendingOperations operations;
  private final ChatService chatService;
  private final RoomRepository roomRepository;

  // /pub/chat 으로 전송
  @MessageMapping("/chat")
  public void send(ChatModel message) {
    GameRoom findRoom = roomRepository.findById(message.getRoomId())
      .orElseThrow(() -> new RoomEnterException(ErrorCode.BAD_REQUEST));
    if (findRoom.getRoomType() != RoomType.LOBBY_ROOM) {
      ChatResponseDto newMessage = chatService.regenerateRoomMsg(message);
      operations.convertAndSend("/sub/room/" + newMessage.getRoomId(), newMessage);
    } else {
      LobbyChatDto newMessage = chatService.regenerateLobbyMsg(message);
      operations.convertAndSend("/sub/lobby", newMessage);
    }
  }
}
