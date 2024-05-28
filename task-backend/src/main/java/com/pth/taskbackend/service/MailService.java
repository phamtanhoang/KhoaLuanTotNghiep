package com.pth.taskbackend.service;

import jakarta.mail.MessagingException;

public interface MailService {
    void sendEmail(String to, String user, String body, String templateName) throws MessagingException;
}
