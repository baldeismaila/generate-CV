package com.cv.demo.service;

import com.cv.demo.entities.*;
import com.cv.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EnseignantService {
    @Autowired
    private EnseignantRepository enseignantRepository;
    @Autowired
    private EducationRepository educationRepository;
    @Autowired
    private PositionRepository positionRepository;
    @Autowired
    private PublicationRepository publicationRepository;
    @Autowired
    private PrixEtNominationsRepository prixEtNominationsRepository;
    @Autowired
    private EncadrementRepository encadrementRepository;
    @Autowired
    private OrganisationEvenementsInternationauxRepository organisationEvenementsInternationauxRepository;
    @Autowired
    private RelecteurDeRevuesRepository relecteurDeRevuesRepository;
    @Autowired
    private MembreComiteProgrammeRepository membreComiteProgrammeRepository;
    @Autowired
    private ContratDeRechercheRepository contratDeRechercheRepository;
    @Autowired
    private ActiviteEnseignementRepository activiteEnseignementRepository;
    @Autowired
    private ResponsabiliteInstitutionnelleRepository responsabiliteInstitutionnelleRepository;
    @Autowired
    private DeclarationInventionRepository declarationInventionRepository;
    @Autowired
    private ConferenceInviteeRepository conferenceInviteeRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public EnseignantService() {
    }

    public List<Enseignant> getAllEnseignants() {
        return enseignantRepository.findAll();
    }

    public Enseignant getEnseignantById(String id) {
        return enseignantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enseignant introuvable avec l'ID : " + id));
    }

    public Optional<Enseignant> findEnseignantByEmail(String email) {
        Optional<Enseignant>  enseignant = enseignantRepository.findByEmail(email);
        if (enseignant.isEmpty()) {
            throw new RuntimeException("Enseignant introuvable avec l'email : " + email);
        }
        return enseignant;
    }

    public Enseignant saveEnseignant(Enseignant enseignant) {
        // Vérifier si la date de naissance est dans le futur
        LocalDate currentDate = LocalDate.now();
        LocalDate dateOfBirth = LocalDate.parse(enseignant.getDateDeNaissance(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        if (dateOfBirth.isAfter(currentDate)) {
            throw new IllegalArgumentException("La date de naissance ne peut pas être dans le futur");
        }

        enseignant.setRole(Role.ROLE_USER);

        // Hash du mot de passe
        String hashedPassword = passwordEncoder.encode(enseignant.getPassword());
        enseignant.setPassword(hashedPassword);

        // Enregistre l'enseignant
        return enseignantRepository.save(enseignant);
    }

    public String updateEnseignant(String enseignantId, Enseignant updatedEnseignant) {
        Enseignant existingEnseignant = enseignantRepository.findById(enseignantId)
                .orElseThrow(() -> new RuntimeException("Enseignant non trouvé avec l'ID : " + enseignantId));

        // Vérifier si les dates sont dans le futur
        LocalDate currentDate = LocalDate.now();
        LocalDate updatedDateOfBirth = LocalDate.parse(updatedEnseignant.getDateDeNaissance(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        if (updatedDateOfBirth.isAfter(currentDate)) {
            throw new IllegalArgumentException("La date de naissance ne peut pas être dans le futur");
        }

        // Mettre à jour les champs de l'enseignant avec les nouvelles valeurs
        existingEnseignant.setPrenom(updatedEnseignant.getPrenom());
        existingEnseignant.setNom(updatedEnseignant.getNom());
        existingEnseignant.setDateDeNaissance(updatedEnseignant.getDateDeNaissance());
        existingEnseignant.setUrlDuSiteWeb(updatedEnseignant.getUrlDuSiteWeb());
        existingEnseignant.setIdentifiantChercheur(updatedEnseignant.getIdentifiantChercheur());
        existingEnseignant.setIndiceH(updatedEnseignant.getIndiceH());
        existingEnseignant.setEmail(updatedEnseignant.getEmail());
        existingEnseignant.setTelephone(updatedEnseignant.getTelephone());
        existingEnseignant.setRole(updatedEnseignant.getRole());

        // Hash du mot de passe
        String hashedPassword = passwordEncoder.encode(updatedEnseignant.getPassword());
        existingEnseignant.setPassword(hashedPassword);

        // Enregistrer les modifications de l'enseignant dans la base de données
        enseignantRepository.save(existingEnseignant);
        return "Enseignant modifié avec succès";
    }

    public void deleteEnseignantById(String id) {
        enseignantRepository.deleteById(id);
    }

    public String addRoleToEnseignant(String email, Role role) {
        Optional<Enseignant> optionalEnseignant = enseignantRepository.findByEmail(email);
        if (optionalEnseignant.isPresent()) {
            Enseignant enseignant = optionalEnseignant.get();
            enseignant.setRole(role);
            enseignantRepository.save(enseignant);
            return "Role ajouté";
        }
        // Gérer le cas où l'enseignant n'existe pas
        return "Enseignant non trouvé";
    }

    public void addPositionActuelToEnseignant(String enseignantId, Position position) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && position != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getPositionsActuelles() == null) {
                enseignant.setPositionsActuelles(new ArrayList<>());
            }
            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(position.getAnneeDebut(), formatter);

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            position.setAnneeDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            //position.setAnneeFin("to date"); // Réassigner la date de fin sous forme de String 'to date'

            positionRepository.save(position);
            enseignant.getPositionsActuelles().add(position);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addPositionPrecedentToEnseignant(String enseignantId, Position position) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && position != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getPositionsPrecedentes() == null) {
                enseignant.setPositionsPrecedentes(new ArrayList<>());
            }
            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(position.getAnneeDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(position.getAnneeFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            position.setAnneeDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            position.setAnneeFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            positionRepository.save(position);
            enseignant.getPositionsPrecedentes().add(position);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addActiviteEnseignementToEnseignant(String enseignantId, ActiviteEnseignement activiteEnseignement) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && activiteEnseignement != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getActivitesEnseignement() == null) {
                enseignant.setActivitesEnseignement(new ArrayList<>());
            }
            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(activiteEnseignement.getAnneeDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(activiteEnseignement.getAnneeFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            activiteEnseignement.setAnneeDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            activiteEnseignement.setAnneeFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            // Sauvegarder l'activité d'enseignement pour générer l'ID
            activiteEnseignementRepository.save(activiteEnseignement);
            enseignant.getActivitesEnseignement().add(activiteEnseignement);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addConferenceInviteeToEnseignant(String enseignantId, ConferenceInvitee conferenceInvitee) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && conferenceInvitee != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getConferenceInvitees() == null) {
                enseignant.setConferenceInvitees(new ArrayList<>());
            }
            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(conferenceInvitee.getDate(), formatter);

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (date.isAfter(currentDate)) {
                throw new IllegalArgumentException("La date ne peut pas être dans le futur");
            }

            conferenceInvitee.setDate(date.toString());

            conferenceInviteeRepository.save(conferenceInvitee);
            enseignant.getConferenceInvitees().add(conferenceInvitee);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addContratDeRechercheToEnseignant(String enseignantId, ContratDeRecherche contrat) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && contrat != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getContratsDeRecherche() == null) {
                enseignant.setContratsDeRecherche(new ArrayList<>());
            }
            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(contrat.getPeriodeDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(contrat.getPeriodeFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate)) {
                throw new IllegalArgumentException("La date ne peut pas être dans le futur");
            }

            contrat.setPeriodeDebut(dateDebut.toString());
            contrat.setPeriodeFin(dateFin.toString());

            contratDeRechercheRepository.save(contrat);
            enseignant.getContratsDeRecherche().add(contrat);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addDeclarationInventionToEnseignant(String enseignantId, DeclarationInvention declaration) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && declaration != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getDeclarationDInvention() == null) {
                enseignant.setDeclarationDInvention(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(declaration.getAnnee(), formatter);

            // Vérifier si la date de dépôt est dans le futur
            LocalDate currentDate = LocalDate.now();
            if (date.isAfter(currentDate)) {
                throw new IllegalArgumentException("La date ne peut pas être dans le futur");
            }

            declaration.setAnnee(date.toString()); // Réassigner la date de dépôt sous forme de String

            declarationInventionRepository.save(declaration);
            enseignant.getDeclarationDInvention().add(declaration);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addEducationToEnseignant(String enseignantId, Education education) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && education != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getEducations() == null) {
                enseignant.setEducations(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(education.getDateDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(education.getDateFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate)) {
                throw new IllegalArgumentException("La date ne peut pas être dans le futur");
            }

            education.setDateDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            education.setDateFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            educationRepository.save(education);
            // Enregistrer l'éducation et l'associer à l'enseignant
            enseignant.getEducations().add(education);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addEncadrementToEnseignant(String enseignantId, Encadrement encadrement) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && encadrement != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getEncadrementDesEtudiants() == null) {
                enseignant.setEncadrementDesEtudiants(new ArrayList<>());
            }
            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(encadrement.getDateDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(encadrement.getDateFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            encadrement.setDateDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            encadrement.setDateFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            encadrementRepository.save(encadrement);
            enseignant.getEncadrementDesEtudiants().add(encadrement);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addSuperviseurToEncadrement(String idEncadrement, Encadrement.Superviseur superviseur) {
        // Récupérer l'encadrement correspondant à l'ID
        Encadrement encadrement = encadrementRepository.findById(idEncadrement)
                .orElseThrow(() -> new IllegalArgumentException("Encadrement non trouvé avec l'ID: " + idEncadrement));

        // Vérifier si la liste des superviseurs est null, l'initialiser si nécessaire
        if (encadrement.getSuperviseurs() == null) {
            encadrement.setSuperviseurs(new ArrayList<>());
        }

        // Ajouter le superviseur à la liste des superviseurs de l'encadrement
        encadrement.getSuperviseurs().add(superviseur);

        // Enregistrer les modifications
        encadrementRepository.save(encadrement);
    }


    public void addMembreComiteProgrammeToEnseignant(String enseignantId, MembreComiteProgramme membre) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && membre != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getMembresComiteProgramme() == null) {
                enseignant.setMembresComiteProgramme(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(membre.getDateDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(membre.getDateFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            membre.setDateDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            membre.setDateFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            membreComiteProgrammeRepository.save(membre);
            enseignant.getMembresComiteProgramme().add(membre);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addOrganisationEvenementsInternationauxToEnseignant(String enseignantId, OrganisationEvenementsInternationaux organisation/*, List<Participant> participants*/) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && organisation != null /*&& participants != null && !participants.isEmpty()*/) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getOrganisationEvenementsInternationaux() == null) {
                enseignant.setOrganisationEvenementsInternationaux(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(organisation.getDateDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(organisation.getDateFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            organisation.setDateDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            organisation.setDateFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            // Ajouter la liste des participants à l'événement
            //organisation.setParticipants(participants);

            // Sauvegarder l'événement et l'enseignant

            organisationEvenementsInternationauxRepository.save(organisation);
            enseignant.getOrganisationEvenementsInternationaux().add(organisation);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addPrixEtNominationsToEnseignant(String enseignantId, PrixEtNominations prix) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && prix != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getPrixEtNominations() == null) {
                enseignant.setPrixEtNominations(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate date = LocalDate.parse(prix.getAnnee(), formatter);

            // Vérifier si la date est dans le futur
            LocalDate currentDate = LocalDate.now();
            if (date.isAfter(currentDate)) {
                throw new IllegalArgumentException("La date ne peut pas être dans le futur");
            }

            prix.setAnnee(date.toString()); // Réassigner la date sous forme de String

            prixEtNominationsRepository.save(prix);
            enseignant.getPrixEtNominations().add(prix);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addPublicationToEnseignant(String enseignantId, Publication publication) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && publication != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getPublications() == null) {
                enseignant.setPublications(new ArrayList<>());
            }

            // Sauvegarder la publication dans la base de données
            publicationRepository.save(publication);
            // Ajouter la publication à la liste de publications de l'enseignant
            enseignant.getPublications().add(publication);
            // Sauvegarder l'enseignant pour mettre à jour sa liste de publications
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }
    public void addPublicationsToEnseignant(String enseignantId, List<Publication> publications) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && publications != null && !publications.isEmpty()) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getPublications() == null) {
                enseignant.setPublications(new ArrayList<>());
            }

            // Ajouter chaque publication à la liste de publications de l'enseignant
            for (Publication publication : publications) {
                publicationRepository.save(publication);
                enseignant.getPublications().add(publication);
            }

            // Sauvegarder l'enseignant pour mettre à jour sa liste de publications
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }


    public void addRelecteurDeRevuesToEnseignant(String enseignantId, RelecteurDeRevues relecteur) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && relecteur != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getRelecteurDeRevues() == null) {
                enseignant.setRelecteurDeRevues(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(relecteur.getDateDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(relecteur.getDateFin(), formatter);
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            relecteur.setDateDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            relecteur.setDateFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            relecteurDeRevuesRepository.save(relecteur);
            enseignant.getRelecteurDeRevues().add(relecteur);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public void addResponsabiliteInstitutionnelleToEnseignant(String enseignantId, ResponsabiliteInstitutionnelle responsabilite) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);
        if (enseignantOptional.isPresent() && responsabilite != null) {
            Enseignant enseignant = enseignantOptional.get();
            if (enseignant.getResponsabilitesInstitutionnelles() == null) {
                enseignant.setResponsabilitesInstitutionnelles(new ArrayList<>());
            }

            // Convertir les dates de type String en objets LocalDate
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            LocalDate dateDebut = LocalDate.parse(responsabilite.getDateDebut(), formatter);
            LocalDate dateFin = LocalDate.parse(responsabilite.getDateFin(), formatter);

            // Vérifier si la date de début est antérieure à la date de fin
            if (dateDebut.isAfter(dateFin)) {
                throw new IllegalArgumentException("La date de début ne peut pas être après la date de fin");
            }

            // Vérifier si les dates sont dans le futur
            LocalDate currentDate = LocalDate.now();
            if (dateDebut.isAfter(currentDate) || dateFin.isAfter(currentDate)) {
                throw new IllegalArgumentException("Les dates ne peuvent pas être dans le futur");
            }

            responsabilite.setDateDebut(dateDebut.toString()); // Réassigner la date de début sous forme de String
            responsabilite.setDateFin(dateFin.toString()); // Réassigner la date de fin sous forme de String

            responsabiliteInstitutionnelleRepository.save(responsabilite);
            enseignant.getResponsabilitesInstitutionnelles().add(responsabilite);
            enseignantRepository.save(enseignant);
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deletePositionActuelle(String enseignantId, String positionId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<Position> positions = enseignant.getPositionsActuelles();

            // Suppression de la position de la liste
            boolean removed = positions.removeIf(position -> position.getId().equals(positionId));

            if (removed) {
                // Suppression de la position de la base de données
                positionRepository.deleteById(positionId);
                enseignant.setPositionsActuelles(positions);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deletePositionPrecedente(String enseignantId, String positionId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<Position> positions = enseignant.getPositionsPrecedentes();

            // Suppression de la position de la liste
            boolean removed = positions.removeIf(position -> position.getId().equals(positionId));

            if (removed) {
                // Suppression de la position de la base de données
                positionRepository.deleteById(positionId);
                enseignant.setPositionsPrecedentes(positions);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteResponsabiliteInstitutionnelle(String enseignantId, String responsabiliteId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<ResponsabiliteInstitutionnelle> responsabilites = enseignant.getResponsabilitesInstitutionnelles();

            // Suppression de la responsabilité de la liste
            boolean removed = responsabilites.removeIf(responsabilite -> responsabilite.getId().equals(responsabiliteId));

            if (removed) {
                // Suppression de la responsabilité de la base de données
                responsabiliteInstitutionnelleRepository.deleteById(responsabiliteId);
                enseignant.setResponsabilitesInstitutionnelles(responsabilites);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteEducation(String enseignantId, String educationId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<Education> educations = enseignant.getEducations();

            // Suppression de l'éducation de la liste
            boolean removed = educations.removeIf(education -> education.getId().equals(educationId));

            if (removed) {
                // Suppression de l'éducation de la base de données
                educationRepository.deleteById(educationId);
                enseignant.setEducations(educations);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteDeclarationDInvention(String enseignantId, String declarationId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<DeclarationInvention> declarations = enseignant.getDeclarationDInvention();

            // Suppression de la déclaration de la liste
            boolean removed = declarations.removeIf(declaration -> declaration.getId().equals(declarationId));

            if (removed) {
                // Suppression de la déclaration de la base de données
                declarationInventionRepository.deleteById(declarationId);
                enseignant.setDeclarationDInvention(declarations);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteConferenceInvitee(String enseignantId, String conferenceId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<ConferenceInvitee> conferences = enseignant.getConferenceInvitees();

            // Suppression de la conférence de la liste
            boolean removed = conferences.removeIf(conference -> conference.getId().equals(conferenceId));

            if (removed) {
                // Suppression de la conférence de la base de données
                conferenceInviteeRepository.deleteById(conferenceId);
                enseignant.setConferenceInvitees(conferences);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deletePrixEtNomination(String enseignantId, String prixId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<PrixEtNominations> prixEtNominations = enseignant.getPrixEtNominations();

            // Suppression du prix et de la nomination de la liste
            boolean removed = prixEtNominations.removeIf(prix -> prix.getId().equals(prixId));

            if (removed) {
                // Suppression du prix et de la nomination de la base de données
                prixEtNominationsRepository.deleteById(prixId);
                enseignant.setPrixEtNominations(prixEtNominations);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteEncadrementDesEtudiants(String enseignantId, String encadrementId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<Encadrement> encadrements = enseignant.getEncadrementDesEtudiants();

            // Suppression de l'encadrement de la liste
            boolean removed = encadrements.removeIf(encadrement -> encadrement.getId().equals(encadrementId));

            if (removed) {
                // Suppression de l'encadrement de la base de données
                encadrementRepository.deleteById(encadrementId);
                enseignant.setEncadrementDesEtudiants(encadrements);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteOrganisationEvenementsInternationaux(String enseignantId, String organisationId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<OrganisationEvenementsInternationaux> organisations = enseignant.getOrganisationEvenementsInternationaux();

            // Suppression de l'organisation de la liste
            boolean removed = organisations.removeIf(organisation -> organisation.getId().equals(organisationId));

            if (removed) {
                // Suppression de l'organisation de la base de données
                organisationEvenementsInternationauxRepository.deleteById(organisationId);
                enseignant.setOrganisationEvenementsInternationaux(organisations);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteRelecteurDeRevues(String enseignantId, String relectureId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<RelecteurDeRevues> relectures = enseignant.getRelecteurDeRevues();

            // Suppression de la relecture de la liste
            boolean removed = relectures.removeIf(relecture -> relecture.getId().equals(relectureId));

            if (removed) {
                // Suppression de la relecture de la base de données
                relecteurDeRevuesRepository.deleteById(relectureId);
                enseignant.setRelecteurDeRevues(relectures);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteMembreComiteProgramme(String enseignantId, String membreId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<MembreComiteProgramme> membres = enseignant.getMembresComiteProgramme();

            // Suppression du membre de la liste
            boolean removed = membres.removeIf(membre -> membre.getId().equals(membreId));

            if (removed) {
                // Suppression du membre de la base de données
                membreComiteProgrammeRepository.deleteById(membreId);
                enseignant.setMembresComiteProgramme(membres);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteContratDeRecherche(String enseignantId, String contratId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<ContratDeRecherche> contrats = enseignant.getContratsDeRecherche();

            // Suppression du contrat de la liste
            boolean removed = contrats.removeIf(contrat -> contrat.getId().equals(contratId));

            if (removed) {
                // Suppression du contrat de la base de données
                contratDeRechercheRepository.deleteById(contratId);
                enseignant.setContratsDeRecherche(contrats);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deleteActiviteEnseignement(String enseignantId, String activiteId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<ActiviteEnseignement> activites = enseignant.getActivitesEnseignement();

            // Suppression de l'activité de la liste
            boolean removed = activites.removeIf(activite -> activite.getId().equals(activiteId));

            if (removed) {
                // Suppression de l'activité de la base de données
                activiteEnseignementRepository.deleteById(activiteId);
                enseignant.setActivitesEnseignement(activites);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }

    public boolean deletePublication(String enseignantId, String publicationId) {
        Optional<Enseignant> enseignantOptional = enseignantRepository.findById(enseignantId);

        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            List<Publication> publications = enseignant.getPublications();

            // Suppression de la publication de la liste
            boolean removed = publications.removeIf(publication -> publication.getId().equals(publicationId));

            if (removed) {
                // Suppression de la publication de la base de données
                publicationRepository.deleteById(publicationId);
                enseignant.setPublications(publications);
                enseignantRepository.save(enseignant);
                return true;
            } else {
                return false;
            }
        } else {
            throw new EntityNotFoundException("Enseignant non trouvé avec l'ID : " + enseignantId);
        }
    }


}

