package com.cv.demo.repository;

import com.cv.demo.entities.RelecteurDeRevues;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RelecteurDeRevuesRepository extends MongoRepository<RelecteurDeRevues, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
