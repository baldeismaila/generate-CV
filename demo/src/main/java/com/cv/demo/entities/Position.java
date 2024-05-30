package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "positions")
public class Position {
    @Id
    private String id;
    private String poste;
    private String universite;
    private String departement;
    private String anneeDebut;
    private String anneeFin;
    private String institution;
    private String equipe;
    private Encadrement.Superviseur superviseur;
    private int nombreChercheurs;

    // Constructeur par défaut
    public Position() {
    }

    // Constructeur pour les postes actuels avec des informations générales
    public Position(String poste, String universite, String departement, String anneeDebut) {
        this.poste = poste;
        this.universite = universite;
        this.departement = departement;
        this.anneeDebut = anneeDebut;
        this.anneeFin = "to date"; // À ce jour
    }

    // Constructeur pour les postes actuels avec des informations spécifiques sur le rôle et le nombre de chercheurs
    public Position(String poste, String universite, String departement, String anneeDebut, String role, int nombreChercheurs) {
        this(poste, universite, departement, anneeDebut);
        this.nombreChercheurs = nombreChercheurs;
    }

    // Constructeur pour les postes actuels avec des années de début et de fin spécifiques
    public Position(String poste, String universite, String departement, String anneeDebut, String anneeFin) {
        this(poste, universite, departement, anneeDebut);
        this.anneeFin = anneeFin;
    }

    // Constructeur pour les postes précédents avec des informations générales et le superviseur
    public Position(String poste, String universite, String departement, String anneeDebut, String anneeFin, Encadrement.Superviseur superviseur) {
        this(poste, universite, departement, anneeDebut);
        this.anneeFin = anneeFin;
        this.superviseur = superviseur;
    }

    // Constructeur pour les postes précédents avec des informations générales, le superviseur et le nombre de chercheurs
    public Position(String poste, String universite, String departement, String anneeDebut, String anneeFin, Encadrement.Superviseur superviseur, int nombreChercheurs) {
        this(poste, universite, departement, anneeDebut, anneeFin, superviseur);
        this.nombreChercheurs = nombreChercheurs;
    }

    // Getters et setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public String getUniversite() {
        return universite;
    }

    public void setUniversite(String universite) {
        this.universite = universite;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public String getAnneeDebut() {
        return anneeDebut;
    }

    public void setAnneeDebut(String anneeDebut) {
        this.anneeDebut = anneeDebut;
    }

    public String getAnneeFin() {
        return anneeFin;
    }

    public void setAnneeFin(String anneeFin) {
        this.anneeFin = anneeFin;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getEquipe() {
        return equipe;
    }

    public void setEquipe(String equipe) {
        this.equipe = equipe;
    }

    public Encadrement.Superviseur getSuperviseur() {
        return superviseur;
    }

    public void setSuperviseur(Encadrement.Superviseur superviseur) {
        this.superviseur = superviseur;
    }

    public int getNombreChercheurs() {
        return nombreChercheurs;
    }

    public void setNombreChercheurs(int nombreChercheurs) {
        this.nombreChercheurs = nombreChercheurs;
    }
}

