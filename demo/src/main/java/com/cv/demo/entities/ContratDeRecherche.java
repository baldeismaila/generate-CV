package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "contratDeRecherches")
public class ContratDeRecherche {
    @Id
    private String id;
    private String nom;
    private String titre;
    private String sponsor;
    private String montantTotal;
    private String montantPourEquipe;
    private String periodeDebut;
    private String periodeFin;
    private String implication;

    public ContratDeRecherche(String nom, String titre, String sponsor, String montantTotal, String montantPourEquipe, String periodeDebut, String periodeFin, String implication) {
        this.nom = nom;
        this.titre = titre;
        this.sponsor = sponsor;
        this.montantTotal = montantTotal;
        this.montantPourEquipe = montantPourEquipe;
        this.periodeDebut = periodeDebut;
        this.periodeFin = periodeFin;
        this.implication = implication;
    }

    public ContratDeRecherche(){}

    // Getters et setters


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getSponsor() {
        return sponsor;
    }

    public void setSponsor(String sponsor) {
        this.sponsor = sponsor;
    }

    public String getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(String montantTotal) {
        this.montantTotal = montantTotal;
    }

    public String getMontantPourEquipe() {
        return montantPourEquipe;
    }

    public void setMontantPourEquipe(String montantPourEquipe) {
        this.montantPourEquipe = montantPourEquipe;
    }

    public String getPeriodeDebut() {
        return periodeDebut;
    }

    public void setPeriodeDebut(String periodeDebut) {
        this.periodeDebut = periodeDebut;
    }

    public String getPeriodeFin() {
        return periodeFin;
    }

    public void setPeriodeFin(String periodeFin) {
        this.periodeFin = periodeFin;
    }

    public String getImplication() {
        return implication;
    }

    public void setImplication(String implication) {
        this.implication = implication;
    }
}

