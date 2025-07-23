package com.ProjectHR.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendStatusUpdateEmail(String to, String workerName, String status) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your Application Status Update");
        String body;
        if ("APPROVED".equalsIgnoreCase(status)) {
            body = "Hello " + workerName
                    + ",\n\nCongratulations! You have been approved. You will start your new life!\n\nBest regards,\nHR Team. B001";
        } else if ("REJECTED".equalsIgnoreCase(status)) {
            body = "Hello " + workerName
                    + ",\n\nWe regret to inform you that your application was rejected. Git gud.\n\nBest regards,\nHR Team. B002";
        } else {
            body = "Hello " + workerName + ",\n\nYour application status has been updated to: " + status
                    + ".\n\nBest regards,\nHR Team. B003";
        }
        message.setText(body);
        mailSender.send(message);
    }
}
