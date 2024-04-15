package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EMessage;

public record MessageResponse (String content, String applicationId, EMessage type){
}
