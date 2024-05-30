package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "membreComiteProgrammes")
public class MembreComiteProgramme {
    @Id
    private String id;
    private String conference;
    private String dateDebut;
    private String dateFin;

    // Constructeur par défaut
    public MembreComiteProgramme() {}

    // Constructeur avec tous les champs
    public MembreComiteProgramme(String conference, String role, String depuisAnnee, String dateDebut, String dateFin) {
        this.conference = conference;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    // Getters et setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getConference() {
        return conference;
    }

    public void setConference(String conference) {
        this.conference = conference;
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
