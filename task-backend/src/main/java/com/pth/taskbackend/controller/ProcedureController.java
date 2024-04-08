//package com.pth.taskbackend.controller;
//import com.pth.taskbackend.dto.response.BaseResponse;
//import com.pth.taskbackend.dto.response.TopCategoriesResponse;
//import com.pth.taskbackend.enums.ERole;
//import com.pth.taskbackend.enums.EStatus;
//import com.pth.taskbackend.model.meta.Category;
//import com.pth.taskbackend.model.meta.Employer;
//import com.pth.taskbackend.model.meta.Procedure;
//import com.pth.taskbackend.repository.CategoryRepository;
//import com.pth.taskbackend.repository.JobRepository;
//import com.pth.taskbackend.security.JwtService;
//import com.pth.taskbackend.service.CategoryService;
//import com.pth.taskbackend.service.EmployerService;
//import com.pth.taskbackend.service.JobService;
//import com.pth.taskbackend.service.ProcedureService;
//import com.pth.taskbackend.util.func.CheckPermission;
//import com.pth.taskbackend.util.func.ImageFunc;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.security.SecurityRequirement;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import jakarta.websocket.server.PathParam;
//import lombok.RequiredArgsConstructor;
//import org.checkerframework.checker.units.qual.C;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.dao.EmptyResultDataAccessException;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Optional;
//
//import static com.pth.taskbackend.util.constant.PathConstant.BASE_URL;
//
//@CrossOrigin(origins = "*")
//@Tag(name = "Procedures", description = "Procedures APIs")
//@SecurityRequirement(name = "javainuseapi")
//@RequiredArgsConstructor
//@RestController
//@RequestMapping(value = {BASE_URL + "/procedures"})
//public class ProcedureController {
//
//    @Autowired
//    private ProcedureService procedureService;
//
//    @Autowired
//    private JobRepository jobRepository;
//
//    @Autowired
//    JwtService jwtService;
//
//    @Autowired
//    private EmployerService employerService;
//    private final CheckPermission checkPermission;
//
////    @Operation(summary = "Get by id", description = "", tags = {})
////    @GetMapping("/{id}")
////    public ResponseEntity<BaseResponse> getProcedureById(@PathVariable String id) {
////        try {
////            Optional<Procedure> procedure = procedureService.findById(id);
////            return category.map(value -> ResponseEntity.ok(
////                    new BaseResponse("Danh mục được tìm thấy", HttpStatus.OK.value(), value)
////            )).orElseGet(() -> ResponseEntity.ok(
////                    new BaseResponse("Không tìm thấy danh mục", HttpStatus.NOT_FOUND.value(), null)
////            ));
////        } catch (Exception e) {
////            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
////                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
////        }
////    }
//
//
//    @Operation(summary = "Create", description = "", tags = {})
//    @PostMapping("/create")
//    public ResponseEntity<BaseResponse> createProcedure(@RequestBody Procedure procedure, @RequestHeader("Authorization") String token) throws IOException {
//        try {
//            String email = jwtService.extractUsername(token);
//            boolean permission = checkPermission.hasPermission(token, EStatus.ACTIVE, ERole.EMPLOYER);
//            if (!permission)
//                return ResponseEntity.ok(
//                        new BaseResponse("Người dùng không được phép", HttpStatus.FORBIDDEN.value(), null)
//                );
//            Optional<Employer> optionalEmployer = employerService.findByUserEmail(email);
//            if (optionalEmployer.isPresent())
//                return ResponseEntity.ok(
//                        new BaseResponse("Không tìm thấy nhà tuyển dụng", HttpStatus.NOT_FOUND.value(), null)
//                );
//            Optional<Procedure> optionalProcedure = procedureService.findByName(procedure.getName());
//            if (optionalProcedure.isPresent()) {
//                return ResponseEntity.ok(
//                        new BaseResponse("Tên quy trình đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
//                );
//            }
//
//            Employer employer = optionalEmployer.get();
//            procedure.setEmployer(employer);
//            return ResponseEntity.ok(
//                    new BaseResponse("Tạo quy trình thành công", HttpStatus.OK.value(), procedure)
//            );
//
//        } catch (DataIntegrityViolationException e) {
//            return ResponseEntity.ok(
//                    new BaseResponse("Tên danh mục đã tồn tại", HttpStatus.BAD_REQUEST.value(), null)
//            );
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new BaseResponse("Có lỗi xảy ra!", HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage()));
//        }
//    }
//
//}
