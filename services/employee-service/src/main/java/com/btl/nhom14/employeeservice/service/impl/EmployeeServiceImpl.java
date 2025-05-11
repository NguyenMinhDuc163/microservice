package com.btl.nhom14.employeeservice.service.impl;

import com.btl.nhom14.employeeservice.constant.ResponseCode;
import com.btl.nhom14.employeeservice.constant.ResponseObject;
import com.btl.nhom14.employeeservice.dto.EmployeeDTO;
import com.btl.nhom14.employeeservice.entity.Employee;
import com.btl.nhom14.employeeservice.exception.SoaException;
import com.btl.nhom14.employeeservice.repository.EmployeeRepository;
import com.btl.nhom14.employeeservice.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public EmployeeDTO getEmployeeById(long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(
                () -> new SoaException(ResponseCode.NOT_EXISTED, ResponseObject.EMPLOYEE)
        );
        return modelMapper.map(employee, EmployeeDTO.class);
    }

    @Override
    public EmployeeDTO getManagerByEmployeeId(Long employeeId) {

        return employeeRepository
                .findManagerByEmployeeId(employeeId)
                .orElseThrow(
                () -> new SoaException(ResponseCode.NOT_EXISTED, ResponseObject.EMPLOYEE)
        );
    }
    @Override
    public void sendMessage(String message) {
        kafkaTemplate.send("approval_topic", message);
    }

    @Override
    public List<Long> getListEmployeeByManagerId(Long managerId) {
        List<EmployeeDTO> list = employeeRepository.findAllByManagerId(managerId);
        List<Long> ids = new ArrayList<>();
        for (EmployeeDTO employee : list) {
            ids.add(employee.getEmployeeId());
        }
        return ids;
    }

    @Override
    public List<EmployeeDTO> getAll() {
        return employeeRepository.findAll()
                .stream()
                .filter(employee -> employee.getEmployeeId() != 1L)
                .map(item -> modelMapper.map(item, EmployeeDTO.class))
                .collect(Collectors.toList());
    }

}
