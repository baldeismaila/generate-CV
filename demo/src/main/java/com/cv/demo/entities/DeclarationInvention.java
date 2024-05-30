package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "declarationInventions")
public class DeclarationInvention {
    @Id
    private String id;
    private String annee;
    private String nomInvention;
    private String description;
    private String statut;

    // Constructeur avec tous les champs
    public DeclarationInvention(String annee, String nomInvention, String description, String statut) {
        this.annee = annee;
        this.nomInvention = nomInvention;
        this.description = description;
        this.statut = statut;
    }

    // Constructeur sans le champ de statut
    public DeclarationInvention(String annee, String nomInvention, String description) {
        this.annee = annee;
        this.nomInvention = nomInvention;
        this.description = description;
    }
    public  DeclarationInvention(){}

    // Getters et Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public String getNomInvention() {
        return nomInvention;
    }

    public void setNomInvention(String nomInvention) {
        this.nomInvention = nomInvention;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }
}
