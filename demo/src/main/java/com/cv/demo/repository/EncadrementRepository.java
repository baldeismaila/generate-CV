package com.cv.demo.repository;

import com.cv.demo.entities.Encadrement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EncadrementRepository extends MongoRepository<Encadrement, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

