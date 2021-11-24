package com.questioner.resourceserver.web.api;

import com.questioner.resourceserver.persistance.Topic;
import com.questioner.resourceserver.persistance.TopicRepository;
import com.questioner.resourceserver.persistance.auth.User;
import com.questioner.resourceserver.persistance.auth.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/topics")
@Slf4j
public class TopicController {

    private final TopicRepository topicRepository;

    private final UserRepository userRepository;

    @Autowired
    public TopicController(TopicRepository topicRepository,
                           UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getTopicsByPrincipal(Principal principal){
        String username = principal.getName();
        if(userRepository.existsByUsername(username)){
            ArrayList<Topic> topics = new ArrayList<>();
            Iterable<Topic> topicsFromDb = topicRepository.findAllByUsername(username);
            topicsFromDb.forEach(topics::add);
            return ResponseEntity.ok(topics);
        }
        return ResponseEntity.badRequest().body("User is not registered");
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getTopicByPrincipal(@PathVariable String id,
                          Principal principal){
        String username = principal.getName();
        Optional<Topic> topic = topicRepository.findByUsernameAndId(username, id);
        if (topic.isEmpty()){
            return ResponseEntity.badRequest().body("Resource not found.");
        }
        return ResponseEntity.ok(topic.get());
    }


    @PostMapping
    public ResponseEntity<?> saveTopicByPrincipal(@RequestBody @Valid Topic topic,
                                       Principal principal){
        String username = principal.getName();
        topic.setUsername(username);
        topicRepository.save(topic);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTopicsByPrincipal(Principal principal){
        String username = principal.getName();
        topicRepository.deleteAllByUsername(username);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTopicByPrincipal(@PathVariable String id,
                                         Principal principal){
        String username = principal.getName();
        topicRepository.deleteByIdAndUsername(id, username);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateTopicByPrincipal(@RequestBody Topic topic,
                                         @PathVariable String id,
                                         Principal principal){
        String username = principal.getName();
        Optional<Topic> topicFromDbOpt = topicRepository.findByUsernameAndId(username, id);
        if (topicFromDbOpt.isEmpty()){
            return ResponseEntity.badRequest().body("Resource not found.");
        }
        Topic topicFromDb = topicFromDbOpt.get();
        if(topic.getQuestionPages() != null){
            topicFromDb.setQuestionPages(topic.getQuestionPages());
        }
        topicRepository.save(topicFromDb);

        return ResponseEntity.ok().body(topicFromDb);
    };
}
