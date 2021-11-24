package com.questioner.resourceserver.web.api.response;

import lombok.Data;

@Data
public class MessageResponse {
    private final String message;


    public MessageResponse(String message) {
        this.message = message;
    }
}
