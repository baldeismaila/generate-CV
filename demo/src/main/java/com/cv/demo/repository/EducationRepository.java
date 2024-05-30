package com.cv.demo.repository;

import com.cv.demo.entities.Education;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EducationRepository extends MongoRepository<Education, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

