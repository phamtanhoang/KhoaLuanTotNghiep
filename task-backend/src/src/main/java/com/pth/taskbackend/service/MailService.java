package com.pth.taskbackend.service;

import jakarta.mail.MessagingException;

public interface MailService {
    void sendEmail(String to, String name, String jobName, String jobId, String state, String templateName) throws MessagingException;
}
