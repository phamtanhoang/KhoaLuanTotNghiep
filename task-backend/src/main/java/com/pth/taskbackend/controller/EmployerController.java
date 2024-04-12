package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.CreateEmployerRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.request.UpdateEmployerRequest;
import com.pth.taskbackend.dto.response.*;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.ImageFunc;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.Optional;

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
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    private ObjectMapper objectMapper;


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
                    employer.getUser().getId()
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
    public ResponseEntity<BaseResponse> getEmployerById(@RequestHeader("Authorization")String token, @PathVariable() String id) {
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

            System.out.println(Instant.now());
            System.out.println(jwtService.extractAllClaims(token.substring(7)));
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
                    employer.getUser().getId());
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng ", HttpStatus.OK.value(), employerResponse)
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

            Page<Employer> employers = employerService.findByKeywordAndStatus(keyword,EStatus.ACTIVE,pageable);
            if (employers.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách nhà tuyển dụng", HttpStatus.OK.value(), employers)
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

//    @Operation(summary = "Create", description = "", tags = {})
//    @PostMapping
//    public ResponseEntity<BaseResponse> createEmployer(@RequestBody CreateEmployerRequest createEmployerRequest,
//                                                       @RequestParam("image") MultipartFile image,
//                                                       @RequestParam("backgroundImage") MultipartFile backgroundImage) throws IOException {
//        if (userRepository.findByEmail(createEmployerRequest.username()).isPresent()) {
//            return ResponseEntity.ok(
//                    new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
//            );
//        };
//        try {
//            if (!(ImageFunc.isImageFile(image)||ImageFunc.isImageFile(backgroundImage))) {
//                return ResponseEntity.ok(
//                        new BaseResponse("Vui lòng chọn hình ảnh!", HttpStatus.BAD_REQUEST.value(), null)
//                );
//            }
//            Optional<User> user = authService.register(
//                    createEmployerRequest.username(),
//                    createEmployerRequest.password(),
//                    ERole.EMPLOYER);
//
//            Employer employer = new Employer();
//            employer.setName(createEmployerRequest.name());
//            employer.setLocation(createEmployerRequest.location());
//            employer.setDescription(createEmployerRequest.description());
//            employer.setBusinessCode(createEmployerRequest.businessCode());
//            employer.setPhoneNumber(createEmployerRequest.phoneNumber());
//            employer.setUser(user.get());
//            employerService.create(employer,image,backgroundImage);
//
//            return ResponseEntity.ok(
//                    new BaseResponse("Tạo nhà tuyển dụng thành công", HttpStatus.OK.value(), employer)
//            );
//        } catch (DataIntegrityViolationException e) {
//            return ResponseEntity.ok(
//                    new BaseResponse("Tên nhà tuyển dụng đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }

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
            GetEmployerProfileResponse profile = new GetEmployerProfileResponse(
                    employer.getId(),
                    employer.getUser().getEmail(),
                    employer.getName(),
                    employer.getDescription(),
                    employer.getLocation(),
                    employer.getPhoneNumber(),
                    employer.getBusinessCode(),
                    employer.getImage(),
                    employer.getBackgroundImage());

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

    @Operation(summary = "Get by id", description = "", tags = {})
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
    @Operation(summary = "Get by id", description = "", tags = {})
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






}
