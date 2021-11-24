package com.questioner.resourceserver.persistance;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
public class Question {
    @NotBlank(message = "Question title is mandatory")
    private String title;
    @Size(min = 2, max = 50, message = "Question should contains from 2 to 50 answers")
    private List<Answer> answers = new ArrayList<>();
}
