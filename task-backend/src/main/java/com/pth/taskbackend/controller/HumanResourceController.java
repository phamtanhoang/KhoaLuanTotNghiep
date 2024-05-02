package com.pth.taskbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pth.taskbackend.dto.request.CreateEmployerRequest;
import com.pth.taskbackend.dto.request.CreateHumanResourceRequest;
import com.pth.taskbackend.dto.request.UpdateCandidateRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.CandidateResponse;
import com.pth.taskbackend.dto.response.GetCandidateProfileResponse;
import com.pth.taskbackend.dto.response.HumanResourceResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.AuthService;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.service.HumanResourceService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "HumanResources", description = "Human Resource APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/hr"})
public class HumanResourceController {

    @Autowired
    private HumanResourceService humanResourceService;
    @Autowired
    private AuthService authService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    EmployerService employerService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;

    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("getHumanResource-admin")
    public ResponseEntity<BaseResponse> getHumanResourceByAdmin(@RequestHeader("Authorization") String token,@RequestParam(required = false)String keyword,@RequestParam(required = false)EStatus status, Pageable pageable) {
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

            Page<HumanResource> humanResources = humanResourceService.findByKeywordAndStatus(keyword,status,pageable);
            Page<HumanResourceResponse> responseList = humanResources.map(humanResource -> new HumanResourceResponse(
                    humanResource.getId(),
                    humanResource.getCreated(),
                    humanResource.getUpdated(),
                    humanResource.getDateOfBirth(),
                    humanResource.getFirstName(),
                    humanResource.getLastName(),
                    humanResource.getPhoneNumber(),
                    humanResource.getSex(),
                    humanResource.getAvatar(),
                    humanResource.getEmployer().getName(),
                    humanResource.getEmployer().getId(),
                    humanResource.getUser().getId(),
                    humanResource.getUser().getStatus().toString(),
                    humanResource.getUser().getEmail()
            ));

            if (humanResources.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách HR rỗng", HttpStatus.NO_CONTENT.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách HR", HttpStatus.OK.value(), responseList)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }
            catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "Get list", description = "", tags = {})
    @GetMapping("getHumanResource-employer")
    public ResponseEntity<BaseResponse> getHumanResourceByEmployer(@RequestHeader("Authorization") String token,@RequestParam(required = false)String keyword,@RequestParam(required = false)EStatus status, Pageable pageable) {
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

            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );

            Page<HumanResource> humanResources = humanResourceService.findByKeywordAndStatusAndEmployerId(keyword,status,optionalEmployer.get().getId(),pageable);
            Page<HumanResourceResponse> responseList = humanResources.map(humanResource -> new HumanResourceResponse(
                    humanResource.getId(),
                    humanResource.getCreated(),
                    humanResource.getUpdated(),
                    humanResource.getDateOfBirth(),
                    humanResource.getFirstName(),
                    humanResource.getLastName(),
                    humanResource.getPhoneNumber(),
                    humanResource.getSex(),
                    humanResource.getAvatar(),
                    humanResource.getEmployer().getName(),
                    humanResource.getEmployer().getId(),
                    humanResource.getUser().getId(),
                    humanResource.getUser().getStatus().toString(),
                    humanResource.getUser().getEmail()
            ));

            if (humanResources.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách HR rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách HR", HttpStatus.OK.value(), responseList)
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
    @GetMapping("/getHumanResources_Dropdown")
    public ResponseEntity<BaseResponse> getHumanResourceDropDown(@RequestHeader("Authorization") String token) {
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

            List<HumanResource> humanResources = humanResourceService.findByEmployerId(optionalEmployer.get().getId(), null).toList();
            List<HumanResourceResponse> responseList = humanResources.stream().map(humanResource -> new HumanResourceResponse(
                    humanResource.getId(),
                    humanResource.getCreated(),
                    humanResource.getUpdated(),
                    humanResource.getDateOfBirth(),
                    humanResource.getFirstName(),
                    humanResource.getLastName(),
                    humanResource.getPhoneNumber(),
                    humanResource.getSex(),
                    humanResource.getAvatar(),
                    humanResource.getEmployer().getName(),
                    humanResource.getEmployer().getId(),
                    humanResource.getUser().getId(),
                    humanResource.getUser().getStatus().toString(),
                    humanResource.getUser().getEmail()
            )).collect(Collectors.toList());

            if (responseList.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách HR rỗng", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách HR", HttpStatus.OK.value(), responseList)
                );
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getHumanResourceByAdmin(@RequestHeader("Authorization")String token, @PathVariable() String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );



            Optional<HumanResource> optionalHumanResource = humanResourceService.findById(id);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR", HttpStatus.NOT_FOUND.value(), null)
                );
            if (optionalHumanResource.get().getUser().getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Không thể truy cập thông tin HR đã xóa", HttpStatus.FORBIDDEN.value(), null)
                );
            HumanResource hr = optionalHumanResource.get();

            HumanResourceResponse response= new HumanResourceResponse(
                    hr.getId(),
                    hr.getCreated(),
                    hr.getUpdated(),
                    hr.getDateOfBirth(),
                    hr.getFirstName(),
                    hr.getLastName(),
                    hr.getPhoneNumber(),
                    hr.getSex(),
                    hr.getAvatar(),
                    hr.getEmployer().getName(),
                    hr.getEmployer().getId(),
                    hr.getUser().getId(),
                    hr.getUser().getStatus().toString(),
                    hr.getUser().getEmail());
            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết HR", HttpStatus.OK.value(), response)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("")
    public ResponseEntity<BaseResponse> createHumanResource(@RequestHeader("Authorization")String token, @RequestParam String username,
                                                            @RequestParam String password,
                                                            @RequestParam String firstName,
                                                            @RequestParam String lastName,
                                                            @RequestParam ESex sex,
                                                            @RequestParam String phoneNumber,
                                                            @RequestParam LocalDateTime dateOfBirth, @RequestParam(required = false) MultipartFile avatar
                                                       )  {
        try {

        String email = jwtService.extractUsername(token.substring(7));
        boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
        if (!hasPermission) {
            return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
        }

        Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
        if (optionalEmployer.isEmpty()) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy nhà tuyển dụng ", HttpStatus.OK.value(), null));
        }


            if (userRepository.findByEmail(username).isPresent())
                return ResponseEntity.ok(
                        new BaseResponse("Tên người dùng đã tồn tại!", 400, null)
                );

            if( username==null||password==null)
                return ResponseEntity.ok(
                        new BaseResponse("Thiếu tên đăng nhập hoặc mật khẩu!", 400, null)
                );
            Optional<User> user = authService.register(
                    username,
                    password,
                    ERole.HR);

            HumanResource hr = new HumanResource();
            hr.setFirstName(firstName);
            hr.setLastName(lastName);
            hr.setSex(sex);
            hr.setDateOfBirth(dateOfBirth);
            hr.setPhoneNumber(phoneNumber);
            hr.setUser(user.get());
            hr.setEmployer(optionalEmployer.get());
            humanResourceService.create(hr,avatar);

            return ResponseEntity.ok(
                    new BaseResponse("Tạo nhà tuyển dụng thành công", HttpStatus.OK.value(), hr)
            );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên nhà tuyển dụng đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "update status", description = "", tags = {})
    @PatchMapping("/updateStatus/{id}")
    public ResponseEntity<BaseResponse> updateHR(@RequestHeader("Authorization")String token, @PathVariable("id") String id,@RequestBody String status) {
        try {

            Map<String, String> jsonMap = objectMapper.readValue(status, new TypeReference<Map<String, String>>() {});

            String statusValue = jsonMap.get("status");
            EStatus statusEnum = EStatus.fromString(statusValue);
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<User> optionalHR = userRepository.findByHumanResourceId(id);
            if (optionalHR.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR tương ứng", HttpStatus.NOT_FOUND.value(), null)
                );
            if(statusEnum==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được xóa", HttpStatus.NOT_FOUND.value(), null)
                );
            User hr = optionalHR.get();
            switch (statusEnum)
            {
                case ACTIVE :
                    if(hr.getStatus().equals(EStatus.ACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã duyệt HR này rồi", HttpStatus.OK.value(), null)
                        );
                    hr.setStatus(EStatus.ACTIVE);
                    userRepository.save(hr);

                    return ResponseEntity.ok(
                            new BaseResponse("Duyệt HR dụng thành công", HttpStatus.OK.value(), null)
                    );
                case INACTIVE:
                    if(hr.getStatus().equals(EStatus.INACTIVE))
                        return ResponseEntity.ok(
                                new BaseResponse("Đã khóa HR này rồi", HttpStatus.OK.value(), null)
                        );
                    hr.setStatus(EStatus.INACTIVE);
                    userRepository.save(hr);

                    return ResponseEntity.ok(
                            new BaseResponse("Khóa HR dụng thành công", HttpStatus.OK.value(), null)
                    );
                default:
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new BaseResponse("Trạng thái không hợp lệ", HttpStatus.BAD_REQUEST.value(), null));
            }

        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy HR cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteHR(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<User> optionalHR = userRepository.findByHumanResourceId(id);
            if (optionalHR.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR", HttpStatus.NOT_FOUND.value(), null)
                );

            User hr = optionalHR.get();
            if (hr.getStatus().equals(EStatus.DELETED))
                return ResponseEntity.ok(
                        new BaseResponse("Đã xóa HR này", HttpStatus.OK.value(), null)
                );
            hr.setStatus(EStatus.DELETED);
            userRepository.save(hr);
            return ResponseEntity.ok(new BaseResponse("Xóa HR thành công", HttpStatus.OK.value(), null));
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy HR cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse> getHumanResourceProfile(@RequestHeader("Authorization")String token) {
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
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );
            HumanResource hr = optionalHumanResource.get();
            HumanResourceResponse profile= new HumanResourceResponse(
                    hr.getId(),
                    hr.getCreated(),
                    hr.getUpdated(),
                    hr.getDateOfBirth(),
                    hr.getFirstName(),
                    hr.getLastName(),
                    hr.getPhoneNumber(),
                    hr.getSex(),
                    hr.getAvatar(),
                    hr.getEmployer().getName(),
                    hr.getEmployer().getId(),
                    hr.getUser().getId(),
                    hr.getUser().getStatus().toString(),
                    hr.getUser().getEmail());
            return ResponseEntity.ok(
                    new BaseResponse( "Hiện thông tin HR", HttpStatus.OK.value(), profile)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @Operation(summary = "update ", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateHumanResource(@PathVariable("id")String id,@RequestHeader("Authorization")String token,
                                                            @RequestParam String username,
                                                            @RequestParam String firstName,
                                                            @RequestParam String lastName,
                                                            @RequestParam ESex sex,
                                                            @RequestParam String phoneNumber,
                                                            @RequestParam LocalDateTime dateOfBirth,
                                                            @RequestParam(required = false) MultipartFile avatar,
                                                            @RequestParam(required = false) String password,
                                                            @RequestParam EStatus status) {
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

            Optional<HumanResource> optionalHumanResource1 = humanResourceService.findByIdAndEmployerId(id,optionalEmployer.get().getId());
            if (optionalHumanResource1.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy nhà tuyển dụng ", HttpStatus.NOT_FOUND.value(), null)
                );

              Optional<HumanResource> optionalHumanResource2 = humanResourceService.findByEmail(username);
            if (optionalHumanResource2.isPresent()&&!optionalHumanResource1.get().getUser().getEmail().equals(optionalHumanResource2.get().getUser().getEmail()))
                return ResponseEntity.ok(
                        new BaseResponse("Email đã tồn tại ", HttpStatus.BAD_REQUEST.value(), null)
                );
            if(status==EStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được dùng trạng thái này ", HttpStatus.BAD_REQUEST.value(), null)
                );

            HumanResource hr = optionalHumanResource1.get();
            if(password!=null)
                if(!passwordEncoder.matches(password,optionalHumanResource1.get().getUser().getPassword())&&!password.isEmpty())
                    hr.getUser().setPassword(passwordEncoder.encode(password));

            hr.setFirstName(firstName);
            hr.setLastName(lastName);
            hr.getUser().setEmail(username);
            hr.setSex(sex);
            hr.setDateOfBirth(dateOfBirth);
            hr.setPhoneNumber(phoneNumber);
            hr.getUser().setStatus(status);

            humanResourceService.update(hr,avatar);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thành công", HttpStatus.OK.value(), hr)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "update by token", description = "", tags = {})
    @PatchMapping("/updateProfile")
    public ResponseEntity<BaseResponse> updateHumanResourceProfile(@RequestHeader("Authorization")String token,
                                                                   @RequestBody CreateHumanResourceRequest request
                                                                 ) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<HumanResource> optionalHumanResource = humanResourceService.findById(email);
            if (optionalHumanResource.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null)
                );
            HumanResource hr = optionalHumanResource.get();
            hr.setFirstName(request.firstName());
            hr.setLastName(request.lastName());
            hr.setSex(request.sex());
            hr.setDateOfBirth(request.dateOfBirth());
            hr.setPhoneNumber(request.phoneNumber());
            humanResourceService.update(hr,null);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thành công", HttpStatus.OK.value(), hr)
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
    @PatchMapping("/updateAvatar")
    public ResponseEntity<BaseResponse> updateHumanResourceProfile(@RequestHeader("Authorization")String token, @RequestPart MultipartFile avatar) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean hasPermission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);
            if (!hasPermission) {
                return ResponseEntity.ok(new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null));
            }

            Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
            if (optionalHumanResource.isEmpty()) {
                return ResponseEntity.ok(new BaseResponse("Không tìm thấy HR ", HttpStatus.NOT_FOUND.value(), null));
            }
            if(avatar.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Vui lòng chọn ảnh ", HttpStatus.BAD_REQUEST.value(), null)
                );
            HumanResource humanResource = optionalHumanResource.get();
            humanResourceService.updateAvatar(humanResource,avatar);
            return ResponseEntity.ok(
                    new BaseResponse( "Cập nhật thành công", HttpStatus.OK.value(), humanResource)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }



}
