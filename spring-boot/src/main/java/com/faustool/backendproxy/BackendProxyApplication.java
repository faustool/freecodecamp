package com.faustool.backendproxy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class BackendProxyApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendProxyApplication.class, args);
    }

    @Bean
    public RestOperations getRestOperations() {
        return new RestTemplate();
    }
}
