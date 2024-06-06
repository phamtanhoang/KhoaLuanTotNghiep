package com.pth.taskbackend.controller.test;

import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Message {
    private String nickname;
    private String content;
    private Date timestamp;
}
