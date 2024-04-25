package com.pth.taskbackend.config;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.model.meta.*;
import com.pth.taskbackend.repository.UserRepository;
import com.pth.taskbackend.service.ApplicationService;
import com.pth.taskbackend.service.CandidateService;
import com.pth.taskbackend.service.HumanResourceService;
import com.pth.taskbackend.service.MessageService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Getter
@Slf4j
public class SocketHandler extends TextWebSocketHandler {
    List<WebSocketSession> list = new ArrayList<>();
    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    HumanResourceService humanResourceService;
    @Autowired
    CandidateService candidateService;
    @Autowired
    ApplicationService applicationService;
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws IOException, InterruptedException {
        log.info("Test message {}", textMessage.toString());
        list.add(session);
        String applicationId = (String) session.getAttributes().get("applicationId");
        String email = (String) session.getAttributes().get("email");
        Optional<User>optional = userRepository.findByEmail(email);
        if(optional.isEmpty())
        {

        }
        if(applicationId.isEmpty())
        {

        }
        Optional<Application> optionalApplication= applicationService.findById(applicationId);
        Message message = new Message();

        if(optional.get().getRole().equals(ERole.HR)) {

            Optional< HumanResource>hr = humanResourceService.findByEmail(email);
            message.setSenderHR(hr.get());
            message.setReceiverCandidate(optionalApplication.get().getCandidate());
            message.setApplication(optionalApplication.get());
            message.setContent(textMessage.getPayload());
        }
        else if(optional.get().getRole().equals(ERole.CANDIDATE)){

            Optional<Candidate>candidate = candidateService.findByUserEmail(email);
            message.setSenderCandidate(candidate.get());

            message.setReceiverHR(optionalApplication.get().getJob().getHumanResource());

            message.setContent(textMessage.getPayload());

        }

        messageService.create(message);


        session.sendMessage(new TextMessage(textMessage.toString()));
        Thread.sleep(1000);
    }
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.put(session.getId(), session);
        log.info("New WebSocket session established: {}", session.getId());
        log.info("Number of connected clients: {}", sessions.size());
    }
}
