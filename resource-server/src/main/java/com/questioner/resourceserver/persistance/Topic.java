package com.questioner.resourceserver.persistance;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
@Document
public class Topic {
    @Id
    private String id;
    @Size(min = 1, max = 20, message = "Topic should contains from 1 to 20 question pages")
    private List<QuestionPage> questionPages = new ArrayList<>();
    // Username of owner(creator) of the resource
    private String username;
}
