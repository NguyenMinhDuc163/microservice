package com.btl.leaverequestservice.client;

import com.btl.leaverequestservice.dto.GenericResponse;
import com.btl.leaverequestservice.dto.NotificationRequest;
import com.btl.leaverequestservice.dto.NotificationResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service", url = "${service.notification.url}")
public interface NotificationServiceClient {

    @PostMapping("/api/notifications")
    GenericResponse<NotificationResponse> sendNotification(@RequestBody NotificationRequest request);
}