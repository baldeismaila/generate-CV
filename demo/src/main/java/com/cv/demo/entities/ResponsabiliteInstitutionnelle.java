package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "responsabiliteInstitutionnelles")
public class ResponsabiliteInstitutionnelle {
    @Id
    private String id;
    private String titre;
    private String institution;
    private String details;
    private String dateDebut;
    private String dateFin;

    public ResponsabiliteInstitutionnelle(String titre, String institution, String details, String dateDebut, String dateFin) {
        this.titre = titre;
        this.institution = institution;
        this.details = details;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
    }

    public ResponsabiliteInstitutionnelle(){}

    // Getters et setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
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

