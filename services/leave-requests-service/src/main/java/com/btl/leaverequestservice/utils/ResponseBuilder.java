package com.btl.leaverequestservice.utils;

import com.btl.leaverequestservice.model.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseBuilder {

    public static ResponseEntity<Object> build(HttpStatus status, String message, Object data, String error) {
        ApiResponse response = new ApiResponse(
                status.value(),
                data,
                status.getReasonPhrase(),
                message,
                error
        );
        return ResponseEntity.status(status).body(response);
    }
}
