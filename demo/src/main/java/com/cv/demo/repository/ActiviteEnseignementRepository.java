package com.cv.demo.repository;

import com.cv.demo.entities.ActiviteEnseignement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActiviteEnseignementRepository extends MongoRepository<ActiviteEnseignement, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

