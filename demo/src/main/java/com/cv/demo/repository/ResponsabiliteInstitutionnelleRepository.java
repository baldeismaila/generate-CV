package com.cv.demo.repository;

import com.cv.demo.entities.ResponsabiliteInstitutionnelle;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResponsabiliteInstitutionnelleRepository extends MongoRepository<ResponsabiliteInstitutionnelle, String> {
    // Ajoutez des méthodes personnalisées si nécessaire
}

