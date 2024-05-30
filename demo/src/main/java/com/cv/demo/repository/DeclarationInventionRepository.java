package com.cv.demo.repository;

import com.cv.demo.entities.DeclarationInvention;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeclarationInventionRepository extends MongoRepository<DeclarationInvention, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

