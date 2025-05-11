package com.btl.nhom14.approvalservice.utils;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class TimeUtil {
    private static final String DEFAULT_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public static Timestamp getCurrentTimestamp() {
        return Timestamp.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
    }
    public static Timestamp getExpireTimestamp(int days) {
        long currentTime = System.currentTimeMillis();
        long expireTime = currentTime + (days * 24L * 60 * 60 * 1000);
        return new Timestamp(expireTime);
    }

    public static Timestamp toTimestamp(String timeString, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        LocalDateTime dateTime = LocalDateTime.parse(timeString, formatter);
        return Timestamp.valueOf(dateTime);
    }

    public static Timestamp toTimestamp(LocalDateTime dateTime) {
        return Timestamp.valueOf(dateTime);
    }

    public static String formatTimestamp(Timestamp timestamp, String pattern) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        return timestamp.toLocalDateTime().format(formatter);
    }

    public static LocalDateTime toLocalDateTime(Timestamp timestamp) {
        return timestamp.toLocalDateTime();
    }
}
