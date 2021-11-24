package com.questioner.resourceserver.persistance;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TopicRepository extends MongoRepository<Topic, String> {
    Iterable<Topic> findAllByUsername(String username);
    Optional<Topic> findByUsername(String username);
    Optional<Topic> findByUsernameAndId(String username, String id);
    void deleteAllByUsername(String username);
    void deleteByIdAndUsername(String id, String username);
}
