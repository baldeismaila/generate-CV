package com.cv.demo.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "enseignants")
public class Enseignant {
    @Id
    private String id;
    private String nom;
    private String prenom;
    private String dateDeNaissance;
    private String urlDuSiteWeb;
    private String identifiantChercheur;
    private int indiceH;
    private String email;
    private String telephone;
    private Role role;
    private String password;
    private List<String> motsCles;
    private List<Position> positionsActuelles;
    private List<Position> positionsPrecedentes;
    private List<Publication> publications;
    private List<DeclarationInvention> declarationDInvention;
    private List<ConferenceInvitee> conferenceInvitees;
    private List<PrixEtNominations> prixEtNominations;
    private List<Encadrement> encadrementDesEtudiants;
    private List<OrganisationEvenementsInternationaux> organisationEvenementsInternationaux;
    private List<RelecteurDeRevues> relecteurDeRevues;
    private List<MembreComiteProgramme> membresComiteProgramme;
    private List<ContratDeRecherche> contratsDeRecherche;
    private List<ActiviteEnseignement> activitesEnseignement;
    private List<ResponsabiliteInstitutionnelle> responsabilitesInstitutionnelles;
    private List<Education> educations;
    /*private List<DistinctionHonoraire> distinctionsHonoraire;
    private List<OrganisationEvenementNational> organisationEvenementsNationaux;
    private List<Tutorat> tutorats;
    private List<TalkInvite> talksInvites;
    private List<PrixNominations> autresPrixNominations;
    private List<Supervision> supervisionEtudiantsPostdoc;
    private List<OrganisationEvenementRegional> organisationEvenementsRegionaux;
    private List<RevieweurJournal> revieweursJournaux;
    private List<ContratRecherche> contratsRecherche;
    private List<ActiviteEnseignement> activitesEnseignements;
    private List<ResponsabiliteInstitutionnelle> responsabilitesInstitutionnelles;
    private Education education;*/

    public Enseignant(String id, String nom, String prenom, String dateDeNaissance, String urlDuSiteWeb, String identifiantChercheur, int indiceH, List<String> motsCles, List<Position> positionsActuelles, List<Position> positionsPrecedentes, List<Publication> publications, List<DeclarationInvention> declarationDInvention, List<ConferenceInvitee> conferenceInvitees, List<PrixEtNominations> prixEtNominations, List<Encadrement> encadrementDesEtudiants, List<OrganisationEvenementsInternationaux> organisationEvenementsInternationaux, List<RelecteurDeRevues> relecteurDeRevues, List<MembreComiteProgramme> membresComiteProgramme, List<ContratDeRecherche> contratsDeRecherche, List<ActiviteEnseignement> activitesEnseignement, List<ResponsabiliteInstitutionnelle> responsabilitesInstitutionnelles, List<Education> educations) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.dateDeNaissance = dateDeNaissance;
        this.urlDuSiteWeb = urlDuSiteWeb;
        this.identifiantChercheur = identifiantChercheur;
        this.indiceH = indiceH;
        this.motsCles = motsCles;
        this.positionsActuelles = positionsActuelles;
        this.positionsPrecedentes = positionsPrecedentes;
        this.publications = publications;
        this.declarationDInvention = declarationDInvention;
        this.conferenceInvitees = conferenceInvitees;
        this.prixEtNominations = prixEtNominations;
        this.encadrementDesEtudiants = encadrementDesEtudiants;
        this.organisationEvenementsInternationaux = organisationEvenementsInternationaux;
        this.relecteurDeRevues = relecteurDeRevues;
        this.membresComiteProgramme = membresComiteProgramme;
        this.contratsDeRecherche = contratsDeRecherche;
        this.activitesEnseignement = activitesEnseignement;
        this.responsabilitesInstitutionnelles = responsabilitesInstitutionnelles;
        this.educations = educations;
    }

    // Getters and setters

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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getDateDeNaissance() {
        return dateDeNaissance;
    }

    public void setDateDeNaissance(String dateDeNaissance) {
        this.dateDeNaissance = dateDeNaissance;
    }

    public String getUrlDuSiteWeb() {
        return urlDuSiteWeb;
    }

    public void setUrlDuSiteWeb(String urlDuSiteWeb) {
        this.urlDuSiteWeb = urlDuSiteWeb;
    }

    public String getIdentifiantChercheur() {
        return identifiantChercheur;
    }

    public void setIdentifiantChercheur(String identifiantChercheur) {
        this.identifiantChercheur = identifiantChercheur;
    }

    public int getIndiceH() {
        return indiceH;
    }

    public void setIndiceH(int indiceH) {
        this.indiceH = indiceH;
    }

    public List<String> getMotsCles() {
        return motsCles;
    }

    public void setMotsCles(List<String> motsCles) {
        this.motsCles = motsCles;
    }

    public List<Position> getPositionsActuelles() {
        return positionsActuelles;
    }

    public void setPositionsActuelles(List<Position> positionsActuelles) {
        this.positionsActuelles = positionsActuelles;
    }

    public List<Position> getPositionsPrecedentes() {
        return positionsPrecedentes;
    }

    public void setPositionsPrecedentes(List<Position> positionsPrecedentes) {
        this.positionsPrecedentes = positionsPrecedentes;
    }

    public List<Publication> getPublications() {
        return publications;
    }

    public void setPublications(List<Publication> publications) {
        this.publications = publications;
    }

    public List<DeclarationInvention> getDeclarationDInvention() {
        return declarationDInvention;
    }

    public void setDeclarationDInvention(List<DeclarationInvention> declarationDInvention) {
        this.declarationDInvention = declarationDInvention;
    }

    public List<ConferenceInvitee> getConferenceInvitees() {
        return conferenceInvitees;
    }

    public void setConferenceInvitees(List<ConferenceInvitee> conferenceInvitees) {
        this.conferenceInvitees = conferenceInvitees;
    }

    public List<PrixEtNominations> getPrixEtNominations() {
        return prixEtNominations;
    }

    public void setPrixEtNominations(List<PrixEtNominations> prixEtNominations) {
        this.prixEtNominations = prixEtNominations;
    }

    public List<Encadrement> getEncadrementDesEtudiants() {
        return encadrementDesEtudiants;
    }

    public void setEncadrementDesEtudiants(List<Encadrement> encadrementDesEtudiants) {
        this.encadrementDesEtudiants = encadrementDesEtudiants;
    }

    public List<OrganisationEvenementsInternationaux> getOrganisationEvenementsInternationaux() {
        return organisationEvenementsInternationaux;
    }

    public void setOrganisationEvenementsInternationaux(List<OrganisationEvenementsInternationaux> organisationEvenementsInternationaux) {
        this.organisationEvenementsInternationaux = organisationEvenementsInternationaux;
    }

    public List<RelecteurDeRevues> getRelecteurDeRevues() {
        return relecteurDeRevues;
    }

    public void setRelecteurDeRevues(List<RelecteurDeRevues> relecteurDeRevues) {
        this.relecteurDeRevues = relecteurDeRevues;
    }

    public List<MembreComiteProgramme> getMembresComiteProgramme() {
        return membresComiteProgramme;
    }

    public void setMembresComiteProgramme(List<MembreComiteProgramme> membresComiteProgramme) {
        this.membresComiteProgramme = membresComiteProgramme;
    }

    public List<ContratDeRecherche> getContratsDeRecherche() {
        return contratsDeRecherche;
    }

    public void setContratsDeRecherche(List<ContratDeRecherche> contratsDeRecherche) {
        this.contratsDeRecherche = contratsDeRecherche;
    }

    public List<ActiviteEnseignement> getActivitesEnseignement() {
        return activitesEnseignement;
    }

    public void setActivitesEnseignement(List<ActiviteEnseignement> activitesEnseignement) {
        this.activitesEnseignement = activitesEnseignement;
    }

    public List<ResponsabiliteInstitutionnelle> getResponsabilitesInstitutionnelles() {
        return responsabilitesInstitutionnelles;
    }

    public void setResponsabilitesInstitutionnelles(List<ResponsabiliteInstitutionnelle> responsabilitesInstitutionnelles) {
        this.responsabilitesInstitutionnelles = responsabilitesInstitutionnelles;
    }

    public List<Education> getEducations() {
        return educations;
    }

    public void setEducations(List<Education> educations) {
        this.educations = educations;
    }
}