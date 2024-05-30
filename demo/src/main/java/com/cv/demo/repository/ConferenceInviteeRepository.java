package com.cv.demo.repository;

import com.cv.demo.entities.ConferenceInvitee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ConferenceInviteeRepository extends MongoRepository<ConferenceInvitee, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
