package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.Vip;

import java.time.LocalDateTime;

public record TrasactionReponse(String id,
                                LocalDateTime created,
                                LocalDateTime updated,
                                LocalDateTime fromDate,
                                LocalDateTime toDate,
                                Long price,
                                String invoice_id,
                                Vip vip,
                                Employer employer
                                ) {
}
