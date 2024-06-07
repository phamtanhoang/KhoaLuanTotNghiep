package com.pth.taskbackend.service;

import jakarta.mail.MessagingException;

public interface MailService {
    void sendEmail(String to, String user, String body, String templateName) throws MessagingException;

    void sendEmailV2(String to, String user, String employer,String avatar,String jobId,String job,String location,String salary, String templateName) throws MessagingException;

}
