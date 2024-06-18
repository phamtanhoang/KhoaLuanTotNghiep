package com.pth.taskbackend.dto.response;

import java.util.List;

public record ApplicationDetailForCandidateResponse(String id,
                                                    String fullName,
                                                    String email,
                                                    String phoneNumber,
                                                    String letter,
                                                    String cV,
                                                    List<ApplicationStepResponse> steps) {
}