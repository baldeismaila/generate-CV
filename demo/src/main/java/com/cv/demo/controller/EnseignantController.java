package com.cv.demo.controller;

import com.cv.demo.config.JwtService;
import com.cv.demo.entities.*;
import com.cv.demo.service.EnseignantService;
import com.cv.demo.utils.AuthDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/enseignants")
public class EnseignantController {

    @Autowired
    private EnseignantService enseignantService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/connexion")
    public Map<String,String> connexion(@RequestBody AuthDto authDto){
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authDto.username(),authDto.password())
        );
        if(authentication.isAuthenticated()){
            return this.jwtService.generate(authDto.username());
        }
        return null;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Enseignant>> getAllEnseignants() {
        List<Enseignant> enseignants = enseignantService.getAllEnseignants();
        return ResponseEntity.ok(enseignants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enseignant> getEnseignantById(@PathVariable String id) {
        Enseignant enseignant = enseignantService.getEnseignantById(id);
        if (enseignant != null) {
            return ResponseEntity.ok(enseignant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Enseignant> getEnseignantByEmail(@PathVariable String email) {
        Optional<Enseignant> enseignant = enseignantService.findEnseignantByEmail(email);
        return enseignant.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Enseignant> saveEnseignant(@RequestBody Enseignant enseignant) {
        Enseignant savedEnseignant = enseignantService.saveEnseignant(enseignant);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEnseignant);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteEnseignantById(@PathVariable String id) {
        enseignantService.deleteEnseignantById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateEnseignant(@PathVariable String id, @RequestBody Enseignant updatedEnseignant) {
        String result = enseignantService.updateEnseignant(id, updatedEnseignant);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/role/{email}")
    public ResponseEntity<String> addRoleToEnseignant(@PathVariable String email, @RequestParam(name = "role") String roleValue) {
        Role role;
        if ("ROLE_USER".equals(roleValue)) {
            role = Role.ROLE_USER;
        } else if ("ROLE_ADMIN".equals(roleValue)) {
            role = Role.ROLE_ADMIN;
        } else {
            return ResponseEntity.badRequest().body("Ce rôle (" + roleValue + ") n'existe pas.");
        }
        String result = enseignantService.addRoleToEnseignant(email, role);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/activite/{id}")
    public void addActiviteEnseignementToEnseignant(@PathVariable String id, @RequestBody ActiviteEnseignement activiteEnseignement) {
        enseignantService.addActiviteEnseignementToEnseignant(id, activiteEnseignement);
    }
    @PostMapping("/conference/{id}")
    public void addConferenceInviteeToEnseignant(@PathVariable String id, @RequestBody ConferenceInvitee conferenceInvitee) {
        enseignantService.addConferenceInviteeToEnseignant(id, conferenceInvitee);
    }
    @PostMapping("/contrat/{id}")
    public void addContratDeRechercheToEnseignant(@PathVariable String id, @RequestBody ContratDeRecherche contratDeRecherche) {
        enseignantService.addContratDeRechercheToEnseignant(id, contratDeRecherche);
    }
    @PostMapping("/declaration/{id}")
    public void addDeclarationInventionToEnseignant(@PathVariable String id, @RequestBody DeclarationInvention declarationInvention) {
        enseignantService.addDeclarationInventionToEnseignant(id, declarationInvention);
    }
    @PostMapping("/education/{id}")
    public void addEducationToEnseignant(@PathVariable String id, @RequestBody Education education) {
        enseignantService.addEducationToEnseignant(id, education);
    }
    @PostMapping("/encadrement/{id}")
    public void addEncadrementToEnseignant(@PathVariable String id, @RequestBody Encadrement encadrement) {
        enseignantService.addEncadrementToEnseignant(id, encadrement);
    }
    @PostMapping("/encadrement/superviseur/{id}")
    public void addSuperviseurToEncadrement(@PathVariable String id, @RequestBody Encadrement.Superviseur superviseur) {
        enseignantService.addSuperviseurToEncadrement(id, superviseur);
    }
    @PostMapping("/membre/{id}")
    public void addMembreComiteProgrammeToEnseignant(@PathVariable String id, @RequestBody MembreComiteProgramme membreComiteProgramme) {
        enseignantService.addMembreComiteProgrammeToEnseignant(id, membreComiteProgramme);
    }
    @PostMapping("/organisation/{id}")
    public void addOrganisationEvenementsInternationauxToEnseignant(@PathVariable String id, @RequestBody OrganisationEvenementsInternationaux organisationEvenementsInternationaux) {
        enseignantService.addOrganisationEvenementsInternationauxToEnseignant(id, organisationEvenementsInternationaux);
    }
    @PostMapping("/position-actuel/{id}")
    public void addPositionActuelToEnseignant(@PathVariable String id, @RequestBody Position position) {
        enseignantService.addPositionActuelToEnseignant(id, position);
    }
    @PostMapping("/position-precedent/{id}")
    public void addPositionPrecedentToEnseignant(@PathVariable String id, @RequestBody Position position) {
        enseignantService.addPositionPrecedentToEnseignant(id, position);
    }
    @PostMapping("/prix-nominations/{id}")
    public void addPrixEtNominationsToEnseignant(@PathVariable String id, @RequestBody PrixEtNominations prixEtNominations) {
        enseignantService.addPrixEtNominationsToEnseignant(id, prixEtNominations);
    }
    @PostMapping("/publication/{id}")
    public void addPublicationToEnseignant(@PathVariable String id, @RequestBody Publication publication) {
        enseignantService.addPublicationToEnseignant(id, publication);
    }
    @PostMapping("/publications/{id}")
    public void addPublicationToEnseignantListe(@PathVariable String id, @RequestBody List<Publication> publications) {
        enseignantService.addPublicationsToEnseignant(id, publications);
    }
    @PostMapping("/relecteur-revues/{id}")
    public void addRelecteurDeRevuesToEnseignant(@PathVariable String id, @RequestBody RelecteurDeRevues relecteurDeRevues) {
        enseignantService.addRelecteurDeRevuesToEnseignant(id, relecteurDeRevues);
    }
    @PostMapping("/responsabilite-institutionnelle/{id}")
    public void addResponsabiliteInstitutionnelleToEnseignant(@PathVariable String id, @RequestBody ResponsabiliteInstitutionnelle responsabiliteInstitutionnelle) {
        enseignantService.addResponsabiliteInstitutionnelleToEnseignant(id, responsabiliteInstitutionnelle);
    }
    @DeleteMapping("/activite/{enseignantId}/{activiteId}")
    public boolean deleteActiviteEnseignementFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String activiteId) {
        return enseignantService.deleteActiviteEnseignement(enseignantId, activiteId);
    }
    @DeleteMapping("/conference/{enseignantId}/{conferenceId}")
    public boolean deleteConferenceInviteeFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String conferenceId) {
        return enseignantService.deleteConferenceInvitee(enseignantId, conferenceId);
    }
    @DeleteMapping("/contrat/{enseignantId}/{contratId}")
    public boolean deleteContratDeRechercheFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String contratId) {
        return enseignantService.deleteContratDeRecherche(enseignantId, contratId);
    }
    @DeleteMapping("/declaration/{enseignantId}/{declarationId}")
    public boolean deleteDeclarationInventionFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String declarationId) {
        return enseignantService.deleteDeclarationDInvention(enseignantId, declarationId);
    }
    @DeleteMapping("/education/{enseignantId}/{educationId}")
    public boolean deleteEducationFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String educationId) {
        return enseignantService.deleteEducation(enseignantId, educationId);
    }
    @DeleteMapping("/encadrement/{enseignantId}/{encadrementId}")
    public boolean deleteEncadrementFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String encadrementId) {
        return enseignantService.deleteEncadrementDesEtudiants(enseignantId, encadrementId);
    }
    @DeleteMapping("/membre-comite/{enseignantId}/{membreId}")
    public boolean deleteMembreComiteProgrammeFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String membreId) {
        return enseignantService.deleteMembreComiteProgramme(enseignantId, membreId);
    }
    @DeleteMapping("/organisation/{enseignantId}/{organisationId}")
    public boolean deleteOrganisationEvenementsInternationauxFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String organisationId) {
        return enseignantService.deleteOrganisationEvenementsInternationaux(enseignantId, organisationId);
    }
    @DeleteMapping("/position/actuelle/{enseignantId}")
    public boolean deletePositionActuelleFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String positionId) {
        return enseignantService.deletePositionActuelle(enseignantId,positionId);
    }
    @DeleteMapping("/position/precedente/{enseignantId}")
    public boolean deletePositionPrecedenteFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String positionId) {
        return enseignantService.deletePositionPrecedente(enseignantId,positionId);
    }
    @DeleteMapping("/prix-et-nominations/{enseignantId}/{prixId}")
    public boolean deletePrixEtNominationsFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String prixId) {
        return enseignantService.deletePrixEtNomination(enseignantId, prixId);
    }
    @DeleteMapping("/publication/{enseignantId}/{publicationId}")
    public boolean deletePublicationFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String publicationId) {
        return enseignantService.deletePublication(enseignantId, publicationId);
    }
    @DeleteMapping("/relecteur/{enseignantId}/{relecteurId}")
    public boolean deleteRelecteurDeRevuesFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String relecteurId) {
        return enseignantService.deleteRelecteurDeRevues(enseignantId, relecteurId);
    }
    @DeleteMapping("/responsabilite/{enseignantId}/{responsabiliteId}")
    public boolean deleteResponsabiliteInstitutionnelleFromEnseignant(
            @PathVariable String enseignantId,
            @PathVariable String responsabiliteId) {
        return enseignantService.deleteResponsabiliteInstitutionnelle(enseignantId, responsabiliteId);
    }
}

