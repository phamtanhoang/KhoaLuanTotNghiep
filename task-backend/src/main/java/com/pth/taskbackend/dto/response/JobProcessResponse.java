package com.pth.taskbackend.dto.response;

import java.util.List;

public record JobProcessResponse(String processId,
                                String processName,
                                List<StepResponse> steps){
}
