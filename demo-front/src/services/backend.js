import axios from "axios";

const API_URL = "http://localhost:8080";

export const getAll= () =>
   axios.get(API_URL + "/enseignants/all");

export const getUserByEmail= (email) =>
   axios.get(API_URL + "/enseignants/email/" + email);

export const getUserById= (id) =>
   axios.get(API_URL + "/enseignants/" + id);

export const addEnseignant= (enseignant) =>
   axios.post(API_URL + "/enseignants/add",enseignant);

export const updateUser= (enseignant) =>
   axios.put(API_URL + "/enseignants/update/" + enseignant.id, enseignant);

export const deleteUser= (id) =>
   axios.delete(API_URL + "/enseignants/delete/" + id);

export const addRole = (email,role) =>
   axios.get(API_URL + "/enseignants/role/" + email + "?role=" + role);

export const addActiviteEnseignementToEnseignant = (id, activiteEnseignement) => {
      return axios.post(API_URL + "/enseignants/activite/" + id, activiteEnseignement);
  };

export const addConferenceInviteeToEnseignant = (id, conferenceInvitee) => {
   return axios.post(API_URL + "/enseignants/conference/" + id, conferenceInvitee);
};

export const addContratDeRechercheToEnseignant = (id, contratDeRecherche) => {
   return axios.post(API_URL + "/enseignants/contrat/" + id, contratDeRecherche);
};

export const addDeclarationInventionToEnseignant = (id, declarationInvention) => {
   return axios.post(API_URL + "/enseignants/declaration/" + id, declarationInvention);
};

export const addEducationToEnseignant = (id, education) => {
   return axios.post(API_URL + "/enseignants/education/" + id, education);
};

export const addEncadrementToEnseignant = (id, encadrement) => {
   return axios.post(API_URL + "/enseignants/encadrement/" + id, encadrement);
};

export const addSuperviseurToEncadrement = (id, superviseur) => {
   return axios.post(API_URL + "/enseignants/encadrement/superviseur/" + id, superviseur);
};

export const addMembreComiteProgrammeToEnseignant = (id, membreComiteProgramme) => {
   return axios.post(API_URL + "/enseignants/membre/" + id, membreComiteProgramme);
};

export const addOrganisationEvenementsInternationauxToEnseignant = (id, organisationEvenementsInternationaux) => {
   return axios.post(API_URL + "/enseignants/organisation/" + id, organisationEvenementsInternationaux);
};

export const addPositionActuelToEnseignant = (id, position) => {
   return axios.post(API_URL + "/enseignants/position-actuel/" + id, position);
};

export const addPositionPrecedentToEnseignant = (id, position) => {
   return axios.post(API_URL + "/enseignants/position-precedent/" + id, position);
};

export const addPrixEtNominationsToEnseignant = (id, prixEtNominations) => {
   return axios.post(API_URL + "/enseignants/prix-nominations/" + id, prixEtNominations);
};

export const addPublicationToEnseignant = (id, publication) => {
   return axios.post(API_URL + "/enseignants/publication/" + id, publication);
};

export const addPublicationListeToEnseignant = (id, publications) => {
   return axios.post(API_URL + "/enseignants/publications/" + id, publications);
};

export const addRelecteurDeRevuesToEnseignant = (id, relecteurDeRevues) => {
   return axios.post(API_URL + "/enseignants/relecteur-revues/" + id, relecteurDeRevues);
};

export const addResponsabiliteInstitutionnelleToEnseignant = (id, responsabiliteInstitutionnelle) => {
   return axios.post(API_URL + "/enseignants/responsabilite-institutionnelle/" + id, responsabiliteInstitutionnelle);
};
// export const updateExperience= (idEn,idEx,experience) =>
//    axios.put(API_URL + "/enseignants/updateExperience/" + idEn + "/"+ idEx, experience);

// Fonction pour supprimer une activité d'enseignement d'un enseignant
export const deleteActiviteEnseignementFromEnseignant = (enseignantId, activiteId) => {
   return axios.delete(API_URL + "/enseignants/activite/" + enseignantId + "/" + activiteId);
};

export const deleteConferenceInviteeFromEnseignant = (enseignantId, conferenceId) => {
   return axios.delete(API_URL + "/enseignants/conference/" + enseignantId + "/" + conferenceId);
};

export const deleteContratDeRechercheFromEnseignant = (enseignantId, contratId) => {
   return axios.delete(API_URL + "/enseignants/contrat/" + enseignantId + "/" + contratId);
};

export const deleteDeclarationInventionFromEnseignant = (enseignantId, declarationId) => {
   return axios.delete(API_URL + "/enseignants/declaration/" + enseignantId + "/" + declarationId);
};

export const deleteEducationFromEnseignant = (enseignantId, educationId) => {
   return axios.delete(API_URL + "/enseignants/education/" + enseignantId + "/" + educationId);
};

export const deleteEncadrementFromEnseignant = (enseignantId, encadrementId) => {
   return axios.delete(API_URL + "/enseignants/encadrement/" + enseignantId + "/" + encadrementId);
};

export const deleteMembreComiteProgrammeFromEnseignant = (enseignantId, membreId) => {
   return axios.delete(API_URL + "/enseignants/membre-comite/" + enseignantId + "/" + membreId);
};

export const deleteOrganisationEvenementsInternationauxFromEnseignant = (enseignantId, organisationId) => {
   return axios.delete(API_URL + "/enseignants/organisation/" + enseignantId + "/" + organisationId);
};

export const deletePositionActuelleFromEnseignant = (enseignantId, positionId) => {
   return axios.delete(API_URL + "/enseignants/position/actuelle/" + enseignantId + "/" + positionId);
};

export const deletePositionPrecedenteFromEnseignant = (enseignantId, positionId) => {
   return axios.delete(API_URL + "/enseignants/position/precedente/" + enseignantId + "/" + positionId);
};

export const deletePrixEtNominationsFromEnseignant = (enseignantId, prixId) => {
   return axios.delete(API_URL + "/enseignants/prix-et-nominations/" + enseignantId + "/" + prixId);
};

export const deletePublicationFromEnseignant = (enseignantId, publicationId) => {
   return axios.delete(API_URL + "/enseignants/publication/" + enseignantId + "/" + publicationId);
};

export const deleteRelecteurDeRevuesFromEnseignant = (enseignantId, relecteurId) => {
   return axios.delete(API_URL + "/enseignants/relecteur/" + enseignantId + "/" + relecteurId);
};

export const deleteResponsabiliteInstitutionnelleFromEnseignant = (enseignantId, responsabiliteId) => {
   return axios.delete(API_URL + "/enseignants/responsabilite/" + enseignantId + "/" + responsabiliteId);
};









