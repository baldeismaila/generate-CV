package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "prixEtNominations")
public class PrixEtNominations {
    @Id
    private String id;
    private String annee;
    private String titre;
    private String description;
    private List<OrganisationEvenementsInternationaux.Participant> participants;

    // Constructeur avec tous les paramètres
    public PrixEtNominations(String annee, String titre, String description, List<OrganisationEvenementsInternationaux.Participant> participants) {
        this.annee = annee;
        this.titre = titre;
        this.description = description;
        this.participants = participants;
    }
    public PrixEtNominations(){}

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

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<OrganisationEvenementsInternationaux.Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<OrganisationEvenementsInternationaux.Participant> participants) {
        this.participants = participants;
    }
}
