package com.pth.taskbackend.dto.response;

public record TopCategoriesResponse(String id, String name, byte[] image, long count) {
}
