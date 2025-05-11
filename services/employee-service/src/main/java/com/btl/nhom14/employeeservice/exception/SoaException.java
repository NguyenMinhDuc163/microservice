package com.btl.nhom14.employeeservice.exception;

import com.btl.nhom14.employeeservice.constant.ResponseCode;
import com.btl.nhom14.employeeservice.constant.ResponseObject;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SoaException extends RuntimeException {
    private ResponseCode responseCode;
    private ResponseObject responseObject;
    private String message;


    public SoaException(ResponseCode responseCode, ResponseObject responseObject) {
        super(responseCode.getMessage().replace("{entity}", responseObject.toString()));
        this.responseCode = responseCode;
        this.responseObject = responseObject;
    }
}
