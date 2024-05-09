package com.pth.taskbackend.config;

import com.pth.taskbackend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.HandshakeInterceptor;
import java.util.Map;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }
//    @Autowired
//    private JwtService jwtService;
//
//    @Override
//    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//        registry.addHandler(myHandler(), "/ws/{applicationId}")
//                .addInterceptors(new JwtHandshakeInterceptor());
//    }
//
//    @Bean
//    public SocketHandler myHandler() {
//        return new SocketHandler();
//    }
//
//    public class JwtHandshakeInterceptor implements HandshakeInterceptor {
//
//        private String extractApplicationId(String path) {
//            // Trích xuất chatBoxId từ URL
//            String[] pathSegments = path.split("/");
//            if (pathSegments.length > 2) {
//                return pathSegments[2];
//            }
//            return null;
//        }
//
//        @Override
//        public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, org.springframework.web.socket.WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
//            HttpHeaders headers = request.getHeaders();
//            String token = headers.getFirst("Authorization").substring(7);
//
//            if (token != null && jwtService.validateToken(token)) {
//                String applicationId = extractApplicationId(request.getURI().getPath());
//                attributes.put("email", jwtService.extractUsername(token));
//                attributes.put("applicationId", applicationId);
//                return true;
//            } else {
//                return false;
//            }
//        }
//
//        @Override
//        public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, org.springframework.web.socket.WebSocketHandler wsHandler, Exception exception) {
//
//        }
//    }
}
