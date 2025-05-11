package com.btl.leaverequestservice.exception;

public class LeaveRequestInvalidException extends RuntimeException {
    
    public LeaveRequestInvalidException(String message) {
        super(message);
    }
}