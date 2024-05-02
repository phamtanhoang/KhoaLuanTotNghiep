package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.request.*;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.LoginResponse;
import com.pth.taskbackend.dto.response.TokenResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.security.UserInfoDetails;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.util.func.CheckPermission;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpRequest;
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

import java.net.http.HttpResponse;
import java.util.*;

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


    @Autowired CheckPermission checkPermission;
    @Autowired CandidateService candidateService;
    @Autowired
    JwtService jwtService;
    final Set<String> issuedRefreshTokens = Collections.synchronizedSet(new HashSet<>());
    @Autowired
    HumanResourceService humanResourceService;

    @Operation(summary = "Login/Signin", description = "", tags = {})
    @PostMapping("login")
    public ResponseEntity<BaseResponse> login(@RequestBody AuthenticationRequest authenticationRequest) {

        try {

        Optional<User> user = userRepository.findByEmail(authenticationRequest.username());

        if (user.isEmpty()) {
            return ResponseEntity.ok(
                    new BaseResponse("Email không tồn tại!", HttpStatus.NOT_FOUND.value(), null)
            );
        }
        if (!passwordEncoder.matches(authenticationRequest.password(),user.get().getPassword())) {
            return ResponseEntity.ok(
                    new BaseResponse("Mật khẩu không chính xác!", HttpStatus.FORBIDDEN.value(), null)
            );
        }


        if(authenticationRequest.role().equals(ERole.ADMIN) && !user.get().getRole().equals(ERole.ADMIN))
            return ResponseEntity.ok(
                    new BaseResponse("Vui lòng đăng nhập với tài khoản quản trị viên!", HttpStatus.FORBIDDEN.value(), null)
            );
        if(authenticationRequest.role().equals(ERole.CANDIDATE) && !user.get().getRole().equals(ERole.CANDIDATE))
            return ResponseEntity.ok(
                    new BaseResponse("Vui lòng đăng nhập với tài khoản ứng viên!", HttpStatus.FORBIDDEN.value(), null)
            );
        if(authenticationRequest.role().equals(ERole.EMPLOYER) && !user.get().getRole().equals(ERole.EMPLOYER)&& !user.get().getRole().equals(ERole.HR)) {
            return ResponseEntity.ok(
                    new BaseResponse("Vui lòng đăng nhập với tài khoản nhà tuyển dụng!", HttpStatus.FORBIDDEN.value(), null)

            );

        }
        if(user.get().getRole().equals(ERole.HR))
        {
            Optional<HumanResource>optionalHumanResource = humanResourceService.findByEmail(user.get().getEmail());
             if(optionalHumanResource.isPresent()&& !optionalHumanResource.get().getEmployer().getUser().getStatus().equals(EStatus.ACTIVE)){
                return ResponseEntity.ok(
                        new BaseResponse("Tài khoản chủ không hoạt động!", HttpStatus.FORBIDDEN.value(), null)
                );
            }
        }
        if(!authenticationRequest.role().equals(ERole.ADMIN)) {
            if (user.get().getStatus().equals(EStatus.DELETED)) {
                return ResponseEntity.ok(
                        new BaseResponse("Tài khoản không tồn tại!", HttpStatus.FORBIDDEN.value(), null)
                );
            }
            if (user.get().getStatus().equals(EStatus.INACTIVE)) {
                return ResponseEntity.ok(
                        new BaseResponse("Tài khoản của bạn đã bị khóa!", HttpStatus.FORBIDDEN.value(), null)
                );
            }
            if (user.get().getStatus().equals(EStatus.PENDING)) {
                return ResponseEntity.ok(new BaseResponse("Tài khoản của bạn chưa được duyệt!", HttpStatus.FORBIDDEN.value(), null)
                );
            }
        }


        String token = jwtService.generateToken(authenticationRequest.username(), EStatus.ACTIVE,user.get().getRole());
        String refreshToken = jwtService.generateToken(authenticationRequest.username());

        Map<String,Object>response= new HashMap<>();
        Map<String, String>tokens= new HashMap<>();
        User u = user.get();
        LoginResponse loginResponse = new LoginResponse(u.getId(),u.getCreated(),u.getUpdated(),u.getEmail(),u.getRole(),u.getStatus());
        response.put("user",loginResponse);

        tokens.put("accessToken",token);
        tokens.put("refreshToken",refreshToken);
        response.put("tokens",tokens);



        return ResponseEntity.ok(
                new BaseResponse("Đăng nhập thành công", HttpStatus.OK.value(), response)
        );


        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Đăng nhập không thành công!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

        @Operation(summary = "RefreshToken", description = "", tags = {})
        @PostMapping("refresh")
        public ResponseEntity<BaseResponse> refreshToken(@RequestBody RefreshTokenRequest refreshToken) {

            try {

                String email = jwtService.extractUsername(refreshToken.refreshToken());
                Optional<User> optionalUser = userRepository.findByEmail(email);
                if (optionalUser.isPresent()) {
                   String accessToken= jwtService.refreshToken(refreshToken.refreshToken(), optionalUser.get().getStatus(), optionalUser.get().getRole());
                    Map<String, String>tokens= new HashMap<>();
                    tokens.put("accessToken",accessToken);
                    tokens.put("refreshToken",refreshToken.refreshToken());
                    return ResponseEntity.ok(
                            new BaseResponse("Tạo mới token thành công", HttpStatus.OK.value(), tokens)
                    );
                }

                return ResponseEntity.ok(
                        new BaseResponse("Phiên bản đăng nhập hiện tại đã hết hạn. Vui lòng đăng nhập lại!", HttpStatus.UNAUTHORIZED.value(), null)
                );


            }catch (ExpiredJwtException e) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
                }
            catch (BadCredentialsException e) {
                return ResponseEntity.ok(
                        new BaseResponse("Không hợp lệ", HttpStatus.UNAUTHORIZED.value(), null)
                );
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
            candidate.setFirstName(request.firstName());
            candidate.setLastName(request.lastName());
            candidate.setSex(request.sex());
            candidate.setDateOfBirth(request.dateOfBirth());
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
    @PatchMapping("changePassword")
    public ResponseEntity<BaseResponse> changePassword(@RequestHeader("Authorization")String token, @RequestBody ChangePasswordRequest changePasswordRequest, HttpServletRequest request, HttpServletResponse response) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
             Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            User user = optionalUser.get();

                if(user.getStatus()==EStatus.DELETED||user.getStatus()==EStatus.INACTIVE)
                    return ResponseEntity.ok(
                            new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                    );


                if (!passwordEncoder.matches(changePasswordRequest.currentPassword(), user.getPassword()))
                    return ResponseEntity.ok(
                            new BaseResponse("Mật khẩu hiện tại không đúng", HttpStatus.BAD_REQUEST.value(), null)
                    );

            if (changePasswordRequest.currentPassword().equals(changePasswordRequest.newPassword()) )
                return ResponseEntity.ok(
                        new BaseResponse("Mật khẩu không được trùng với mật khẩu hiện tại", HttpStatus.BAD_REQUEST.value(), null)
                );

            authService.changePassword(optionalUser, changePasswordRequest.newPassword());
            logout(request, response);
            return ResponseEntity.ok(
                    new BaseResponse("Thay đổi mật khẩu thành công", HttpStatus.OK.value(), null)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
}
