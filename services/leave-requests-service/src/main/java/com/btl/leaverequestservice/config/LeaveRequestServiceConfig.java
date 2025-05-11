package com.btl.leaverequestservice.config;

// import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
// @EnableFeignClients(basePackages = "com.btl.leaverequestservice.client")
public class LeaveRequestServiceConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}