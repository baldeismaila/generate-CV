package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "relecteurDeRevues")
public class RelecteurDeRevues {
    @Id
    private String id;
    private String titreRevue;
    private String dateDebut;
    private String dateFin;

    // Constructeur prenant en compte toutes les informations
    public RelecteurDeRevues(String titreRevue, String dateDebut, String dateFin) {
        this.titreRevue = titreRevue;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }
    public RelecteurDeRevues(){}

    // Getters et Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitreRevue() {
        return titreRevue;
    }

    public void setTitreRevue(String titreRevue) {
        this.titreRevue = titreRevue;
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
