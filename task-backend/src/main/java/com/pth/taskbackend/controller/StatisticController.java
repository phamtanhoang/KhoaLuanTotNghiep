package com.pth.taskbackend.controller;

import com.pth.taskbackend.dto.response.*;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.security.JwtService;
import com.pth.taskbackend.service.*;
import com.pth.taskbackend.util.func.CheckPermission;
import com.pth.taskbackend.util.func.DateFunc;
import io.jsonwebtoken.ExpiredJwtException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;

@CrossOrigin(origins = "*")
@io.swagger.v3.oas.annotations.tags.Tag(name = "Tags", description = "Tag APIs")
@SecurityRequirement(name = "javainuseapi")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = {BASE_URL + "/statistics"})
public class StatisticController {
    @Autowired
    JwtService jwtService;
    @Autowired
    CheckPermission checkPermission;
    @Autowired
    UserRepository userRepository;

    @Autowired
    JobService jobService;
    @Autowired
    CandidateService candidateService;
    @Autowired
    EmployerService employerService;
    @Autowired
    HumanResourceService humanResourceService;

    @Autowired
    ApplicationService applicationService;

    @Autowired
    VipEmployerService vipEmployerService;

    @Autowired
    CategoryService categoryService;
    @GetMapping("/getCount_Admin")
    public ResponseEntity<BaseResponse> getCount_Admin(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            if (optionalUser.get().getRole()!=ERole.ADMIN)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );


            int countJob = jobService.countJobActive_Admin();
            int countCandidate = candidateService.countCandidate_Admin();
            int countEmployer = employerService.countEmployer_Admin();
            int countEmployerVip = employerService.countEmployerVip_Admin();

            List<Integer> statistics = Arrays.asList(countJob, countCandidate, countEmployer, countEmployerVip);

            return ResponseEntity.ok(
                    new BaseResponse("Thành công", HttpStatus.OK.value(), statistics)
            );
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }
    @GetMapping("/getCount")
    public ResponseEntity<BaseResponse> getCount(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtService.extractUsername(token.substring(7));
            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER)
                    ||checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.HR);

            if (!permission)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            if(optionalUser.get().getRole()==ERole.EMPLOYER) {

                Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
                if(optionalEmployer.isEmpty()){
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
                    );
                }
                int countJobActive = jobService.countJobActive_Employer(optionalEmployer.get().getId());
                int countJobPending = jobService.countJobPending_Employer(optionalEmployer.get().getId());
                int countApplicationPending = applicationService.countApplicationPending_Employer(optionalEmployer.get().getId());
                int countHR = humanResourceService.countHR_Employer(optionalEmployer.get().getId());

                List<Integer> statistics = Arrays.asList(countJobActive, countJobPending, countApplicationPending, countHR);

                return ResponseEntity.ok(
                        new BaseResponse("Thành công", HttpStatus.OK.value(), statistics)
                );
            }else{
                Optional<HumanResource> optionalHumanResource = humanResourceService.findByEmail(email);
                if(optionalHumanResource.isEmpty()){
                    return ResponseEntity.ok(
                            new BaseResponse("Không tìm thấy nhân sự", HttpStatus.NOT_FOUND.value(), null)
                    );
                }

                int countJobActive = jobService.countJobActive_HR(optionalHumanResource.get().getId());
                int countJobPending = jobService.countJobPending_HR(optionalHumanResource.get().getId());
                int countApplicationPending = applicationService.countApplicationPending_HR(optionalHumanResource.get().getId());

                List<Integer> statistics = Arrays.asList(countJobActive, countJobPending, countApplicationPending);

                return ResponseEntity.ok(
                        new BaseResponse("Thành công", HttpStatus.OK.value(), statistics)
                );
            }


        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new BaseResponse("Token đã hết hạn", HttpStatus.UNAUTHORIZED.value(), null));
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
        }
    }

    @GetMapping("/getStatistic_Admin")
    public ResponseEntity<BaseResponse> getStatistic(@RequestHeader("Authorization") String token, @RequestParam int year){
        try {
            String email = jwtService.extractUsername(token.substring(7));

            Optional<User> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isEmpty())
                return ResponseEntity.ok(
                        new BaseResponse("Không tìm thấy người dùng", HttpStatus.NOT_FOUND.value(), null)
                );

            if (optionalUser.get().getRole()!=ERole.ADMIN)
                return ResponseEntity.ok(
                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
                );

            // Initialize an array with 12 elements for 12 months
            Long[] prices = new Long[12];
            Arrays.fill(prices, 0L);

            // Query the database for prices in each month
            List<VipEmployer> vipEmployers = vipEmployerService.findStatisticInYear(year);
            for (VipEmployer vipEmployer : vipEmployers) {
                int month = vipEmployer.getCreated().getMonthValue();
                prices[month - 1] += vipEmployer.getPrice();
            }

            // Create a list of month-price pairs
            List<Map<String, Object>> line = new ArrayList<>();
            for (int i = 0; i < 12; i++) {
                Map<String, Object> monthPrice = new HashMap<>();
                monthPrice.put("month", i + 1);
                monthPrice.put("price", prices[i]);
                line.add(monthPrice);
            }

            List<Map<String, Object>> donut = categoryService.findStatisticInYear(year);


            StatisticResponse statisticResponse = new StatisticResponse(line, donut);

            return ResponseEntity.ok(
                    new BaseResponse("Thành công", HttpStatus.OK.value(), statisticResponse)
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
