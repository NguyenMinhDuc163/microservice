package com.btl.nhom14.employeeservice.exception;

import com.btl.nhom14.employeeservice.dto.ApiResponse;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import com.btl.nhom14.employeeservice.constant.ResponseCode;
import com.btl.nhom14.employeeservice.constant.ResponseObject;

import java.nio.file.AccessDeniedException;
import java.util.Map;
import java.util.Objects;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {
        log.error("Exception: ", exception);
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ResponseCode.UNCATEGORIZED_EXCEPTION.getCode());
//        apiResponse.setMessage(ResponseCode.UNCATEGORIZED_EXCEPTION.getMessage());
        apiResponse.setMessage(ResponseCode.UNCATEGORIZED_EXCEPTION);


        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = SoaException.class)
    ResponseEntity<ApiResponse> handlingThucTapException(SoaException exception) {
        ResponseCode responseCode = exception.getResponseCode();
        ResponseObject responseObject = exception.getResponseObject();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(responseCode.getCode());
//        apiResponse.setMessage(responseCode.getMessage());
        apiResponse.setMessage(responseCode, responseObject);

        return ResponseEntity.status(responseCode.getStatusCode()).body(apiResponse);
    }

    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse> handlingAccessDeniedException(AccessDeniedException exception) {
        ResponseCode responseCode = ResponseCode.UNAUTHORIZED;

        return ResponseEntity.status(responseCode.getStatusCode())
                .body(ApiResponse.builder()
                        .code(responseCode.getCode())
                        .message(responseCode.getMessage())
                        .build());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();

        ResponseCode responseCode = ResponseCode.INVALID_KEY;
        Map<String, Object> attributes = null;
        try {
            responseCode = ResponseCode.valueOf(enumKey);

            var constraintViolation =
                    exception.getBindingResult().getAllErrors().get(0).unwrap(ConstraintViolation.class);

            attributes = constraintViolation.getConstraintDescriptor().getAttributes();

            log.info(attributes.toString());

        } catch (IllegalArgumentException e) {

        }

        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(responseCode.getCode());
        apiResponse.setMessage(
                Objects.nonNull(attributes)
                        ? ResponseCode.valueOf(mapAttribute(responseCode.getMessage(), attributes))
                        : responseCode);
        return ResponseEntity.badRequest().body(apiResponse);
    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
    }
}
