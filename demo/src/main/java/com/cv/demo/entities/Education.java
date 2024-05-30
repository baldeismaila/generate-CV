package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "educations")
public class Education {
    @Id
    private String id;
    private String diplome;
    private String domaine;
    private String universite;
    private String sujet;
    private Encadrement.Superviseur superviseur;
    private String financement;
    private String dateDebut;
    private String dateFin;

    // Constructeur avec tous les champs
    public Education(String diplome, String domaine, String universite, String sujet, Encadrement.Superviseur superviseur, String financement, String dateDebut, String dateFin) {
        this.diplome = diplome;
        this.domaine = domaine;
        this.universite = universite;
        this.sujet = sujet;
        this.superviseur = superviseur;
        this.financement = financement;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
    public  Education(){}

    // Getters et setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDiplome() {
        return diplome;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getUniversite() {
        return universite;
    }

    public void setUniversite(String universite) {
        this.universite = universite;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public Encadrement.Superviseur getSuperviseur() {
        return superviseur;
    }

    public void setSuperviseur(Encadrement.Superviseur superviseur) {
        this.superviseur = superviseur;
    }

    public String getFinancement() {
        return financement;
    }

    public void setFinancement(String financement) {
        this.financement = financement;
    }

    public String getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(String dateDebut) {
        this.dateDebut = dateDebut;
    }

    public String getDateFin() {
        return dateFin;
    }

    public void setDateFin(String dateFin) {
        this.dateFin = dateFin;
    }
}

