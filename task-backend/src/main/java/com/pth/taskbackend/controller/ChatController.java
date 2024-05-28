package com.pth.taskbackend.controller;


import com.pth.taskbackend.dto.request.MessageRequest;
import com.pth.taskbackend.dto.response.BaseResponse;

import com.pth.taskbackend.dto.response.JobResponse;
import com.pth.taskbackend.dto.response.MessageResponse;
import com.pth.taskbackend.enums.EApplyStatus;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.FileUploadFunc;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


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
    private final UserRepository userRepository;
    @Autowired
    ApplicationService applicationService;
    @Autowired
    ChatService chatService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    CandidateService candidateService;

    @Autowired
    EmployerService employerService;
    @Autowired
    HumanResourceService humanResourceService;
    FileUploadFunc fileUploadFunc = new FileUploadFunc();
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/{applicationId}")
    public ResponseEntity<BaseResponse> getChatMessages(@RequestHeader("Authorization")String token, @PathVariable String applicationId, Pageable pageable) throws IOException {
        try {
            String username = jwtService.extractUsername(token.substring(7));
            Optional<User> userOptional = userRepository.findByEmail(username);
            if (userOptional.isEmpty())  {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<Application> applicationOptional  =applicationService.findById(applicationId);
            if (applicationOptional.isEmpty())  {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Application application = applicationOptional.get();
            if(Objects.equals(user.getId(), application.getCandidate().getUser().getId())
                    || Objects.equals(user.getId(), application.getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), application.getJob().getHumanResource().getEmployer().getUser().getId())){
                if(application.getStatus()!= EApplyStatus.DELETED) {

                    Page<Message> messages = chatService.findByApplication(applicationId, pageable);
                    List<MessageResponse> messagesResponses = messages.getContent().stream().map(message -> {

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

                        return new MessageResponse(
                                message.getId(),
                                message.getCreated(),
                                message.getContent(),
                                message.getFile(),
                                message.getUser().getId(),
                                userName,
                                avatar
                        );
                    }).collect(Collectors.toList());
                    return ResponseEntity.ok(
                            new BaseResponse("Danh sách tin nhắn", HttpStatus.OK.value(), messagesResponses)
                    );
                }else{
                    return ResponseEntity.ok(
                            new BaseResponse("Đơn ứng tuyển chưa được duyệt!", HttpStatus.BAD_REQUEST.value(), null)
                    );
                }
            }
            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @PostMapping("/{applicationId}/sendMessage")
    public ResponseEntity<BaseResponse> sendMessage(@RequestHeader("Authorization")String token,
                                                    @PathVariable String applicationId,
                                                    @RequestParam(required = false) MultipartFile file,
                                                    @RequestParam(required = false) String content) throws IOException {
        try {
            String username = jwtService.extractUsername(token.substring(7));
            Optional<User> userOptional = userRepository.findByEmail(username);
            if (userOptional.isEmpty())  {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            User user = userOptional.get();

            Optional<Application> applicationOptional  =applicationService.findById(applicationId);
            if (applicationOptional.isEmpty())  {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy đơn tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Application application = applicationOptional.get();
            if(Objects.equals(user.getId(), application.getCandidate().getUser().getId())
                    || Objects.equals(user.getId(), application.getJob().getHumanResource().getUser().getId())
                    || Objects.equals(user.getId(), application.getJob().getHumanResource().getEmployer().getUser().getId())){
                if(application.getStatus()!= EApplyStatus.DELETED) {

                    if ((content == null || content.isBlank()) && (file == null || file.isEmpty())) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                new BaseResponse("Vui lòng nhập nội dung!", HttpStatus.BAD_REQUEST.value(), null)
                        );
                    }

                    String path = "";
                    if (file != null && !file.isEmpty()) {
                        path = fileUploadFunc.getFullImagePath(fileUploadFunc.uploadImage(file));
                    }

                    Message message = chatService.sendMessage(content,path,application, user);
                    messagingTemplate.convertAndSend("/application/" + applicationId, message);
                    return ResponseEntity.ok(
                            new BaseResponse("Gửi tin nhắn thành công", HttpStatus.OK.value(), message)
                    );
                }else{
                    return ResponseEntity.ok(
                            new BaseResponse("Đơn ứng tuyển chưa được duyệt!", HttpStatus.BAD_REQUEST.value(), null)
                    );
                }
            }


            return ResponseEntity.ok(
                    new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


}
