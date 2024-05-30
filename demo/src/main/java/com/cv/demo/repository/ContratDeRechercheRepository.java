package com.cv.demo.repository;

import com.cv.demo.entities.ContratDeRecherche;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContratDeRechercheRepository extends MongoRepository<ContratDeRecherche, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

