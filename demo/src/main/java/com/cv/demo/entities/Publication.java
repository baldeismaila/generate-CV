package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "publications")
public class Publication {
    @Id
    private String id;
    private String titre;
    private String pages;
    private int annee;
    private String lien;
    private String url;
    private String school;
    private String type;
    private String volume;
    private String journal;
    private String livre;
    private String crossref;
    private List<String> auteurs;

    // Constructeur
    public Publication(){}
    public Publication(String titre, String pages, int annee, String lien, String url, String school, String type, String volume, String journal, String livre, String crossref, List<String> auteurs) {
        this.titre = titre;
        this.pages = pages;
        this.annee = annee;
        this.lien = lien;
        this.url = url;
        this.school = school;
        this.type = type;
        this.volume = volume;
        this.journal = journal;
        this.livre = livre;
        this.crossref = crossref;
        this.auteurs = auteurs;
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

    public String getPages() {
        return pages;
    }

    public void setPages(String pages) {
        this.pages = pages;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVolume() {
        return volume;
    }

    public void setVolume(String volume) {
        this.volume = volume;
    }

    public String getJournal() {
        return journal;
    }

    public void setJournal(String journal) {
        this.journal = journal;
    }

    public String getLivre() {
        return livre;
    }

    public void setLivre(String livre) {
        this.livre = livre;
    }

    public String getCrossref() {
        return crossref;
    }

    public void setCrossref(String crossref) {
        this.crossref = crossref;
    }

    public List<String> getAuteurs() {
        return auteurs;
    }

    public void setAuteurs(List<String> auteurs) {
        this.auteurs = auteurs;
    }
}
