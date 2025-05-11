package com.btl.nhom14.employeeservice.constant;

public enum ResponseObject {
    EMPLOYEE, DEPARTMENT, POSITION
    ;

    @Override
    public String toString() {
        return name().charAt(0) + name().substring(1).toLowerCase();
    }
}
