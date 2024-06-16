package com.pth.taskbackend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.pth.taskbackend.dto.request.*;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.LoginResponse;
import com.pth.taskbackend.dto.response.TokenResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.security.UserInfoDetails;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.GenerateTokenVerify;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpRequest;
import org.springframework.security.authentication.AuthenticationManager;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

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

    @Autowired
    MailService mailService;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

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


        try{

            if (userRepository.findByEmail(registrationRequest.username()).isPresent()) {
                return ResponseEntity.ok(
                        new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                );
            };
            String token = GenerateTokenVerify.generateToken(5);
            mailService.sendEmail(registrationRequest.username(), registrationRequest.username(),
                    "Mã xác minh tài khoản của bạn là: "+token + ". Vui lòng không chia sẽ mã này cho bất kì ai.","EMAIL_TEMPLATE");

            CreateEmployerRequest createEmployerRequest = new CreateEmployerRequest(
                    registrationRequest.username(),
                    passwordEncoder.encode(registrationRequest.password()),
                    registrationRequest.name(),
                    registrationRequest.location(),
                    registrationRequest.description(),
                    registrationRequest.phoneNumber(),
                    registrationRequest.businessCode(),
                    token
            );
            long timeout = 15;
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            String requestJson = objectMapper.writeValueAsString(createEmployerRequest);
            redisTemplate.opsForValue().set(registrationRequest.username(), requestJson, timeout, TimeUnit.MINUTES);
            return ResponseEntity.ok(
                    new BaseResponse("Vui lòng kiểm tra email để xác minh!", HttpStatus.OK.value(),null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Register/Signup", description = "", tags = {})
    @PostMapping("/registerCandidate")
    public ResponseEntity<BaseResponse> registerCandidate(@RequestBody CreateCandidateRequest request) {

         try{
             if (userRepository.findByEmail(request.username()).isPresent()) {
                 return ResponseEntity.ok(
                         new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                 );
             };
             String token = GenerateTokenVerify.generateToken(5);
             mailService.sendEmail(request.username(), request.username(),
                     "Mã xác minh tài khoản của bạn là: "+token + ". Vui lòng không chia sẽ mã này cho bất kì ai.","EMAIL_TEMPLATE");

             CreateCandidateRequest updatedRequest = new CreateCandidateRequest(
                     request.username(),
                     passwordEncoder.encode(request.password()),
                     request.dateOfBirth(),
                     request.firstName(),
                     request.lastName(),
                     request.sex(),
                     token
             );
             long timeout = 15;
             ObjectMapper objectMapper = new ObjectMapper();
             objectMapper.registerModule(new JavaTimeModule());
             String requestJson = objectMapper.writeValueAsString(updatedRequest);
             redisTemplate.opsForValue().set(request.username(), requestJson, timeout, TimeUnit.MINUTES);

             return ResponseEntity.ok(
                     new BaseResponse("Vui lòng kiểm tra email để xác minh!", HttpStatus.OK.value(),null)
             );
         } catch (Exception e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                     .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
         }
    }

    @Operation(summary = "verify Candidate", description = "", tags = {})
    @PostMapping("/verifyCandidate")
    public ResponseEntity<BaseResponse> verifyCandidate(@RequestBody VerifyEmail request) {

        try{
            String storedToken = redisTemplate.opsForValue().get(request.email());
            System.out.println("storedToken, "+ storedToken);

            if (storedToken != null ) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode dateOfBirthNode = objectMapper.readTree(storedToken).get("dateOfBirth");
                LocalDateTime dateOfBirth = LocalDateTime.of(dateOfBirthNode.get(0).asInt(), dateOfBirthNode.get(1).asInt(), dateOfBirthNode.get(2).asInt(), 0, 0);
                ESex sex = ESex.valueOf(objectMapper.readTree(storedToken).get("sex").asText().toUpperCase());
                CreateCandidateRequest createCandidateRequest = new CreateCandidateRequest(
                        objectMapper.readTree(storedToken).get("username").asText(),
                        objectMapper.readTree(storedToken).get("password").asText(),
                        dateOfBirth,
                        objectMapper.readTree(storedToken).get("firstName").asText(),
                        objectMapper.readTree(storedToken).get("lastName").asText(),
                        sex,
                        objectMapper.readTree(storedToken).get("token").asText()
                );

                if(createCandidateRequest.token().equals(request.token())){
                    redisTemplate.delete(request.email());
                    if (userRepository.findByEmail(createCandidateRequest.username()).isPresent()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                        );
                    };


                     Optional<User> user = authService.register(
                             createCandidateRequest.username(),
                             createCandidateRequest.password(),
                             ERole.CANDIDATE);
                     Candidate candidate = new Candidate();
                     candidate.setFirstName(createCandidateRequest.firstName());
                     candidate.setLastName(createCandidateRequest.lastName());
                     candidate.setSex(createCandidateRequest.sex());
                     candidate.setDateOfBirth(createCandidateRequest.dateOfBirth());
                     candidate.setIsFindJob(false);
                     candidate.setUser(user.get());
                     candidateService.create(candidate,null);
                    return ResponseEntity.ok(new BaseResponse("Tạo tài khoản thành công.",HttpStatus.OK.value(), null));
                }
                return ResponseEntity.ok(
                        new BaseResponse("Mã xác minh không khớp!", HttpStatus.FORBIDDEN.value(),null)
                );

            }

            return ResponseEntity.ok(
                    new BaseResponse("Mã xác minh không tồn tại hoặc đã hết hạn!", HttpStatus.NOT_FOUND.value(),null)
            );


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "verify Employer", description = "", tags = {})
    @PostMapping("/verifyEmployer")
    public ResponseEntity<BaseResponse> verifyEmployer(@RequestBody VerifyEmail request) {

        try{
            String storedToken = redisTemplate.opsForValue().get(request.email());
            System.out.println("storedToken, "+ storedToken);

            if (storedToken != null ) {
                ObjectMapper objectMapper = new ObjectMapper();
                CreateEmployerRequest createEmployerRequest = new CreateEmployerRequest(
                        objectMapper.readTree(storedToken).get("username").asText(),
                        objectMapper.readTree(storedToken).get("password").asText(),
                        objectMapper.readTree(storedToken).get("name").asText(),
                        objectMapper.readTree(storedToken).get("location").asText(),
                        objectMapper.readTree(storedToken).get("description").asText(),
                        objectMapper.readTree(storedToken).get("phoneNumber").asText(),
                        objectMapper.readTree(storedToken).get("businessCode").asText(),
                        objectMapper.readTree(storedToken).get("token").asText()
                );

                if(createEmployerRequest.token().equals(request.token())){
                    redisTemplate.delete(request.email());
                    if (userRepository.findByEmail(createEmployerRequest.username()).isPresent()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                        );
                    };

                     Optional<User> user = authService.register(
                             createEmployerRequest.username(),
                             createEmployerRequest.password(),
                             ERole.EMPLOYER);
                     Employer employer = new Employer();
                    employer.setName(createEmployerRequest.name());
                    employer.setDescription(createEmployerRequest.description());
                    employer.setLocation(createEmployerRequest.location());
                    employer.setPhoneNumber(createEmployerRequest.phoneNumber());
                    employer.setBusinessCode(createEmployerRequest.businessCode());
                    employer.setUser(user.get());
                     employerService.create(employer,null,null);
                     return ResponseEntity.ok(new BaseResponse("Tạo tài khoản thành công.",HttpStatus.OK.value(), null));
                }
                return ResponseEntity.ok(
                        new BaseResponse("Mã xác minh không khớp!", HttpStatus.FORBIDDEN.value(),null)
                );

            }

            return ResponseEntity.ok(
                    new BaseResponse("Mã xác minh không tồn tại hoặc đã hết hạn!", HttpStatus.NOT_FOUND.value(),null)
            );


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "forgot Password", description = "", tags = {})
    @PostMapping("/forgotPassword")
    public ResponseEntity<BaseResponse> forgotPassword(@RequestBody VerifyEmail request) {

        try{
            String storedToken = redisTemplate.opsForValue().get(request.email());
            System.out.println("storedToken, "+ storedToken);

            if (storedToken != null ) {
                ObjectMapper objectMapper = new ObjectMapper();
                CreateEmployerRequest createEmployerRequest = new CreateEmployerRequest(
                        objectMapper.readTree(storedToken).get("username").asText(),
                        objectMapper.readTree(storedToken).get("password").asText(),
                        objectMapper.readTree(storedToken).get("name").asText(),
                        objectMapper.readTree(storedToken).get("location").asText(),
                        objectMapper.readTree(storedToken).get("description").asText(),
                        objectMapper.readTree(storedToken).get("phoneNumber").asText(),
                        objectMapper.readTree(storedToken).get("businessCode").asText(),
                        objectMapper.readTree(storedToken).get("token").asText()
                );

                if(createEmployerRequest.token().equals(request.token())){
                    redisTemplate.delete(request.email());
                    if (userRepository.findByEmail(createEmployerRequest.username()).isPresent()) {
                        return ResponseEntity.ok(
                                new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                        );
                    };

                    Optional<User> user = authService.register(
                            createEmployerRequest.username(),
                            createEmployerRequest.password(),
                            ERole.EMPLOYER);
                    Employer employer = new Employer();
                    employer.setName(createEmployerRequest.name());
                    employer.setDescription(createEmployerRequest.description());
                    employer.setLocation(createEmployerRequest.location());
                    employer.setPhoneNumber(createEmployerRequest.phoneNumber());
                    employer.setBusinessCode(createEmployerRequest.businessCode());
                    employer.setUser(user.get());
                    employerService.create(employer,null,null);
                    return ResponseEntity.ok(new BaseResponse("Tạo tài khoản thành công.",HttpStatus.OK.value(), null));
                }
                return ResponseEntity.ok(
                        new BaseResponse("Mã xác minh không khớp!", HttpStatus.FORBIDDEN.value(),null)
                );

            }

            return ResponseEntity.ok(
                    new BaseResponse("Mã xác minh không tồn tại hoặc đã hết hạn!", HttpStatus.NOT_FOUND.value(),null)
            );


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

//    @Operation(summary = "Register/Signup", description = "", tags = {})
//    @PostMapping("register")
//    public ResponseEntity<BaseResponse> registerEmployer(@RequestBody RegistrationRequest registrationRequest) {
//        if (userRepository.findByEmail(registrationRequest.username()).isPresent()) {
//            return ResponseEntity.ok(
//                    new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
//            );
//        };
//        if(registrationRequest.role() == ERole.ADMIN){
//            return ResponseEntity.ok(
//                    new BaseResponse("Không thể đăng ký với tài khoản ADMIN!", 400, null)
//            );
//        };
//
//        try{
//            Optional<User> user = authService.register(
//                    registrationRequest.username(),
//                    registrationRequest.password(),
//                    registrationRequest.role()
//            );
//
//            return ResponseEntity.ok(
//                    new BaseResponse("Đăng ký thành công", HttpStatus.OK.value(), user)
//            );
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
