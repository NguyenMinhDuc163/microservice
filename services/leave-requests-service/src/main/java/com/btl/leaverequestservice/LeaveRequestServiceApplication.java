package com.btl.leaverequestservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class LeaveRequestServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeaveRequestServiceApplication.class, args);
	}

}
