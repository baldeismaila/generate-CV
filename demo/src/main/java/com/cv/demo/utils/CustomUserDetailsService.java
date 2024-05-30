package com.cv.demo.utils;

import com.cv.demo.entities.Enseignant;
import com.cv.demo.repository.EnseignantRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final EnseignantRepository enseignantRepository;

    public CustomUserDetailsService(EnseignantRepository enseignantRepository) {
        this.enseignantRepository = enseignantRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findByEmail(username);
        if (enseignantOptional.isEmpty()) {
            throw new UsernameNotFoundException("Aucun enseignant ne correspond à cet identifiant: " + username);
        }
        Enseignant enseignant = enseignantOptional.get();
        return new CustomUserDetails(enseignant.getId(), enseignant.getPrenom(), enseignant.getNom(), enseignant.getEmail(), enseignant.getPassword(), enseignant.getRole());
    }
}

