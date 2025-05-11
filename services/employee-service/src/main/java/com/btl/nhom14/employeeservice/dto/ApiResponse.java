package com.btl.nhom14.employeeservice.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import com.btl.nhom14.employeeservice.constant.ResponseCode;
import com.btl.nhom14.employeeservice.constant.ResponseObject;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
    @Builder.Default
    private int code = ResponseCode.SUCCESS.getCode();
    @Builder.Default
    private String message = ResponseCode.SUCCESS.getMessage();
    @Builder.Default
    private String status = ResponseCode.SUCCESS.getMessage();
    private T data;
    private String error;


    public void setMessage(ResponseCode responseCode, ResponseObject responseObject) {
        this.message = responseCode.getMessage().replace("{entity}", responseObject.toString());
    }
    public void setMessage(ResponseCode responseCode) {
        this.message = responseCode.getMessage();
    }
    public ApiResponse(ResponseCode responseCode, T data) {
        this.code = responseCode.getCode();
        this.message = responseCode.getMessage();
        this.data = data;
    }

    public ApiResponse(ResponseCode responseCode, ResponseObject responseObject, T data) {
        this.code = responseCode.getCode();
        this.message = responseCode.getMessage().replace("{entity}", responseObject.toString());
        this.data = data;
    }

}
