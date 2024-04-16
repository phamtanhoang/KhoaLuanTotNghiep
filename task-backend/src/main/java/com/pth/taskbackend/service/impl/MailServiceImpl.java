package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@RequiredArgsConstructor
@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private final JavaMailSender mailSender;


    @Value("${spring.mail.username}")  // Assuming you have your email configured in application.properties
    private String fromEmail;
    @Autowired
    private SpringTemplateEngine templateEngine;


    @Override
    public void sendEmail(String to, String name, String jobName, String jobId , String state, String templateName)
            throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("jobName", jobName);
        context.setVariable("jobId", jobId);
        context.setVariable("state", state);
        String html = templateEngine.process(templateName, context);

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject("JOBS THÔNG BÁO");
        helper.setText(html, true);

        mailSender.send(message);
    }
}
