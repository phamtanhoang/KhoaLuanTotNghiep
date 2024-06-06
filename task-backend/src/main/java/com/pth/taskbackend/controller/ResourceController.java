package com.pth.taskbackend.controller;

import com.pth.taskbackend.controller.test.Message;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.service.MailService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Resource", description = "Test APIs")
@SecurityRequirement(name = "javainuseapi")
@RequestMapping(value = {BASE_URL + "/resource"})
@RestController
public class ResourceController {

    @Autowired
    private MailService mailService;

    @GetMapping("send-mail")
    public ResponseEntity<BaseResponse> SendMail() {
        try {
            mailService.sendEmail("2051052048hoang@ou.edu.vn", "Hoàng",
                    "Ban đã đăng kí tài khoản thành công!!","EMAIL_TEMPLATE");
            return ResponseEntity.ok(new BaseResponse("Gửi mail thành công", 200, null));
        }
        catch(MessagingException e){
            return ResponseEntity.ok(new BaseResponse("Tên mail không hợp lệ!", 500, null));
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(new BaseResponse("Có lỗi xảy ra trong quá trình gửi mail!", 500, null));
        }
    }


    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessage(@Payload Message chatMessage) {
        chatMessage.setTimestamp(new Date());
        return chatMessage;
    }
}
