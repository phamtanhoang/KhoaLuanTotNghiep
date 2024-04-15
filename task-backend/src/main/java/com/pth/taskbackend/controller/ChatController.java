package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.MessageResponse;
import com.pth.taskbackend.enums.EMessage;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.ApplicationService;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.service.MessageService;
import com.pth.taskbackend.util.func.CheckPermission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "chats", description = "Chats APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/chats"})
public class ChatController {
    @Autowired
    private final MessageService messageService;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;

    @Autowired
    CandidateService candidateService;
    @Autowired
    HumanResourceService humanResourceService;
    @GetMapping("/{applicationId}/messages")
    public ResponseEntity<BaseResponse> getChatMessages(@RequestHeader("Authorization")String token, @PathVariable String applicationId, Pageable pageable) throws IOException {

        String email = jwtService.extractUsername(token.substring(7));
        boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE)||checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
        if (!hasPermission) {
            return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
        }

        Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
        if (optionalCandidate.isEmpty()) {
            Optional<HumanResource> optionalHumanResource = humanResourceService.findById(email);
            if (optionalHumanResource.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null));
            }
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy ứng viên", HttpStatus.NOT_FOUND.value(), null));
        }


        Page<Message> messages = messageService.findByApplicationId(applicationId, pageable);
        return ResponseEntity.ok(
                new BaseResponse("Danh sách HR", HttpStatus.OK.value(), messages)
        );
    }


//    @MessageMapping("/messages/{applicationId}")
//    public void handleMessage(@Payload MessageResponse messageDTO, Principal principal) throws IOException {
//        String email = principal.getName();
//
//        if (messageDTO.type() == EMessage.CANDIDATE) {
//            Optional<Candidate> optionalCandidate = candidateService.findByUserEmail(email);
//            if (optionalCandidate.isPresent()) {
//                Optional<Application> optionalApplication = applicationService.findById(messageDTO.applicationId());
//                if (optionalApplication.isPresent()) {
//                    Message message = new Message();
//                    message.setSenderCandidate(optionalCandidate.get());
//                    message.setReceiverHR(optionalApplication.get().getJob().getHumanResource());
//                    message.setApplication(optionalApplication.get());
//                    message.setContent(messageDTO.content());
//                    messageService.create(message);
//                    messagingTemplate.convertAndSend("/topic/messages/" + messageDTO.applicationId(), message);
//                }
//            }
//        } else if (messageDTO.type() == EMessage.HR) {
//            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
//            if (optionalHumanResource.isPresent()) {
//                Optional<Application> optionalApplication = applicationService.findById(messageDTO.applicationId());
//                if (optionalApplication.isPresent()) {
//                    Message message = new Message();
//                    message.setSenderHR(optionalHumanResource.get());
//                    message.setReceiverCandidate(optionalApplication.get().getCandidate());
//                    message.setApplication(optionalApplication.get());
//                    message.setContent(messageDTO.content());
//                    messageService.create(message);
//                    messagingTemplate.convertAndSend("/topic/messages/" + messageDTO.applicationId(), message);
//                }
//            }
//        }
//    }




    // Các phương thức API khác nếu cần
}
