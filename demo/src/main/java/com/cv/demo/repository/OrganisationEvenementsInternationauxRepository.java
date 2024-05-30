package com.cv.demo.repository;

import com.cv.demo.entities.OrganisationEvenementsInternationaux;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrganisationEvenementsInternationauxRepository extends MongoRepository<OrganisationEvenementsInternationaux, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

