package com.pth.taskbackend.controller;
import com.pth.taskbackend.config.BankingConfig;
import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.servlet.view.RedirectView;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@Tag(name = "Banking", description = "Auth APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/bankings"})
public class BankingController {
    @Autowired
    VipService vipService;
    @Autowired
    JwtService jwtService;
    @Autowired
    EmployerService employerService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CandidateService candidateService;
    @Autowired
    VipCandidateService vipCandidateService;
    @Autowired
    VipEmployerService vipEmployerService;

    @GetMapping("/pay")
    public ResponseEntity<?> getPay(@RequestParam String vipId, @RequestHeader("Authorization") String token) throws UnsupportedEncodingException {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER) ||
                    checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.CANDIDATE);
            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            Optional<Vip> optionalVip = vipService.findById(vipId);
            if (optionalVip.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy Vip", HttpStatus.NOT_FOUND.value(), null)
                );

            Vip vip = optionalVip.get();

            String vnp_Version = "2.1.0";
            String vnp_Command = "pay";
            String orderType = "other";
            String bankCode = "NCB";
            long price = (long) vip.getPrice() * 100;
            String vnp_TxnRef = BankingConfig.getRandomNumber(8);
            String vnp_IpAddr = "127.0.0.1";
            String vnp_TmnCode = BankingConfig.vnp_TmnCode;

            Map<String, String> vnp_Params = new HashMap<>();
            vnp_Params.put("vnp_Version", vnp_Version);
            vnp_Params.put("vnp_Command", vnp_Command);
            vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
            vnp_Params.put("vnp_Amount", String.valueOf(price));
            vnp_Params.put("vnp_CurrCode", "VND");
            // vnp_Params.put("vnp_BankCode", bankCode);
            vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
            vnp_Params.put("vnp_OrderType", orderType);
            vnp_Params.put("vnp_Locale", "vn");
            vnp_Params.put("vnp_ReturnUrl", BankingConfig.vnp_ReturnUrl);
            vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

            Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
            SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
            String vnp_CreateDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

            cld.add(Calendar.MINUTE, 15);
            String vnp_ExpireDate = formatter.format(cld.getTime());
            vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

            EType userType;
            switch (optionalUser.get().getRole()) {
                case CANDIDATE:
                    userType = EType.CANDIDATE;
                    Candidate candidate = candidateService.findByUserEmail(email).get();
                    vnp_Params.put("vnp_OrderInfo", "VIP" + vipId + userType + candidate.getId());
                    break;
                case EMPLOYER:
                    userType = EType.EMPLOYER;
                    Employer employer = employerService.findByUserEmail(email).get();
                    vnp_Params.put("vnp_OrderInfo", "VIP" + vipId + userType + employer.getId());
                    break;
                default:
                    return ResponseEntity.ok(
                            new BaseResponse("Vai trò không hợp lệ", HttpStatus.BAD_REQUEST.value(), null)
                    );
            }
            if (userType != vip.getType()) {
                return ResponseEntity.ok(
                        new BaseResponse("Loại Vip không hợp lệ", HttpStatus.BAD_REQUEST.value(), null)
                );
            }
            List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
            Collections.sort(fieldNames);
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            for (String fieldName : fieldNames) {
                String fieldValue = vnp_Params.get(fieldName);
                if (fieldValue != null && !fieldValue.isEmpty()) {
                    hashData.append(fieldName).append('=')
                            .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString())).append('=')
                            .append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    if (fieldNames.indexOf(fieldName) < fieldNames.size() - 1) {
                        hashData.append('&');
                        query.append('&');
                    }
                }
            }

            String queryUrl = query.toString();
            String vnp_SecureHash = BankingConfig.hmacSHA512(BankingConfig.secretKey, hashData.toString());
            queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
            String paymentUrl = BankingConfig.vnp_PayUrl + "?" + queryUrl;

            return ResponseEntity.ok().body(paymentUrl);
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
                String[] parts;
                if (vnpOrderInfo.contains("CANDIDATE")) {
                    parts = vnpOrderInfo.split("CANDIDATE");
                } else if (vnpOrderInfo.contains("EMPLOYER")) {
                    parts = vnpOrderInfo.split("EMPLOYER");
                } else {
                    return new RedirectView("/errorPage", true);
                }

                if (parts.length == 2) {
                    String vipId = parts[0].substring(parts[0].lastIndexOf("VIP") + 3);
                    String userId = parts[1];
                    Vip vip = vipService.findById(vipId)
                            .orElseThrow(() -> new Exception("Không tìm thấy Vip"));

                    if (vnpOrderInfo.contains("EMPLOYER")) {
                        Employer employer = employerService.findById(userId)
                                .orElseThrow(() -> new Exception("Không tìm thấy Employer"));

                        VipEmployer vipEmployer = processVipEmployer(vip,employer, vnpTransactionNo);
                        vipEmployerService.create(vipEmployer);
                    } else if (vnpOrderInfo.contains("CANDIDATE")) {
                        Candidate candidate = candidateService.findById(userId)
                                .orElseThrow(() -> new Exception("Không tìm thấy Candidate"));

                        VipCandidate vipCandidate = processVipCandidate(vip,candidate, vnpTransactionNo);
                        vipCandidateService.create(vipCandidate);
                    }

                    return new RedirectView("http://localhost:5173/employer/vipHistories", true);
                } else {
                    return new RedirectView("/errorPage", true);
                }
            } else {
                return new RedirectView("/errorPage", true);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new RedirectView("/errorPage", true);
        }
    }

    private VipEmployer processVipEmployer(Vip vip, Employer employer, String vnpTransactionNo) throws IOException {
        Optional<VipEmployer> optionalVipEmployer = vipEmployerService.findByEmployerIdAndAvailable(employer.getId());

        VipEmployer vipEmployer = new VipEmployer();
        vipEmployer.setEmployer(employer);
        vipEmployer.setVip(vip);
        vipEmployer.setId(vnpTransactionNo);

        if (optionalVipEmployer.isPresent()) {
            VipEmployer existsEmployerVip = optionalVipEmployer.get();
            vipEmployer.setPrice(existsEmployerVip.getPrice());

            LocalDateTime toDate = existsEmployerVip.getToDate();
            LocalDateTime newFromDate = toDate.plusDays(1);

            vipEmployer.setFromDate(newFromDate);
            vipEmployer.setToDate(newFromDate.plusMonths(1).plusDays(1));
        } else {
            LocalDateTime now = LocalDateTime.now();
            vipEmployer.setFromDate(now);
            vipEmployer.setToDate(now.plusMonths(1).plusDays(1));
            vipEmployer.setPrice(vip.getPrice());
        }
        return vipEmployer;
    }
    private VipCandidate processVipCandidate(Vip vip, Candidate candidate, String vnpTransactionNo) throws IOException {
        Optional<VipCandidate> optionalVipCandidate = vipCandidateService.findByCandidateIdAndAvailable(candidate.getId());

        VipCandidate vipCandidate = new VipCandidate();
        vipCandidate.setCandidate(candidate);
        vipCandidate.setVip(vip);
        vipCandidate.setId(vnpTransactionNo);

        if (optionalVipCandidate.isPresent()) {
            VipCandidate existsEmployerVip = optionalVipCandidate.get();
            vipCandidate.setPrice(existsEmployerVip.getPrice());

            LocalDateTime toDate = existsEmployerVip.getToDate();
            LocalDateTime newFromDate = toDate.plusDays(1);

            vipCandidate.setFromDate(newFromDate);
            vipCandidate.setToDate(newFromDate.plusMonths(1).plusDays(1));
        } else {
            LocalDateTime now = LocalDateTime.now();
            vipCandidate.setFromDate(now);
            vipCandidate.setToDate(now.plusMonths(1).plusDays(1));
            vipCandidate.setPrice(vip.getPrice());
        }
        return vipCandidate;
    }

}


