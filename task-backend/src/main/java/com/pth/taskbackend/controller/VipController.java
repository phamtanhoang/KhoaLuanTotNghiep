package com.pth.taskbackend.controller;

import com.pth.taskbackend.config.PaymentConfig;
import com.pth.taskbackend.dto.request.UpdateVipRequest;
import com.pth.taskbackend.dto.request.VipRequest;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.dto.response.TrasactionReponse;
import com.pth.taskbackend.dto.response.VipEmployerResponse;
import com.pth.taskbackend.dto.response.VipResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.model.meta.Vip;
import com.pth.taskbackend.model.meta.VipEmployer;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.EmployerService;
import com.pth.taskbackend.service.VipEmployerService;
import com.pth.taskbackend.service.VipService;
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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.*;

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
    private final CheckPermission checkPermission;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    EmployerService employerService;
    @Autowired
    VipEmployerService vipEmployerService;

    @Operation(summary = "Get by id", description = "", tags = {})
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getVipById(@RequestHeader("Authorization") String token, @PathVariable String id) {
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
                        new BaseResponse("Không tìm thấy dịch vụ ", HttpStatus.NOT_FOUND.value(), null)
                );
            Vip vip = optionalVip.get();
            VipResponse vipResponse = new VipResponse(
                    vip.getId(), vip.getCreated(), vip.getCreated(), vip.getColor(),
                    vip.getMonth(), vip.getName(), vip.getPrice(), vip.getStatus(),
                    vip.getDescription());

            return ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get by id employer", description = "", tags = {})
    @GetMapping("/getVip-employer/{id}")
    public ResponseEntity<BaseResponse> getVipEmployerById(@RequestHeader("Authorization") String token, @PathVariable String id) {
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
                        new BaseResponse("Không tìm thấy người dùng ", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy dịch vụ ", HttpStatus.NOT_FOUND.value(), null)
                );
            Vip vip = optionalVip.get();

            Optional<VipEmployer> optionalVipEmployer = vipEmployerService.findByEmployerIdAndAvailable(optionalEmployer.get().getId());

            LocalDateTime fromDate;
            LocalDateTime toDate;
            if (optionalVipEmployer.isPresent()) {
                VipEmployer existsEmployerVip = optionalVipEmployer.get();

                LocalDateTime newFromDate = existsEmployerVip.getToDate();

                fromDate = newFromDate;
                toDate = newFromDate.plusMonths(vip.getMonth());
            } else {
                LocalDateTime now = LocalDateTime.now();
                fromDate = now;
                toDate = now.plusMonths(vip.getMonth());

            }

            VipEmployerResponse vipResponse = new VipEmployerResponse(
                    vip.getId(), vip.getCreated(), vip.getCreated(), vip.getColor(),
                    vip.getMonth(), vip.getName(), vip.getPrice(), vip.getStatus(),
                    vip.getDescription(), fromDate, toDate);

            return ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @Operation(summary = "Get list by name and status", description = "", tags = {})
    @GetMapping("getVips-admin")
    public ResponseEntity<BaseResponse> getVipsByAdmin(@RequestHeader("Authorization") String token,
                                                       @RequestParam(required = false) String name,
                                                       @RequestParam(required = false) EVipStatus status,
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
            Page<Vip> vips = vipService.findByNameContainingAndType(name, status, pageable);

            if (vips.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách dịch vụ rỗng", HttpStatus.OK.value(), null)
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

            return ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vipResponses)
            );

        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list by employer", description = "", tags = {})
    @GetMapping("getVips-employer")
    public ResponseEntity<BaseResponse> getVipsByEmployer(@RequestHeader("Authorization") String token) {
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
            List<Vip> vips = vipService.findByEmployer();

            if (vips.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Danh sách dịch vụ rỗng", HttpStatus.OK.value(), null)
                );

            return ResponseEntity.ok(
                    new BaseResponse("Vip được tìm thấy", HttpStatus.OK.value(), vips)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list by trasaction admin", description = "", tags = {})
    @GetMapping("getTrasactions-admin")
    public ResponseEntity<BaseResponse> getTrasactionsAdmin(@RequestHeader("Authorization") String token,
                                                            @RequestParam(required = false) String name,
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
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );


            Page<VipEmployer> optionalVipEmployer = vipEmployerService.findByEmployerNameContaining(name, pageable);


            List<TrasactionReponse> trasactionsReponse = optionalVipEmployer.stream().map(result -> {
                return new TrasactionReponse(
                        result.getId(), result.getCreated(), result.getUpdated(),
                        result.getFromDate(), result.getToDate(), result.getPrice(),
                        result.getInvoiceId(), result.getVip(), result.getEmployer());
            }).collect(Collectors.toList());

            Page<TrasactionReponse> reponse = new PageImpl<>(trasactionsReponse, optionalVipEmployer.getPageable(), optionalVipEmployer.getTotalElements());
            return ResponseEntity.ok(
                    new BaseResponse("Danh sách giao dịch", HttpStatus.OK.value(), reponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list by trasaction admin", description = "", tags = {})
    @GetMapping("/getTrasactionDetail-Admin/{id}")
    public ResponseEntity<BaseResponse> getTrasactionsDetailAdmin(@RequestHeader("Authorization") String token,
                                                                  @PathVariable("id") String id) {
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
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );


            Optional<VipEmployer> optionalVipEmployer = vipEmployerService.findById(id);

            if (optionalVipEmployer.isEmpty()) {
                ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy giao dịch", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            TrasactionReponse trasactionReponse = new TrasactionReponse(
                    optionalVipEmployer.get().getId(), optionalVipEmployer.get().getCreated(), optionalVipEmployer.get().getUpdated(),
                    optionalVipEmployer.get().getFromDate(), optionalVipEmployer.get().getToDate(), optionalVipEmployer.get().getPrice(),
                    optionalVipEmployer.get().getInvoiceId(), optionalVipEmployer.get().getVip(), optionalVipEmployer.get().getEmployer());


            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết giao dịch", HttpStatus.OK.value(), trasactionReponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list by trasaction admin", description = "", tags = {})
    @GetMapping("/getTrasactionDetail-Employer/{id}")
    public ResponseEntity<BaseResponse> getTrasactionsDetailEmployer(@RequestHeader("Authorization") String token,
                                                                     @PathVariable("id") String id) {
        try {
            String email = jwtService.extractUsername(token.substring(7));

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<VipEmployer> optionalVipEmployer = vipEmployerService.findById(id);

            if (optionalVipEmployer.isEmpty()) {
                ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy giao dịch", HttpStatus.NOT_FOUND.value(), null)
                );
            }
            if (!Objects.equals(optionalVipEmployer.get().getEmployer().getId(), optionalEmployer.get().getId())) {
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );
            }

            TrasactionReponse trasactionReponse = new TrasactionReponse(
                    optionalVipEmployer.get().getId(), optionalVipEmployer.get().getCreated(), optionalVipEmployer.get().getUpdated(),
                    optionalVipEmployer.get().getFromDate(), optionalVipEmployer.get().getToDate(), optionalVipEmployer.get().getPrice(),
                    optionalVipEmployer.get().getInvoiceId(), optionalVipEmployer.get().getVip(), optionalVipEmployer.get().getEmployer());


            return ResponseEntity.ok(
                    new BaseResponse("Chi tiết giao dịch", HttpStatus.OK.value(), trasactionReponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Get list by trasaction employer", description = "", tags = {})
    @GetMapping("getTrasactions-employer")
    public ResponseEntity<BaseResponse> getTrasactionsEmployer(@RequestHeader("Authorization") String token,
                                                               @RequestParam(required = false) String name,
                                                               Pageable pageable) {
        try {
            String email = jwtService.extractUsername(token.substring(7));

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            if (optionalUser.get().getRole() != ERole.EMPLOYER)
                return ResponseEntity.ok(
                        new BaseResponse("Bạn không có quyền!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.FORBIDDEN.value(), null)
                );

            Page<VipEmployer> optionalVipEmployer = vipEmployerService.findByEmployerId(optionalEmployer.get().getId(), name, pageable);


            List<TrasactionReponse> trasactionsReponse = optionalVipEmployer.stream().map(result -> {
                return new TrasactionReponse(
                        result.getId(), result.getCreated(), result.getUpdated(),
                        result.getFromDate(), result.getToDate(), result.getPrice(),
                        result.getInvoiceId(), result.getVip(), result.getEmployer());
            }).collect(Collectors.toList());

            Page<TrasactionReponse> reponse = new PageImpl<>(trasactionsReponse, optionalVipEmployer.getPageable(), optionalVipEmployer.getTotalElements());
            return ResponseEntity.ok(
                    new BaseResponse("Danh sách giao dịch", HttpStatus.OK.value(), reponse)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @Operation(summary = "Create", description = "", tags = {})
    @PostMapping("")
    public ResponseEntity<BaseResponse> createVip(@RequestHeader("Authorization") String token, @RequestBody VipRequest vipRequest) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }


            Vip vip = new Vip();
            vip.setColor(vipRequest.color());
            vip.setName(vipRequest.name());
            vip.setStatus(EVipStatus.ACTIVE);
            vip.setPrice(vipRequest.price());
            vip.setMonth(vipRequest.month());
            vip.setDescription(vipRequest.description());
            vipService.create(vip);

            VipResponse vipResponse = new VipResponse(vip.getId(), vip.getCreated(), vip.getCreated(),
                    vip.getColor(), vip.getMonth(), vip.getName(), vip.getPrice(),
                    vip.getStatus(), vip.getDescription());
            return ResponseEntity.ok(
                    new BaseResponse("Tạo thành công", HttpStatus.OK.value(), vipResponse)
            );
        } catch (ExpiredJwtException e) {
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
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateVip(@RequestHeader("Authorization") String token, @PathVariable("id") String id, @RequestBody UpdateVipRequest request) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> optionalUser = userRepository.findByEmail(email);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }


            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy dịch vụ để cập nhật!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            if (request.status() == EVipStatus.DELETED)
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
            VipResponse vipResponse = new VipResponse(vip.getId(), vip.getCreated(), vip.getCreated(),
                    vip.getColor(), vip.getMonth(), vip.getName(), vip.getPrice(),
                    vip.getStatus(), vip.getDescription());

            return ResponseEntity.ok(
                    new BaseResponse("Cập nhật dịch vụ thành công", HttpStatus.OK.value(), vipResponse)
            );
        } catch (ExpiredJwtException e) {
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
    public ResponseEntity<BaseResponse> deleteVip(@RequestHeader("Authorization") String token, @PathVariable("id") String id) {
        try {

            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.ADMIN);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );
            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty()) {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            }

            Optional<Vip> optionalVip = vipService.findById(id);
            if (optionalVip.isPresent()) {
                if (optionalVip.get().getStatus() == EVipStatus.DELETED)
                    return ResponseEntity.ok(
                            new BaseResponse("Dịch vụ này đã được xóa trước đó", HttpStatus.BAD_REQUEST.value(), null)
                    );
                vipService.deleteById(optionalVip.get());

                return ResponseEntity.ok(
                        new BaseResponse("Xóa dịch vụ thành công", HttpStatus.OK.value(), null)
                );
            } else {
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy dịch vụ để xóa!", HttpStatus.NOT_FOUND.value(), null)
                );
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.ok(new BaseResponse("Không tìm thấy dịch vụ cần xóa!", HttpStatus.NOT_FOUND.value(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }


    @GetMapping("/pay")
    public ResponseEntity<?> getPay(@RequestHeader("Authorization") String token, @RequestParam String vipId, @RequestParam String bank) throws UnsupportedEncodingException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép!", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
            if (optionalEmployer.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng!", HttpStatus.NOT_FOUND.value(), null)
                );
            Employer employer = optionalEmployer.get();

            Optional<Vip> optionalVip = vipService.findById(vipId);
            if (optionalVip.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy dịch vụ!", HttpStatus.NOT_FOUND.value(), null)
                );

            Vip vip = optionalVip.get();
            if (vip.getStatus() != EVipStatus.ACTIVE)
                return ResponseEntity.ok(
                        new BaseResponse("Dịch vụ không còn hoạt động!", HttpStatus.NOT_FOUND.value(), null)
                );

            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", "2.1.0");
            vnp_Params.put("vnp_Command", "pay");
            vnp_Params.put("vnp_TmnCode", PaymentConfig.vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf((long) vip.getPrice() * 100));
            vnp_Params.put("vnp_CurrCode", "VND");
            vnp_Params.put("vnp_BankCode", bank);
            vnp_Params.put("vnp_TxnRef", PaymentConfig.getRandomNumber(8));
            vnp_Params.put("vnp_OrderType", "other");
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_ReturnUrl", DOMAIN_API + "/vips/payResponse");
            vnp_Params.put("vnp_IpAddr", "127.0.0.1");
            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

            cld.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

            vnp_Params.put("vnp_OrderInfo", "VipId:" + vip.getId() + " - EmployerId:" + employer.getId());

            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            for (String fieldName : fieldNames) {
                String fieldValue = vnp_Params.get(fieldName);
                if (fieldValue != null && !fieldValue.isEmpty()) {
                    hashData.append(fieldName).append('=')
                            .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII)).append('=')
                            .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    if (fieldNames.indexOf(fieldName) < fieldNames.size() - 1) {
                        hashData.append('&');
                        query.append('&');
                    }
                }
            }

            String queryUrl = query.toString();
            String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.secretKey, hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;

            return ResponseEntity.ok().body(new BaseResponse("Trang thanh toán", HttpStatus.OK.value(), paymentUrl));
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/payResponse")
    public RedirectView payResponse(
            @RequestParam("vnp_ResponseCode") String vnpResponseCode,
            @RequestParam("vnp_OrderInfo") String vnpOrderInfo,
            @RequestParam("vnp_TransactionNo") String vnpTransactionNo) {
        try {
            if (vnpResponseCode.equals("00")) {
                if (!vnpOrderInfo.contains("EmployerId") && !vnpOrderInfo.contains("VipId")) {
                    return new RedirectView(FRONTEND_URL + "/payment-error", true);
                }

                String[] parts = vnpOrderInfo.split(" - ");
                if (parts.length < 2) {
                    return new RedirectView(FRONTEND_URL + "/payment-error", true);
                }

                String vipIdPart = parts[0];
                String vipId = vipIdPart.split(":")[1];


                String employerIdPart = parts[1];
                String userId = employerIdPart.split(":")[1];

                Vip vip = vipService.findById(vipId)
                        .orElseThrow(() -> new Exception("Không tìm thấy dịch vụ!"));

                Employer employer = employerService.findById(userId)
                        .orElseThrow(() -> new Exception("Không tìm thấy nhà tuyển dụng!"));

                VipEmployer vipEmployer = processVipEmployer(vip, employer);

                vipEmployerService.create(vipEmployer.getFromDate(),
                        vipEmployer.getToDate(),
                        vip.getPrice(), employer,
                        vip, vnpTransactionNo);
                return new RedirectView(FRONTEND_URL + "/payment-success", true);

            } else {
                return new RedirectView(FRONTEND_URL + "/payment-error", true);
            }
        } catch (Exception e) {
            return new RedirectView(FRONTEND_URL + "/payment-error", true);
        }
    }

    private VipEmployer processVipEmployer(Vip vip, Employer employer) throws IOException {
        Optional<VipEmployer> optionalVipEmployer = vipEmployerService.findByEmployerIdAndAvailable(employer.getId());

        VipEmployer vipEmployer = new VipEmployer();
        vipEmployer.setEmployer(employer);
        vipEmployer.setVip(vip);
        vipEmployer.setPrice(vip.getPrice());
        if (optionalVipEmployer.isPresent()) {
            VipEmployer existsEmployerVip = optionalVipEmployer.get();

            LocalDateTime newFromDate = existsEmployerVip.getToDate();

            vipEmployer.setFromDate(newFromDate);
            vipEmployer.setToDate(newFromDate.plusMonths(vip.getMonth()));
        } else {
            LocalDateTime now = LocalDateTime.now();
            vipEmployer.setFromDate(now);
            vipEmployer.setToDate(now.plusMonths(vip.getMonth()));

        }
        return vipEmployer;
    }
}
