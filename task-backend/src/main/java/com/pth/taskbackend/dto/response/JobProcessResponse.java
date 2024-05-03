package com.pth.taskbackend.dto.response;

import java.util.List;

public record JobProcessResponse(String id,
                                String name,
                                List<StepResponse> steps){
}
