package com.btl.nhom14.approvalservice.constant;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ResponseCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Invalid key", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),

    EXISTED(1002, "{entity} already exists", HttpStatus.BAD_REQUEST),
    NOT_EXISTED(1005, "{entity} not existed", HttpStatus.NOT_FOUND),

    SUCCESS (200, "Success", HttpStatus.OK),
    CREATE_SUCCESS(201, "{entity} has been created ", HttpStatus.CREATED),
    UPDATE_SUCCESS(201, "{entity} has been updated ", HttpStatus.OK),
    OUT_OF_STOCK(1009, "{entity} out of stock ", HttpStatus.BAD_REQUEST),
    INVALID_QUANTITY(1009, "{entity} quantity invalid ", HttpStatus.BAD_REQUEST),
    CANNOT_DELETE_RETURNED_BORROW(1011, "cant not delete returned borrowed ", HttpStatus.BAD_REQUEST),
    ;


    ResponseCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private String message;
    private final HttpStatusCode statusCode;

    public String getMessage(ResponseObject responseObject) {
        return message.replace("{entity}", responseObject.toString());
    }

    public void setMessage(ResponseObject responseObject) {
        this.message = message.replace("{entity}", responseObject.toString());
    }

}
