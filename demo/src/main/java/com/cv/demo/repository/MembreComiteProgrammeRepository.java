package com.cv.demo.repository;

import com.cv.demo.entities.MembreComiteProgramme;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MembreComiteProgrammeRepository extends MongoRepository<MembreComiteProgramme, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

