package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "encadrements")
public class Encadrement {
    @Id
    private String id;
    private String nom;
    private String statut;
    private String dateDebut;
    private String dateFin;
    private String projet;
    private String financement;
    private List<Superviseur> superviseurs;
    private String emploiActuel;

    public Encadrement(){}

    public Encadrement(String nom, String statut, String dateDebut, String dateFin, String projet, String financement, List<Superviseur> superviseurs, String emploiActuel) {
        this.nom = nom;
        this.statut = statut;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.projet = projet;
        this.financement = financement;
        this.superviseurs = superviseurs;
        this.emploiActuel = emploiActuel;
    }

    public Encadrement(String id, String nom, String statut, String dateDebut, String dateFin, String projet, String financement, String emploiActuel) {
        this.id = id;
        this.nom = nom;
        this.statut = statut;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.projet = projet;
        this.financement = financement;
        this.emploiActuel = emploiActuel;
    }

    // Getters, setters, etc.


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

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
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

    public String getProjet() {
        return projet;
    }

    public void setProjet(String projet) {
        this.projet = projet;
    }

    public String getFinancement() {
        return financement;
    }

    public void setFinancement(String financement) {
        this.financement = financement;
    }

    public List<Superviseur> getSuperviseurs() {
        return superviseurs;
    }

    public void setSuperviseurs(List<Superviseur> superviseurs) {
        this.superviseurs = superviseurs;
    }

    public String getEmploiActuel() {
        return emploiActuel;
    }

    public void setEmploiActuel(String emploiActuel) {
        this.emploiActuel = emploiActuel;
    }

    // Classe imbriquée pour représenter les superviseurs avec leur pourcentage de financement
    public static class Superviseur {
        private String nom;
        private String prenom;
        private String statut;
        private int pourcentageFinancement;

        public Superviseur(String nom, String prenom, String statut, int pourcentageFinancement) {
            this.nom = nom;
            this.prenom = prenom;
            this.statut = statut;
            this.pourcentageFinancement = pourcentageFinancement;
        }

        public Superviseur(String nom, String prenom, String statut) {
            this.nom = nom;
            this.prenom = prenom;
            this.statut = statut;
        }

        public Superviseur(){}

        // Getters, setters, etc.

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

        public int getPourcentageFinancement() {
            return pourcentageFinancement;
        }

        public void setPourcentageFinancement(int pourcentageFinancement) {
            this.pourcentageFinancement = pourcentageFinancement;
        }
    }
}
