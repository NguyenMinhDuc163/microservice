package com.btl.leaveservice.model;

public class ApiResponse {
    private int code;
    private Object data;
    private String status;
    private String message;
    private String error;

    public ApiResponse(int code, Object data, String status, String message, String error) {
        this.code = code;
        this.data = data;
        this.status = status;
        this.message = message;
        this.error = error;
    }

    // Getter và Setter
    public int getCode() { return code; }
    public void setCode(int code) { this.code = code; }

    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}

