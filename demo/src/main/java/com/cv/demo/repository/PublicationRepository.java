package com.cv.demo.repository;

import com.cv.demo.entities.Publication;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublicationRepository extends MongoRepository<Publication, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
