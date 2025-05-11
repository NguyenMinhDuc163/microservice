package com.btl.nhom14.employeeservice.controller;

import com.btl.nhom14.employeeservice.dto.ApiResponse;
import com.btl.nhom14.employeeservice.dto.BaseRequest;
import com.btl.nhom14.employeeservice.dto.EmployeeDTO;
import com.btl.nhom14.employeeservice.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "get employee by id")
    public ApiResponse<?> getEmployeeById(@RequestParam("id") Long id){
        return ApiResponse.<List<EmployeeDTO>>builder()
                .data(List.of(employeeService.getEmployeeById(id)))
                .build();
    }

    @GetMapping("/{id}/manager")
    @Operation(summary = "get manager of employee by employee id")
    public ApiResponse<?> getManagerByEmployeeId(@PathVariable("id") Long employeeId){
        return ApiResponse.<List<EmployeeDTO>>builder()
                .data(List.of(employeeService.getManagerByEmployeeId(employeeId)))
                .build();
    }

    @GetMapping("{managerId}")
    @Operation(summary = "get list employee ID by managerId")
    public ApiResponse<List<Long>> getListEmployeeByManagerId(@PathVariable("managerId") Long managerId){
        return ApiResponse.<List<Long>>builder()
                .data(employeeService.getListEmployeeByManagerId(managerId))
                .build();
    }

    @GetMapping("/all")
    @Operation(summary = "get list employee")
    public ApiResponse<List<EmployeeDTO>> getListEmployeeByManagerId(){
        return ApiResponse.<List<EmployeeDTO>>builder()
                .data(employeeService.getAll())
                .build();
    }
    @PostMapping("/check")
    @Operation(summary = "check kafka")
    public ApiResponse<?> checkKafka(@RequestBody BaseRequest request){
        employeeService.sendMessage(request.getMsg());
        return ApiResponse.<String>builder()
                .data("da gui thanh cong" + request.getMsg())
                .build();
    }
}
