package com.questioner.resourceserver.persistance;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class Answer {
    @NotBlank(message = "Answer is mandatory")
    private String text;
}
