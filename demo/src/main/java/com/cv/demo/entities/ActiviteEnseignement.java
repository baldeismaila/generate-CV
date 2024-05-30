package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "activiteEnseignements")
public class ActiviteEnseignement {
    @Id
    private String id;
    private String titre;
    private String description;
    private String anneeDebut;
    private String anneeFin;
    private String universite;
    private String pays;

    public ActiviteEnseignement(String titre, String description, String anneeDebut, String anneeFin, String universite, String pays) {
        this.titre = titre;
        this.description = description;
        this.anneeDebut = anneeDebut;
        this.anneeFin = anneeFin;
        this.universite = universite;
        this.pays = pays;
    }

    // Constructeur par défaut
    public ActiviteEnseignement() {
    }

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

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getUniversite() {
        return universite;
    }

    public void setUniversite(String universite) {
        this.universite = universite;
    }

    public String getDepartement() {
        return pays;
    }

    public void setDepartement(String pays) {
        this.pays = pays;
    }

}

