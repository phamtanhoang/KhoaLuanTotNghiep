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
    public void sendEmail(String to, String user, String body, String templateName)
            throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariable("user", user);
        context.setVariable("body", body);
        String html = templateEngine.process(templateName, context);

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject("JOOBS THÔNG BÁO");
        helper.setText(html, true);

        mailSender.send(message);
    }

    @Override
    public void sendEmailV2(String to, String user, String employer,String avatar,String jobId, String job,String location,String salary, String templateName)
            throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

        Context context = new Context();
        context.setVariable("user", user);
        context.setVariable("employer", employer);
        context.setVariable("avatar", avatar);
        context.setVariable("job", job);
        context.setVariable("jobId", jobId);
        context.setVariable("location", location);
        context.setVariable("salary", salary);
        String html = templateEngine.process(templateName, context);

        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject("JOOBS THÔNG BÁO");
        helper.setText(html, true);

        mailSender.send(message);
    }
}
