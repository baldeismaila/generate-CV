package com.cv.demo.repository;

import com.cv.demo.entities.Position;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PositionRepository extends MongoRepository<Position, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
