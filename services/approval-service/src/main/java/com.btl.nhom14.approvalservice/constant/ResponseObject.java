package com.btl.nhom14.approvalservice.constant;

public enum ResponseObject {
    APPROVAL
    ;

    @Override
    public String toString() {
        return name().charAt(0) + name().substring(1).toLowerCase();
    }
}
