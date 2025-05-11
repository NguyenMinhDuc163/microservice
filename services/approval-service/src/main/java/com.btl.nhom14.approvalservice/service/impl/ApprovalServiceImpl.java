package com.btl.nhom14.approvalservice.service.impl;

import com.btl.nhom14.approvalservice.constant.EStatusApproval;
import com.btl.nhom14.approvalservice.constant.ResponseCode;
import com.btl.nhom14.approvalservice.constant.ResponseObject;
import com.btl.nhom14.approvalservice.dto.ApprovalDTO;
import com.btl.nhom14.approvalservice.dto.BaseRequest;
import com.btl.nhom14.approvalservice.exception.SoaException;
import com.btl.nhom14.approvalservice.model.Approval;
import com.btl.nhom14.approvalservice.repository.ApprovalRepository;
import com.btl.nhom14.approvalservice.service.ApprovalService;
import com.btl.nhom14.approvalservice.service.SendApprovalService;
import com.btl.nhom14.approvalservice.utils.TimeUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.kafka.annotation.KafkaListener;


@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {
    private final ApprovalRepository approvalRepository;
    private final ModelMapper modelMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;
    @Override
    public ApprovalDTO getApprovalById(Long approvalId) {
        Approval approval = approvalRepository.findById(approvalId).orElseThrow(
                () -> new SoaException(ResponseCode.NOT_EXISTED, ResponseObject.APPROVAL)
        );
        return modelMapper.map(approval, ApprovalDTO.class);
    }

    @Override
    public ApprovalDTO saveApproval(BaseRequest dto) {
        Approval approval = modelMapper.map(dto, Approval.class);
//        EmployeeResponse =
        approval.setApprovalStatus(EStatusApproval.PENDING);

        Approval approvalSaved = approvalRepository.save(approval);
//        sendApprovalService.sendApproval(
//                new NotiRequest(
//                        approvalSaved.getSenderId(),
//                        "EMPLOYEE",
//                        "Yêu cầu nghỉ phép của bạn đã được gửi đi",
//                        "PENDING",
//                        approvalSaved.getLeaveRequestId(),
//                        "APP"));
        return modelMapper.map(approvalSaved, ApprovalDTO.class);
    }

    @Override
    public ApprovalDTO approveApproval(BaseRequest request) {
        Approval approval = new Approval();

        approval.setApprovalStatus(EStatusApproval.APPROVED);
        approval.setComments(request.getComments());
        approval.setManagerId(request.getManagerId());
        approval.setLeaveRequestId(request.getLeaveRequestId());
        approval.setApprovalAt(TimeUtil.getCurrentTimestamp());
        Approval updateApproval = approvalRepository.save(approval);

        // send message to topic of kafka
        String message = request.getLeaveRequestId() + " " + EStatusApproval.APPROVED;
        kafkaTemplate.send("leave_request_service", message);

        return modelMapper.map(updateApproval, ApprovalDTO.class);
    }

    @Override
    public ApprovalDTO rejectApproval(BaseRequest request) {

        Approval approval = new Approval();

        approval.setApprovalStatus(EStatusApproval.REJECTED);
        approval.setComments(request.getComments());
        approval.setManagerId(request.getManagerId());
        approval.setLeaveRequestId(request.getLeaveRequestId());
        approval.setRejectedAt(TimeUtil.getCurrentTimestamp());
        Approval updateApproval = approvalRepository.save(approval);

        // send message to topic of kafka
        String message = request.getLeaveRequestId() + " " + EStatusApproval.REJECTED;
        kafkaTemplate.send("leave_request_service", message);

        return modelMapper.map(updateApproval, ApprovalDTO.class);
    }

    @Override
    @KafkaListener(topics = "approval_topic", groupId = "leave-request-group")
    public void checkConsumer(String request) {
        System.out.println("Received message: " + request);
    }
}
