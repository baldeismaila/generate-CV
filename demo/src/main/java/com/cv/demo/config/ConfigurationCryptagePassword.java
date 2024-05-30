package com.cv.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ConfigurationCryptagePassword {

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        // Utilisation d'une force de cryptage par défaut (10)
        return new BCryptPasswordEncoder();
    }
}
