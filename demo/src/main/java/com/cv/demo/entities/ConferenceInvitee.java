package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "conferenceInvitees")
public class ConferenceInvitee {
    @Id
    private String id;
    private String date;
    private String description;
    private String lieu;

    // Constructeur avec tous les champs
    public ConferenceInvitee(String date, String description, String lieu) {
        this.date = date;
        this.description = description;
        this.lieu = lieu;
    }
    public ConferenceInvitee(){}

    // Getters et setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }
}

