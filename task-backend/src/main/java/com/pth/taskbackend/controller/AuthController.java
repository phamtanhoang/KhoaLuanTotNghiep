package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.request.*;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.TokenResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.security.UserInfoDetails;
import com.pth.taskbackend.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.service.EmployerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;
import static com.pth.taskbackend.util.constant.TokenConstant.*;

@CrossOrigin(origins = "*")
@Tag(name = "Auths", description = "Auth APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/auths"})
public class AuthController {
    private  final AuthService authService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmployerService employerService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired CandidateService candidateService;
    @Autowired
    JwtService jwtService;
    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());


    @Operation(summary = "Login/Signin", description = "", tags = {})
    @PostMapping("login")
    public ResponseEntity<BaseResponse> login(@RequestBody AuthenticationRequest authenticationRequest,
                              HttpServletRequest request,
                              HttpServletResponse response) {

        try {

        Optional<User> user = userRepository.findByEmail(authenticationRequest.username());

        if (user.isEmpty()) {
            return ResponseEntity.ok(
                    new BaseResponse("Email không tồn tại!", HttpStatus.NOT_FOUND.value(), null)
            );
        }

        User checkUser = user.get();
        EStatus userStatus = checkUser.getStatus();
        ERole userRole = checkUser.getRole();

        if (!userRole.equals(ERole.ADMIN)) {
            if (!userStatus.equals(EStatus.ACTIVE)) {
                if (userStatus.equals(EStatus.PENDING)) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new BaseResponse("Tài khoản chưa được duyệt!", HttpStatus.FORBIDDEN.value(), null));
                } else if (userStatus.equals(EStatus.INACTIVE)) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new BaseResponse("Tài khoản đã bị khóa!", HttpStatus.FORBIDDEN.value(), null));
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new BaseResponse("Tài khoản không tồn tại!", HttpStatus.FORBIDDEN.value(), null));
                }
            }
        }

        String token = jwtService.generateToken(authenticationRequest.username(), EStatus.ACTIVE);
        return ResponseEntity.ok(
                new BaseResponse("Đăng nhập thành công", HttpStatus.UNAUTHORIZED.value(), token)
        );




        } catch (BadCredentialsException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Mật khẩu không chính xác!", HttpStatus.UNAUTHORIZED.value(), null)
            );
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Register/Signup", description = "", tags = {})
    @PostMapping("/registerEmployer")
    public ResponseEntity<BaseResponse> registerEmployer(@RequestBody CreateEmployerRequest registrationRequest) {
        if (userRepository.findByEmail(registrationRequest.username()).isPresent()) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
            );
        };

        try{
            Optional<User> user = authService.register(
                    registrationRequest.username(),
                    registrationRequest.password(),
                    ERole.EMPLOYER);

            Employer employer = new Employer();
            employer.setName(registrationRequest.name());
            employer.setLocation(registrationRequest.location());
            employer.setDescription(registrationRequest.description());
            employer.setBusinessCode(registrationRequest.businessCode());
            employer.setPhoneNumber(registrationRequest.phoneNumber());
            employer.setUser(user.get());
            employerService.create(employer,null,null);


            return ResponseEntity.ok(
                    new BaseResponse("Đăng ký thành công", HttpStatus.OK.value(), user)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Register/Signup", description = "", tags = {})
    @PostMapping("/registerCandidate")
    public ResponseEntity<BaseResponse> registerCandidate(@RequestBody CreateCandidateRequest request) {
        if (userRepository.findByEmail(request.username()).isPresent()) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
            );
        };

        try{
            Optional<User> user = authService.register(
                    request.username(),
                    request.password(),
                    ERole.CANDIDATE);

            Candidate candidate = new Candidate();
            candidate.setFirstName(request.firstname());
            candidate.setLastName(request.lastName());
            candidate.setSex(request.sex());
            candidate.setPhoneNumber(request.phoneNumber());
            candidate.setUser(user.get());
            candidateService.create(candidate,null);


            return ResponseEntity.ok(
                    new BaseResponse("Đăng ký thành công", HttpStatus.OK.value(), user)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Register/Signup", description = "", tags = {})
    @PostMapping("register")
    public ResponseEntity<BaseResponse> registerEmployer(@RequestBody RegistrationRequest registrationRequest) {
        if (userRepository.findByEmail(registrationRequest.username()).isPresent()) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
            );
        };
        if(registrationRequest.role() == ERole.ADMIN){
            return ResponseEntity.ok(
                    new BaseResponse("Không thể đăng ký với tài khoản ADMIN!", 400, null)
            );
        };

        try{
            Optional<User> user = authService.register(
                    registrationRequest.username(),
                    registrationRequest.password(),
                    registrationRequest.role()
            );

            return ResponseEntity.ok(
                    new BaseResponse("Đăng ký thành công", HttpStatus.OK.value(), user)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

//    @Operation(summary = "Refresh Token", description = "", tags = {})
//    @GetMapping("refresh")
//    public ResponseEntity<BaseResponse> refresh(@CookieValue(value = APP_REFRESH_TOKEN) String refreshToken,
//                                                HttpServletRequest request,
//                                                HttpServletResponse response) {
//        try {
//            if (refreshToken != null && issuedRefreshTokens.contains(refreshToken) && jwtService.validateToken(refreshToken)) {
//                String accessToken = authService.refresh(refreshToken, request, response);
//                TokenResponse tokenResponse = new TokenResponse(accessToken, refreshToken);
//
//                return ResponseEntity.ok(
//                        new BaseResponse("Refresh Token thành công", HttpStatus.OK.value(), tokenResponse)
//                );
//            } else {
//                return ResponseEntity.ok(
//                        new BaseResponse("Phiên bản đăng nhập đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null)
//                );
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }

    @Operation(summary = "Logout/Signout", description = "", tags = {})
    @GetMapping("logout")
    public ResponseEntity<BaseResponse> logout(HttpServletRequest request,
                                        HttpServletResponse response) {

        try{
            authService.logout(request, response);
            return ResponseEntity.ok(
                new BaseResponse("Đăng xuất thành công", HttpStatus.OK.value(), "")
            );
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Change Password", description = "", tags = {})
    @PostMapping("change-password")
    public ResponseEntity<BaseResponse> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest,
                                                       HttpServletRequest request,
                                                       HttpServletResponse response) {
        try {
            Optional<User> user = userRepository.findById(changePasswordRequest.id());
            if (user.isPresent()) {

                if (passwordEncoder.matches(changePasswordRequest.currentPassword(), user.get().getPassword())) {
                    authService.changePassword(user, changePasswordRequest.newPassword());
                    logout(request, response);

                    return ResponseEntity.ok(
                            new BaseResponse("Thay đổi mật khẩu thành công", HttpStatus.OK.value(), null)
                    );
                } else {
                    return ResponseEntity.ok(
                            new BaseResponse("Mật khẩu hiện tại không đúng!", HttpStatus.UNAUTHORIZED.value(), null)
                    );
                }
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không tồn tại!",  HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}
