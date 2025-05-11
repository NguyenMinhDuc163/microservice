package com.btl.nhom14.approvalservice.service.impl;

import com.btl.nhom14.approvalservice.dto.NotiRequest;
import com.btl.nhom14.approvalservice.service.SendApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class SendApprovalServiceImpl implements SendApprovalService {
    private final WebClient webClient;

    @Autowired
    public SendApprovalServiceImpl(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:8005").build();
    }


    @Override
    public String sendApproval(NotiRequest request) {
        Mono<String> response = webClient.post()
                .uri("/api/notifications")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class);
        return response.block();
    }
}
