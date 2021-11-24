package com.questioner.resourceserver.persistance;

import lombok.Data;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
public class QuestionPage {
    @Size(min = 1, max = 50, message = "Question page should contains from 1 to 50 questions")
    List<Question> questions = new ArrayList<>();
}
