package com.cv.demo.repository;

import com.cv.demo.entities.Enseignant;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EnseignantRepository extends MongoRepository<Enseignant, String> {
    Optional<Enseignant> findByEmail(String email);
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}