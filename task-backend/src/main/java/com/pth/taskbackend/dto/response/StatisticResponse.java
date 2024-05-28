package com.pth.taskbackend.dto.response;

import java.util.List;
import java.util.Map;

public record StatisticResponse(List<Map<String, Object>> line,  List<Map<String, Object>> donut) {
}
