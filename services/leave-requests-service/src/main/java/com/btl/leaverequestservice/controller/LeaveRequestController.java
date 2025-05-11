package com.btl.leaverequestservice.controller;

import com.btl.leaverequestservice.dto.LeaveRequestDTO;
import com.btl.leaverequestservice.dto.UpdateLeaveRequestRequestDTO;
import com.btl.leaverequestservice.model.LeaveRequest;
import com.btl.leaverequestservice.model.mapper.LeaveRequestMapper;
import com.btl.leaverequestservice.service.LeaveRequestService;
import com.btl.leaverequestservice.utils.ResponseBuilder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
@Tag(name = "LeaveRequest API", description = "Quản lý các yêu cầu nghỉ phép")
public class LeaveRequestController {

    private final LeaveRequestService service;

    public LeaveRequestController(LeaveRequestService service) {
        this.service = service;
    }

    @Operation(summary = "Tạo yêu cầu nghỉ phép mới")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tạo yêu cầu thành công",
                content = @Content(mediaType = "application/json", schema = @Schema(implementation = LeaveRequest.class))),
        @ApiResponse(responseCode = "400", description = "Yêu cầu không hợp lệ", content = @Content)
    })
    @PostMapping
    public ResponseEntity<Object> create(@RequestBody LeaveRequestDTO requestDTO) {
        LeaveRequest request  = LeaveRequestMapper.fromDTO(requestDTO);
        LeaveRequest createdRequest = service.createLeaveRequest(request);
        return ResponseBuilder.build(HttpStatus.OK, "Tạo thành công.", createdRequest, null);
    }

    @Operation(summary = "Lấy yêu cầu nghỉ phép theo ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lấy thành công",
                content = @Content(schema = @Schema(implementation = LeaveRequest.class))),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy", content = @Content)
    })
    // @GetMapping("/{id}")
    // public ResponseEntity<Object> get(
    //     @Parameter(description = "ID của yêu cầu nghỉ phép") @PathVariable Long id) {
    //     LeaveRequest leaveRequest = service.getLeaveRequest(id);
    //     if (leaveRequest != null) {
    //         return ResponseBuilder.build(HttpStatus.OK, "Lấy yêu cầu nghỉ phép thành công.", leaveRequest, null);
    //     } else {
    //         return ResponseBuilder.build(HttpStatus.NOT_FOUND, "Không tìm thấy yêu cầu nghỉ phép.", null, "Not Found");
    //     }
    // }
        @GetMapping("/{id}")
    public ResponseEntity<Object> get(@PathVariable Long id) {
        LeaveRequest leaveRequest = service.getLeaveRequest(id);
        if (leaveRequest != null) {
            return ResponseBuilder.build(HttpStatus.OK, "Lấy yêu cầu nghỉ phép thành công.", leaveRequest, null);
        } else {
            return ResponseBuilder.build(HttpStatus.NOT_FOUND, "Không tìm thấy yêu cầu nghỉ phép.", null, "Not Found");
        }
    }


    @Operation(summary = "Tìm kiếm các yêu cầu nghỉ phép theo mã nhân viên và trạng thái")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Tìm kiếm thành công",
                content = @Content(schema = @Schema(implementation = LeaveRequest.class)))
    })
    @GetMapping
    public ResponseEntity<Object> search(
        @Parameter(description = "Mã nhân viên") @RequestParam Long employeeId,
        @Parameter(description = "Trạng thái của yêu cầu") @RequestParam String status) {
        List<LeaveRequest> leaveRequests = service.searchLeaveRequests(employeeId, status);
        return ResponseBuilder.build(HttpStatus.OK, "Tìm kiếm yêu cầu nghỉ phép thành công.", leaveRequests, null);
    }

    @Operation(summary = "Cập nhật thông tin yêu cầu nghỉ phép")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cập nhật thành công",
                content = @Content(schema = @Schema(implementation = LeaveRequest.class))),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy yêu cầu", content = @Content)
    })
    @PutMapping("/{id}")
    public ResponseEntity<Object> update(
        @Parameter(description = "ID của yêu cầu nghỉ phép") @PathVariable Long id,
        @RequestBody UpdateLeaveRequestRequestDTO requestDTO) {
        LeaveRequest request = LeaveRequestMapper.fromDTO(requestDTO);
        LeaveRequest updatedRequest = service.updateLeaveRequest(id, request);
        return ResponseBuilder.build(HttpStatus.OK, "Cập nhật yêu cầu nghỉ phép thành công.", updatedRequest, null);
    }

    @Operation(summary = "Cập nhật trạng thái của yêu cầu nghỉ phép")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cập nhật trạng thái thành công",
                content = @Content(schema = @Schema(implementation = LeaveRequest.class)))
    })
    @PutMapping("/{id}/status")
    public ResponseEntity<Object> updateStatus(
        @Parameter(description = "ID của yêu cầu nghỉ phép") @PathVariable Long id,
        @RequestBody StatusUpdate update) {
        LeaveRequest updatedRequest = service.updateStatus(id, update.status(), update.comments());
        return ResponseBuilder.build(HttpStatus.OK, "Cập nhật trạng thái yêu cầu nghỉ phép thành công.", updatedRequest, null);
    }

    @Operation(summary = "Xoá yêu cầu nghỉ phép")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Xoá thành công"),
        @ApiResponse(responseCode = "404", description = "Không tìm thấy yêu cầu", content = @Content)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(
        @Parameter(description = "ID của yêu cầu nghỉ phép") @PathVariable Long id) {
        service.deleteLeaveRequest(id);
        return ResponseBuilder.build(HttpStatus.NO_CONTENT, "Xóa yêu cầu nghỉ phép thành công.", null, null);
    }

    public record StatusUpdate(
        @Schema(description = "Trạng thái mới của yêu cầu", example = "APPROVED") String status,
        @Schema(description = "Ghi chú khi cập nhật", example = "Đã xét duyệt") String comments
    ) {}
}
