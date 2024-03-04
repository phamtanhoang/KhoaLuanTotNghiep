package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.service.MailService;
import com.pth.taskbackend.util.constant.TokenConstant;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Resource", description = "Test APIs")
@SecurityRequirement(name = "javainuseapi")
@RestController
@RequestMapping(value = {BASE_URL + "/resource"})
public class ResourceController {

    @Autowired
    private MailService mailService;
    @GetMapping("send-mail")
    public ResponseEntity<BaseResponse> SendMail() {
        try {
            mailService.sendEmail("phamtanhoang3202@gmail.com", "",
                    "", "", "", "EMAIL_TEMPLATE");
            return ResponseEntity.ok(new BaseResponse("Gửi mail thành công", 200, null));
        }
        catch(MessagingException e){
            return ResponseEntity.ok(new BaseResponse("Tên mail không hợp lệ!", 500, null));
        }
        catch (Exception e) {
            return ResponseEntity.ok(new BaseResponse("Có lỗi xảy ra trong quá trình gửi mail!", 500, null));
        }
    }
    @Operation(summary = "Test Auth", description = "", tags = {})
    @GetMapping
    public String welcome(@CookieValue(name = TokenConstant.APP_ACCESS_TOKEN, required = false) String yourCookieValue) {

        return "Hello World %s" +  yourCookieValue;
    }
}
