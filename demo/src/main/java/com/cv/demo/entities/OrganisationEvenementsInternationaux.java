package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "organisationEvenementsInternationaux")
public class OrganisationEvenementsInternationaux {
    @Id
    private String id;
    private String titre;
    private String dateDebut;
    private String dateFin;
    private List<Participant> participants;
    private String details;

    // Constructeur avec tous les paramètres
    public OrganisationEvenementsInternationaux(String titre, String dateDebut, String dateFin, List<Participant> participants, String details) {
        this.titre = titre;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.participants = participants;
        this.details = details;
    }
    public OrganisationEvenementsInternationaux(){}

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

    public List<Participant> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Participant> participants) {
        this.participants = participants;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public static class Participant {
        private String nom;
        private String prenom;
        private String statut;
        private String affiliation;

        // Constructeur avec tous les paramètres

        public Participant(){}
        public Participant(String nom, String prenom, String statut, String affiliation) {
            this.nom = nom;
            this.prenom = prenom;
            this.statut = statut;
            this.affiliation = affiliation;
        }

        public Participant(String nom, String prenom, String statut) {
            this.nom = nom;
            this.prenom = prenom;
            this.statut = statut;
        }

        // Getters et setters
        public String getNom() {
            return nom;
        }

        public void setNom(String nom) {
            this.nom = nom;
        }

        public String getPrenom() {
            return prenom;
        }

        public void setPrenom(String prenom) {
            this.prenom = prenom;
        }

        public String getStatut() {
            return statut;
        }

        public void setStatut(String statut) {
            this.statut = statut;
        }

        public String getAffiliation() {
            return affiliation;
        }

        public void setAffiliation(String affiliation) {
            this.affiliation = affiliation;
        }

    }

}