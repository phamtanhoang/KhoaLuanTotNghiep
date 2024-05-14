package com.pth.taskbackend.controller;
import com.pth.taskbackend.dto.request.UpdateVipRequest;
import com.pth.taskbackend.dto.request.VipRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.VipCandidateResponse;
import com.pth.taskbackend.dto.response.VipResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Vips", description = "Vip APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/vips"})
public class VipController {

    @Autowired
    VipService vipService;
    @Autowired
    private final CheckPermission checkPermission ;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;

    @Autowired
    CandidateService candidateService;
    @Autowired
    EmployerService employerService;
    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getVipById(@RequestHeader("Authorization")String token, @PathVariable String id) {
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
                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
                );
            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy Vip ", HttpStatus.NOT_FOUND.value(), null)
                );
            Vip vip = optionalVip.get();
            VipResponse vipResponse=new VipResponse(
                    vip.getId(),vip.getCreated(),vip.getCreated(),vip.getColor(),
                    vip.getMonth(), vip.getName(), vip.getPrice(), vip.getStatus(),
                     vip.getDescription());

            return  ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list by name and status", description = "", tags = {})
    @GetMapping("getVips-admin")
    public ResponseEntity<BaseResponse> getVipsByAdmin(@RequestHeader("Authorization")String token,
                                                       @RequestParam(required = false) String name,
                                                       @RequestParam(required = false)EVipStatus status,
                                                       Pageable pageable) {
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
                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
                );
            Page<Vip> vips = vipService.findByNameContainningAndType(name,status,pageable);

            if (vips.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách Vip rỗng", HttpStatus.OK.value(), null)
                );
            Page<VipResponse> vipResponses = vips
                    .map(vip -> new VipResponse(
                            vip.getId(),
                            vip.getCreated(),
                            vip.getUpdated(),
                            vip.getColor(),
                            vip.getMonth(),
                            vip.getName(),
                            vip.getPrice(),
                            vip.getStatus(),
                            vip.getDescription()
                    ));

            return  ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponses)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list by employer", description = "", tags = {})
    @GetMapping("getVips-employer")
    public ResponseEntity<BaseResponse> getVipsByEmployer(@RequestHeader("Authorization")String token,
                                                          @RequestParam(required = false) String name,
                                                          Pageable pageable) {
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
                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
                );
            Page<Vip> vips = vipService.findByNameContainningAndType(name,EVipStatus.ACTIVE,pageable);

            if (vips.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách Vip rỗng", HttpStatus.OK.value(), null)
                );
            Page<VipResponse> vipResponses = vips
                    .map(vip -> new VipResponse(
                            vip.getId(),
                            vip.getCreated(),
                            vip.getUpdated(),
                            vip.getColor(),
                            vip.getMonth(),
                            vip.getName(),
                            vip.getPrice(),
                            vip.getStatus(),
                            vip.getDescription()
                    ));

            return  ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


//    @Operation(summary = "Get list by candidate", description = "", tags = {})
//    @GetMapping("getVips-candidate")
//    public ResponseEntity<BaseResponse> getVipsByCandidate(@RequestHeader("Authorization")String token, Pageable pageable) {
//        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
//            if (!permission)
//                return ResponseEntity.ok(
//                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//            if (optionalUser.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
//                );
//            Page<Vip> vips = vipService.findByStatusAndType(EType.CANDIDATE,EVipStatus.ACTIVE,pageable);
//
//            if (vips.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Danh sách Vip rỗng", HttpStatus.OK.value(), null)
//                );
//            Page<VipResponse> vipResponses = vips
//                    .map(vip -> new VipResponse(
//                            vip.getId(),
//                            vip.getCreated(),
//                            vip.getUpdated(),
//                            vip.getColor(),
//                            vip.getMonth(),
//                            vip.getName(),
//                            vip.getPrice(),
//                            vip.getStatus(),
//                            vip.getType(),
//                            vip.getDescription()
//                    ));
//
//            return  ResponseEntity.ok(
//                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponses)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }


//    @Operation(summary = "Get lists vip candidate", description = "", tags = {})
//    @GetMapping("getVipCandidates")
//    public ResponseEntity<BaseResponse> getVipCandidates(@RequestHeader("Authorization")String token, Pageable pageable) {
//        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
//            if (!permission)
//                return ResponseEntity.ok(
//                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//            if (optionalUser.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
//                );
//            Page<Candidate> vipCandidates = candidateService.findVipCandidates(pageable);
//
//            if (vipCandidates.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Danh sách ứng viên Vip rỗng", HttpStatus.OK.value(), null)
//                );
//            Page<VipCandidateResponse> vipResponses = vipCandidates.map(vip -> new VipCandidateResponse(
//                    vip.getUser().getId(),
//                    vip.getUser().getCreated(),
//                    vip.getUser().getUpdated(),
//                    vip.getUser().getEmail(),
//                    vip.getUser().getStatus(),
//                    vip.getUser().getRole(),
//                    vip.getFirstName(),
//                    vip.getLastName(),
//                    vip.getAvatar(),
//                    vip.getAddress(),
//                    vip.getDateOfBirth(),
//                    vip.getIntroduction(),
//                    vip.getJob(),
//                    vip.getLink(),
//                    vip.getPhoneNumber(),
//                    vip.getSex()
//            ));
//
//            return  ResponseEntity.ok(
//                    new BaseResponse("Danh sách các ứng viên Vip", HttpStatus.OK.value(), vipResponses)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }
//    @Operation(summary = "Get list vip employers", description = "", tags = {})
//    @GetMapping("getVipEmployers")
//    public ResponseEntity<BaseResponse> getVipsEmployers(@RequestHeader("Authorization")String token, Pageable pageable) {
//        try {
//            String email = jwtService.extractUsername(token.substring(7));
//            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
//            if (!permission)
//                return ResponseEntity.ok(
//                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
//                );
//
//            Optional<User> optionalUser = userRepository.findByEmail(email);
//            if (optionalUser.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
//                );
//            Page<Vip> vips = vipService.findByStatusAndType(EType.CANDIDATE,EVipStatus.ACTIVE,pageable);
//
//            if (vips.isEmpty())
//                return ResponseEntity.ok(
//                        new BaseResponse("Danh sách Vip rỗng", HttpStatus.OK.value(), null)
//                );
//            Page<VipResponse> vipResponses = vips
//                    .map(vip -> new VipResponse(
//                            vip.getId(),
//                            vip.getCreated(),
//                            vip.getUpdated(),
//                            vip.getColor(),
//                            vip.getMonth(),
//                            vip.getName(),
//                            vip.getPrice(),
//                            vip.getStatus(),
//                            vip.getType()
//                    ));
//
//            return  ResponseEntity.ok(
//                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponses)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }






    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("")
    public ResponseEntity<BaseResponse> createVip(@RequestHeader("Authorization") String token,@RequestBody VipRequest vipRequest) {
        try {

            String email = jwtService.extractUsername(token.substring(7));

            Optional<User> optionalUser = userRepository.findByEmail(email);

            if(optionalUser.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if (optionalUser.get().getRole()!=ERole.ADMIN){
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );
            }


            Vip vip = new Vip();
            vip.setColor(vipRequest.color());
            vip.setName(vipRequest.name());
            vip.setStatus(EVipStatus.ACTIVE);
            vip.setPrice(vipRequest.price());
            vip.setMonth(vipRequest.month());
            vip.setDescription(vip.getDescription());
            vipService.create(vip);

            VipResponse vipResponse=new VipResponse(vip.getId(),vip.getCreated(),vip.getCreated(),
                    vip.getColor(), vip.getMonth(), vip.getName(), vip.getPrice(),
                    vip.getStatus(), vip.getDescription());
            return ResponseEntity.ok(
                    new BaseResponse("Tạo thành công", HttpStatus.OK.value(), vipResponse)
            );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn!", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "update", description = "", tags = {})
    @PatchMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCategory(@RequestHeader("Authorization")String token, @PathVariable("id") String id, @RequestBody UpdateVipRequest request) {
        try {

            String email = jwtService.extractUsername(token.substring(7));

            Optional<User> optionalUser = userRepository.findByEmail(email);

            if(optionalUser.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if (optionalUser.get().getRole()!=ERole.ADMIN){
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy Vip để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if(request.status()==EVipStatus.DELETED)
                return ResponseEntity.ok(
                        new BaseResponse("Không được sử dụng trạng thái này", HttpStatus.BAD_REQUEST.value(), null)
                );
        Vip vip = optionalVip.get();
            vip.setName(request.name());
            vip.setMonth(request.month());
            vip.setStatus(request.status());
            vip.setPrice(request.price());
            vip.setColor(request.color());
            vip.setDescription(request.description());
            vipService.update(vip);
            VipResponse vipResponse=new VipResponse(vip.getId(),vip.getCreated(),vip.getCreated(),
                    vip.getColor(), vip.getMonth(), vip.getName(), vip.getPrice(),
                    vip.getStatus(), vip.getDescription());

            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật Vip thành công", HttpStatus.OK.value(), vipResponse)
            );
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.ok(
                    new BaseResponse("Tên Vip đã tồn tại!", HttpStatus.BAD_REQUEST.value(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "delete", description = "", tags = {})
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteCategory(@RequestHeader("Authorization")String token, @PathVariable("id") String id) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if(optionalUser.isEmpty()){
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            if (optionalUser.get().getRole()!=ERole.ADMIN){
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isPresent()) {
                if(optionalVip.get().getStatus()==EVipStatus.DELETED)
                    return ResponseEntity.ok(
                            new BaseResponse("Vip này đã được xóa trước đó", HttpStatus.BAD_REQUEST.value(), null)
                    );
                vipService.deleteById(optionalVip.get().getId());

                return ResponseEntity.ok(
                        new BaseResponse("Xóa Vip thành công", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy Vip để xóa!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        }catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy Vip cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

}
