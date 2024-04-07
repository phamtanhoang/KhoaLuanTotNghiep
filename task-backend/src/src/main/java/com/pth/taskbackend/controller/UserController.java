package com.pth.taskbackend.controller;


import com.pth.taskbackend.dto.request.AuthenticationRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Users", description = "Auth APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/users"})
public class UserController {
    @Autowired
    UserRepository userRepository;
    @Operation(summary = "check exist email", description = "", tags = {})
    @GetMapping("email={email}")
    public ResponseEntity<BaseResponse> findUserByEmail(@PathVariable String email) {
        try {
            Optional<User> user = userRepository.findByEmail(email);

            if (user.isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("Email đã tồn tại", HttpStatus.OK.value(), user)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new BaseResponse("Chưa có email này", HttpStatus.NOT_FOUND.value(), null));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
