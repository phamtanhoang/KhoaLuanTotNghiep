package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.request.MessageRequest;
import com.pth.taskbackend.dto.response.MessageResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.MessageRepository;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.service.ChatService;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.service.HumanResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.Optional;

@Controller
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ChatService chatService;

    @Autowired
    CandidateService candidateService;

    @Autowired
    EmployerService employerService;
    @Autowired
    HumanResourceService humanResourceService;

    @Autowired
    MessageRepository messageRepository;

    @MessageMapping("/chat/{applicationId}")
    public void sendMessage(@DestinationVariable String applicationId, @Payload String id) throws IOException {
        com.pth.taskbackend.model.meta.Message message= messageRepository.findById(id).get();
        String userName ="";
        String avatar ="";
        if(message.getUser().getRole()== ERole.CANDIDATE) {
            try {
                Optional<Candidate> candidateOptional = candidateService.findByUserEmail(message.getUser().getEmail());
                if(candidateOptional.isPresent()){
                    userName=candidateOptional.get().getFirstName()+" "+candidateOptional.get().getLastName();
                    avatar=candidateOptional.get().getAvatar();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }else if(message.getUser().getRole() == ERole.EMPLOYER) {
            Optional<Employer> employerOptional = employerService.findByUserEmail(message.getUser().getEmail());
            if(employerOptional.isPresent()){
                userName=employerOptional.get().getName();
                avatar=employerOptional.get().getImage();
            }
        }else{
            Optional<HumanResource> humanResourceOptional = humanResourceService.findByEmail(message.getUser().getEmail());
            if(humanResourceOptional.isPresent()){
                userName=humanResourceOptional.get().getFirstName()+" "+humanResourceOptional.get().getLastName();
                avatar=humanResourceOptional.get().getAvatar();
            }
        }

        MessageResponse messageResponse = new MessageResponse(
                message.getId(),
                message.getCreated(),
                message.getContent(),
                message.getFile(),
                message.getUser().getId(),
                userName,
                avatar,
                false
        );

        // Tạo đối tượng oMessageResponse
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create();
        headerAccessor.setLeaveMutable(true);
        headerAccessor.setHeader("applicationId", applicationId);
        org.springframework.messaging.Message<MessageResponse> messageToSend = MessageBuilder.createMessage(messageResponse, headerAccessor.getMessageHeaders());

        // Gửi tin nhắn đến tất cả client đang lắng nghe tại "/topic/chat/{applicationId}"
        simpMessagingTemplate.convertAndSend("/topic/chat/" + applicationId, messageToSend);
    }
}
