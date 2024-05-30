package com.cv.demo.repository;

import com.cv.demo.entities.PrixEtNominations;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PrixEtNominationsRepository extends MongoRepository<PrixEtNominations, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

