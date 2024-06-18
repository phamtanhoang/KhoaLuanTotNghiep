package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.UpdateEmployerRequest;
import com.pth.taskbackend.dto.response.*;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Employers", description = "Employer APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/employers"})
public class EmployerController {

    @Autowired
    private EmployerService employerService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    VipEmployerService vipEmployerService;

    @Autowired
    HumanResourceService humanResourceService;

    @Autowired
    CandidateService candidateService;

    @Autowired
    MailService mailService;
    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("getEmployers-admin")
    public ResponseEntity<BaseResponse> getEmployersByAdmin(@RequestHeader("Authorization") String token,@RequestParam(required = false)String keyword,@RequestParam(required = false)EStatus status, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );

            Page<Employer> employers = employerService.findByKeywordAndStatus(keyword,status,pageable);

            Page<EmployerResponse> responseList = employers.map(employer -> new EmployerResponse(
                    employer.getId(),
                    employer.getCreated(),
                    employer.getUpdated(),
                    employer.getImage(),
                    employer.getBackgroundImage(),
                    employer.getName(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getDescription(),
                    employer.getUser().getEmail(),
                    employer.getUser().getStatus(),
                    employer.getUser().getId(),
                    vipEmployerService.isVip(employer.getId())

            ));
            if (employers.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng ", HttpStatus.OK.value(), responseList)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("getVipEmployers")
    public ResponseEntity<BaseResponse> getVipEmployers( Pageable pageable) {
        try {


            Page<Employer> employers = employerService.findVipEmployers(pageable);

            Page<EmployerResponse> responseList = employers.map(employer -> new EmployerResponse(
                    employer.getId(),
                    employer.getCreated(),
                    employer.getUpdated(),
                    employer.getImage(),
                    employer.getBackgroundImage(),
                    employer.getName(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getDescription(),
                    employer.getUser().getEmail(),
                    employer.getUser().getStatus(),
                    employer.getUser().getId(),
                    vipEmployerService.isVip(employer.getId())
            ));
            if (employers.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng ", HttpStatus.OK.value(), responseList)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping ("/{id}")
    public ResponseEntity<BaseResponse> updateEmployer(@RequestHeader("Authorization")String token, @PathVariable("id") String id,@RequestBody String status) {
        try {
            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {});

            String statusValue = jsonMap.get("status");
            EStatus statusEnum = EStatus.fromString(statusValue);

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<User> optionalEmployer = userRepository.findByEmployerId(id);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                );
            if(statusEnum.equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            User employer = optionalEmployer.get();
            switch (statusEnum)
            {
                case ACTIVE :
                    if(employer.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã duyệt nhà tuyển dụng này rồi", HttpStatus.OK.value(), null)
                        );
                    employer.setStatus(EStatus.ACTIVE);
                    userRepository.save(employer);
                    CompletableFuture.runAsync(() -> {
                        try {
                            mailService.sendEmail(employer.getEmail(), employer.getEmail(), "Tài khoản của bạn đã được duyệt.",
                                    "EMAIL_TEMPLATE");
                        } catch (MessagingException e) {
                            System.out.println("Failed to send email to: " + employer.getEmail());
                        }
                    });
                    return ResponseEntity.ok(
                            new BaseResponse("Duyệt nhà tuyển dụng thành công", HttpStatus.OK.value(), null)
                    );
                case INACTIVE:
                    if(employer.getStatus().equals(EStatus.INACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã khóa nhà tuyển dụng này rồi", HttpStatus.OK.value(), null)
                        );

                    employer.setStatus(EStatus.INACTIVE);
                    userRepository.save(employer);
                    CompletableFuture.runAsync(() -> {
                        try {
                            mailService.sendEmail(employer.getEmail(), employer.getEmail(), "Tài khoản của bạn đã bị khóa.",
                                    "EMAIL_TEMPLATE");
                        } catch (MessagingException e) {
                            System.out.println("Failed to send email to: " + employer.getEmail());
                        }
                    });
                    return ResponseEntity.ok(
                            new BaseResponse("Khóa nhà tuyển dụng thành công", HttpStatus.OK.value(), null)
                    );
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Trạng thái không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteEmployer(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<User> optionalEmployer = userRepository.findByEmployerId(id);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                );

            User employer = optionalEmployer.get();
            if (employer.getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Đã xóa nhà tuyển dụng này", HttpStatus.OK.value(), null)
                );
            employer.setStatus(EStatus.DELETED);
            userRepository.save(employer);
            return ResponseEntity.ok(new BaseResponse("Xóa nhà tuyển dụng thành công", HttpStatus.OK.value(), null));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getEmployerById(@RequestHeader(value = "Authorization",required = false)String token,
                                                        @PathVariable("id") String id) {
        try {
            Optional<Candidate> optionalCandidate;

            if(token!=null) {
                String email = jwtService.extractUsername(token.substring(7));
                boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
                if (permission){
                    optionalCandidate = candidateService.findByUserEmail(email);
                    if (optionalCandidate.isEmpty())
                        return ResponseEntity.ok(
                                new BaseResponse("Không tìm thấy ứng viên ", HttpStatus.NOT_FOUND.value(), null)
                        );
                }else{
                    optionalCandidate = null;
                }
            } else {
                optionalCandidate = null;
            }

            Optional<Employer> optionalEmployer = employerService.findByIdAndStatus(id,EStatus.ACTIVE);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();
            EmployerResponseV2 employerResponse =  new EmployerResponseV2(
                    employer.getId(),
                    employer.getCreated(),
                    employer.getUpdated(),
                    employer.getImage(),
                    employer.getBackgroundImage(),
                    employer.getName(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getDescription(),
                    employer.getUser().getEmail(),
                    employer.getUser().getStatus(),
                    employer.getUser().getId(),
                    vipEmployerService.isVip(employer.getId()),
                    optionalCandidate != null && employerService.checkIsFollowEmployer(optionalCandidate.get().getId(), employer.getId())
                    );

                return ResponseEntity.ok(
                        new BaseResponse("Chi tiết nhà tuyển dụng ", HttpStatus.OK.value(), employerResponse)
                );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/getEmployer-admin/{id}")
    public ResponseEntity<BaseResponse> getEmployerByAdmin(@RequestHeader("Authorization")String token,@PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Employer> optionalEmployer = employerService.findById(id);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                );

            if (optionalEmployer.get().getUser().getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Không thể truy cập  nhà tuyển dụng đã xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            Employer employer = optionalEmployer.get();
            EmployerResponse employerResponse =  new EmployerResponse(
                    employer.getId(),
                    employer.getCreated(),
                    employer.getUpdated(),
                    employer.getImage(),
                    employer.getBackgroundImage(),
                    employer.getName(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getDescription(),
                    employer.getUser().getEmail(),
                    employer.getUser().getStatus(),
                    employer.getUser().getId(),
                    vipEmployerService.isVip(employer.getId())
            );

            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết nhà tuyển dụng ", HttpStatus.OK.value(), employerResponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("")
    public ResponseEntity<BaseResponse> getEmployer( @RequestParam(required = false)String keyword, Pageable pageable) {
        try {

            Page<Employer> employers = employerService.findByKeywordAndStatus(keyword, EStatus.ACTIVE, pageable);

            Page<EmployerResponse> employerResponses = employers.map(employer ->
                    new EmployerResponse(
                            employer.getId(),
                            employer.getCreated(),
                            employer.getUpdated(),
                            employer.getImage(),
                            employer.getBackgroundImage(),
                            employer.getName(),
                            employer.getLocation(),
                            employer.getPhoneNumber(),
                            employer.getBusinessCode(),
                            employer.getDescription(),
                            employer.getUser().getEmail(),
                            employer.getUser().getStatus(),
                            employer.getUser().getId(),
                            vipEmployerService.isVip(employer.getId())
                    )
            );
            if (employers.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng", HttpStatus.OK.value(), employerResponses)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse> getEmployerProfile(@RequestHeader("Authorization")String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Employer employer = optionalEmployer.get();
            boolean isVip = vipEmployerService.isVip(employer.getId());
            EmployerProfileResponse profile = new EmployerProfileResponse(
                    employer.getId(),
                    employer.getUser().getEmail(),
                    employer.getName(),
                    employer.getDescription(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getImage(),
                    employer.getBackgroundImage(),
                    isVip);
            return ResponseEntity.ok(
                    new BaseResponse( "Hiện thông tin nhà tuyển dụng", HttpStatus.OK.value(), profile)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile-hr")
    public ResponseEntity<BaseResponse> getEmployerProfileByHR(@RequestHeader("Authorization")String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Employer>optionalEmployer = employerService.findById(optionalHumanResource.get().getEmployer().getId());
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                );
            Employer employer = optionalEmployer.get();

            boolean isVip = vipEmployerService.isVip(employer.getId());
            EmployerProfileResponse profile = new EmployerProfileResponse(
                    employer.getId(),
                    employer.getUser().getEmail(),
                    employer.getName(),
                    employer.getDescription(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getImage(),
                    employer.getBackgroundImage(),
                    isVip);
            return ResponseEntity.ok(
                    new BaseResponse( "Hiện thông tin nhà tuyển dụng", HttpStatus.OK.value(), profile)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get by id", description = "", tags = {})
    @PatchMapping("/updateProfile")
    public ResponseEntity<BaseResponse> updateEmployerProfile(@RequestHeader("Authorization")String token,@RequestBody UpdateEmployerRequest request) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );


            Employer employer = optionalEmployer.get();
            employer.setName(request.name());
            employer.setDescription(request.description());
            employer.setLocation(request.location());
            employer.setPhoneNumber(request.phoneNumber());
            employer.setBusinessCode(request.businessCode());

            employerService.update(employer);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thông tin nhà tuyển dụng", HttpStatus.OK.value(), employer)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update image", description = "", tags = {})
    @PatchMapping("/updateImage")
    public ResponseEntity<BaseResponse> updateEmployerImage(@RequestHeader("Authorization")String token,@RequestPart MultipartFile image) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng ", HttpStatus.NOT_FOUND.value(), null)
                );
            if(image.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn ảnh đại diện", HttpStatus.BAD_REQUEST.value(), null)
                );
            Employer employer = optionalEmployer.get();
            employerService.updateImage(employer,image);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện nhà tuyển dụng thành công", HttpStatus.OK.value(), employer)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "update background image", description = "", tags = {})
    @PatchMapping("/updateBackgroundImage")
    public ResponseEntity<BaseResponse> updateEmployerBackgroundImage(@RequestHeader("Authorization")String token,@RequestPart MultipartFile backgroundImage) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng ", HttpStatus.NOT_FOUND.value(), null)
                );
            if(backgroundImage.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn ảnh đại diện", HttpStatus.BAD_REQUEST.value(), null)
                );
            Employer employer = optionalEmployer.get();
            employerService.updateBackgroundImage(employer,backgroundImage);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật ảnh đại diện nhà tuyển dụng thành công", HttpStatus.OK.value(), employer)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get top Employer", description = "", tags = {})
    @GetMapping("/topEmployer")
    public ResponseEntity<BaseResponse> getTopEmployer(Pageable pageable) {
        try {

            Page<Employer> employers = employerService.findTopEmployer(pageable);

            Page<EmployerResponse> employerResponses = employers.map(employer ->
                    new EmployerResponse(
                            employer.getId(),
                            employer.getCreated(),
                            employer.getUpdated(),
                            employer.getImage(),
                            employer.getBackgroundImage(),
                            employer.getName(),
                            employer.getLocation(),
                            employer.getPhoneNumber(),
                            employer.getBusinessCode(),
                            employer.getDescription(),
                            employer.getUser().getEmail(),
                            employer.getUser().getStatus(),
                            employer.getUser().getId(),
                            true
                    )
            );
            if (employers.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng", HttpStatus.OK.value(), employerResponses)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get top Employer", description = "", tags = {})
    @GetMapping("/getPendingEmployers_Admin")
    public ResponseEntity<BaseResponse> getPendingEmployer(@RequestHeader("Authorization")String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            if (ERole.ADMIN != optionalUser.get().getRole()){
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );
            }else{

                Page<Employer> employers = employerService.findPendingEmployer_admin(pageable);

                Page<EmployerResponse> employerResponses = employers.map(employer ->
                        new EmployerResponse(
                                employer.getId(),
                                employer.getCreated(),
                                employer.getUpdated(),
                                employer.getImage(),
                                employer.getBackgroundImage(),
                                employer.getName(),
                                employer.getLocation(),
                                employer.getPhoneNumber(),
                                employer.getBusinessCode(),
                                employer.getDescription(),
                                employer.getUser().getEmail(),
                                employer.getUser().getStatus(),
                                employer.getUser().getId(),
                                true
                        )
                );
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng", HttpStatus.OK.value(), employerResponses)
                );
            }


        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e)  {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "follow employer", description = "", tags = {})
    @PostMapping("/follow-employer/{id}")
    public ResponseEntity<BaseResponse> followEmployer(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Candidate> candidate = candidateService.findByUserEmail(optionalUser.get().getEmail());
            if(candidate.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Employer> optionalEmployer = employerService.findById(id);
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Employer employer = optionalEmployer.get();

            if(!employerService.checkIsFollowEmployer(candidate.get().getId(), employer.getId())){
                employerService.followEmployer(candidate.get().getId(), employer.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Theo dõi thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn đã theo dõi nhà tuyển dụng này trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "unfollow employer", description = "", tags = {})
    @DeleteMapping("/unfollow-employer/{id}")
    public ResponseEntity<BaseResponse> unFollowEmployer(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Candidate> candidate = candidateService.findByUserEmail(optionalUser.get().getEmail());
            if(candidate.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Employer> optionalEmployer = employerService.findById(id);
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Employer employer = optionalEmployer.get();

            if(employerService.checkIsFollowEmployer(candidate.get().getId(), employer.getId())){
                employerService.unfollowEmployer(candidate.get().getId(), employer.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Bỏ theo dõi thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Bạn chưa theo dõi nhà tuyển dụng này trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "unfollow employer V2", description = "", tags = {})
    @DeleteMapping("/unfollow-employerV2/{id}")
    public ResponseEntity<BaseResponse> unFollowEmployerV2(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Employer> optionalEmployer = employerService.findByUserEmail(optionalUser.get().getEmail());
            if (optionalEmployer.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            Optional<Candidate> candidate = candidateService.findById(id);
            if(candidate.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Employer employer = optionalEmployer.get();

            if(employerService.checkIsFollowEmployer(candidate.get().getId(), employer.getId())){
                employerService.unfollowEmployer(candidate.get().getId(), employer.getId());
                return ResponseEntity.ok(
                        new BaseResponse("Hủy người theo dõi thành công", HttpStatus.OK.value(), false)
                );
            }

            return ResponseEntity.ok(
                    new BaseResponse("Tài khoản ứng viên này chưa theo dõi bạn trước đó!", HttpStatus.BAD_REQUEST.value(), true)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "get list employer followed", description = "", tags = {})
    @GetMapping("/getEmployersFollowed")
    public ResponseEntity<BaseResponse> getEmployersFollowed(@RequestHeader("Authorization")String token, Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Candidate> candidate = candidateService.findByUserEmail(optionalUser.get().getEmail());
            if(candidate.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy ứng viên!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Page<Employer> employers = employerService.getEmployersFollowed(candidate.get().getId(), pageable);

            return ResponseEntity.ok(
                    new BaseResponse("Danh sách nhà tuyển dụng đã theo dõi", HttpStatus.OK.value(), employers)
            );

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
