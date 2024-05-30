import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { deleteActiviteEnseignementFromEnseignant, deleteConferenceInviteeFromEnseignant, deleteContratDeRechercheFromEnseignant, deleteDeclarationInventionFromEnseignant, deleteEducationFromEnseignant, deleteEncadrementFromEnseignant, deleteMembreComiteProgrammeFromEnseignant, deleteOrganisationEvenementsInternationauxFromEnseignant, deletePositionActuelleFromEnseignant, deletePositionPrecedenteFromEnseignant, deletePrixEtNominationsFromEnseignant, deletePublicationFromEnseignant, deleteRelecteurDeRevuesFromEnseignant, deleteResponsabiliteInstitutionnelleFromEnseignant, getUserById } from "../services/backend";
import { userId } from "./Login";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

const GenerateCV = () =>{
    const [teacher, setTeacher] = useState({});
    const navigate = useNavigate();
    //let cpt = 1, cpt1 = 1, cpt2 = 1, cpt3 = 1, cpt4 = 1, cpt5 = 1, cpt6 = 1, cpt7 = 1;

    const id = userId;
    console.log('ID de l\'utilisateur connecté :', id);

    const generatePDF = () => {
        const doc = new jsPDF();
        let yPos = 20;
        const margin = 10;
        const pageWidth = doc.internal.pageSize.width - 2 * margin; // Width considering margins
        const lineHeight = 10;

        const addText = (text, x, y, options = {}) => {
            const textLines = doc.splitTextToSize(text, pageWidth);
            textLines.forEach((line) => {
                if (yPos + lineHeight > doc.internal.pageSize.height - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                doc.text(line, x, yPos, options);
                yPos += lineHeight;
            });
        };

        // Ajoute le nom du professeur en gras
        doc.setFontSize(20);
        doc.setFont('Helvetica', 'bold');
        addText(`Mr. ${teacher.prenom} ${teacher.nom}`, margin, yPos);
        
        // Rétablit la police normale pour le reste du contenu
        doc.setFontSize(11);
        doc.setFont('Helvetica', 'normal');
        addText(`Date de Naissance: ${teacher.dateDeNaissance}`, margin, yPos);

        addText(`Contact:`, margin, yPos);
        addText(`- Site web: ${teacher.urlDuSiteWeb}`, margin + 5, yPos);
        addText(`- Email: ${teacher.email}`, margin + 5, yPos);
        addText(`- Identifiant Chercheur: ${teacher.identifiantChercheur}`, margin + 5, yPos);
        addText(`- Téléphone: ${teacher.telephone}`, margin + 5, yPos);

        // Ajout des activités d'enseignement
        if (teacher.activitesEnseignement) {
            doc.setFont('Helvetica', 'bold');
            addText(`ACTIVITES ENSEIGNANT`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.activitesEnseignement.forEach((act, index) => {
                addText(`Activité ${index + 1}`, margin, yPos);
                addText(`Titre: ${act.titre}`, margin + 5, yPos);
                addText(`Description: ${act.description}`, margin + 5, yPos);
                addText(`Année de début: ${act.anneeDebut}`, margin + 5, yPos);
                addText(`Année de fin: ${act.anneeFin}`, margin + 5, yPos);
                addText(`Université: ${act.universite}`, margin + 5, yPos);
                addText(`Pays: ${act.pays}`, margin + 5, yPos);
            });
        }

        // Ajout des conférences invitées
        if (teacher.conferenceInvitees) {
            doc.setFont('Helvetica', 'bold');
            addText(`CONFERENCES INVITEES`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.conferenceInvitees.forEach((conf, index) => {
                addText(`Conférence Invitée ${index + 1}`, margin, yPos);
                addText(`Date: ${conf.date}`, margin + 5, yPos);
                addText(`Description: ${conf.description}`, margin + 5, yPos);
                addText(`Lieu: ${conf.lieu}`, margin + 5, yPos);
            });
        }
        // Ajout des contrats de recherche
        if (teacher.contratsDeRecherche) {
            doc.setFont('Helvetica', 'bold');
            addText(`CONTRATS DE RECHERCHE`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.contratsDeRecherche.forEach((contrat, index) => {
                addText(`Contrat de recherche ${index + 1}`, margin, yPos);
                addText(`Nom : ${contrat.nom}`, margin + 5, yPos);
                addText(`Titre: ${contrat.titre}`, margin + 5, yPos);
                addText(`Sponsor: ${contrat.sponsor}`, margin + 5, yPos);
                addText(`Montant total: ${contrat.montantTotal}`, margin + 5, yPos);
                addText(`Montant pour l'équipe: ${contrat.montantPourEquipe}`, margin + 5, yPos);
                addText(`Période de début: ${contrat.periodeDebut}`, margin + 5, yPos);
                addText(`Période de fin: ${contrat.periodeFin}`, margin + 5, yPos);
                addText(`Implication: ${contrat.implication}`, margin + 5, yPos);
            });
        }

        // Ajout des déclarations d'invention
        if (teacher.declarationDInvention) {
            doc.setFont('Helvetica', 'bold');
            addText(`DECLARATIONS D'INVENTION`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.declarationDInvention.forEach((declaration, index) => {
                addText(`Déclaration ${index + 1}`, margin, yPos);
                addText(`Année : ${declaration.annee}`, margin + 5, yPos);
                addText(`Nom de l'invention: ${declaration.nomInvention}`, margin + 5, yPos);
                addText(`Description: ${declaration.description}`, margin + 5, yPos);
                addText(`Statut: ${declaration.statut}`, margin + 5, yPos);
            });
        }

        // Ajout des éducations
        if (teacher.educations) {
            doc.setFont('Helvetica', 'bold');
            addText(`EDUCATION`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.educations.forEach((education, index) => {
                addText(`Éducation ${index + 1}`, margin, yPos);
                addText(`Diplôme : ${education.diplome}`, margin + 5, yPos);
                addText(`Domaine: ${education.domaine}`, margin + 5, yPos);
                addText(`Université: ${education.universite}`, margin + 5, yPos);
                addText(`Sujet: ${education.sujet}`, margin + 5, yPos);
                addText(`Superviseur: ${education.superviseur.statut} ${education.superviseur.nom} ${education.superviseur.prenom}`, margin + 5, yPos);
                addText(`Financement: ${education.financement}`, margin + 5, yPos);
                addText(`Date de début: ${education.dateDebut}`, margin + 5, yPos);
                addText(`Date de fin: ${education.dateFin}`, margin + 5, yPos);
            });
        }

        // Ajout des encadrements
        if (teacher.encadrementDesEtudiants) {
            doc.setFont('Helvetica', 'bold');
            addText(`ENCADREMENTS`, margin, yPos);
            doc.setFont('Helvetica', 'normal');
            
            teacher.encadrementDesEtudiants.forEach((encadrement, index) => {
                addText(`Encadrement ${index + 1}`, margin, yPos);
                addText(`Nom : ${encadrement.nom}`, margin + 5, yPos);
                addText(`Statut: ${encadrement.statut}`, margin + 5, yPos);
                addText(`Date de début: ${encadrement.dateDebut}`, margin + 5, yPos);
                addText(`Date de fin: ${encadrement.dateFin}`, margin + 5, yPos);
                addText(`Projet: ${encadrement.projet}`, margin + 5, yPos);
                addText(`Financement: ${encadrement.financement}`, margin + 5, yPos);

                // Affichage des superviseurs
                if (encadrement.superviseurs) {
                    encadrement.superviseurs.forEach((superviseur, sIndex) => {
                        addText(`Superviseur ${sIndex + 1}:`, margin + 10, yPos);
                        addText(`${superviseur.statut} ${superviseur.nom} ${superviseur.prenom} (${superviseur.pourcentageFinancement}%)`, margin + 15, yPos);
                    });
                }
            });
        }

        // Ajout des membres du comité de programme
        if (teacher.membresComiteProgramme) {
            doc.setFont('Helvetica', 'bold');
            addText(`MEMBRES DU COMITE DE PROGRAMME`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.membresComiteProgramme.forEach((membre, index) => {
                addText(`Membre ${index + 1}`, margin, yPos);
                addText(`Conférence : ${membre.conference}`, margin + 5, yPos);
                addText(`Date de début: ${membre.dateDebut}`, margin + 5, yPos);
                addText(`Date de fin: ${membre.dateFin}`, margin + 5, yPos);
            });
        }

        // Ajout des événements internationaux organisés
        if (teacher.organisationEvenementsInternationaux) {
            doc.setFont('Helvetica', 'bold');
            addText(`ORGANISATION D'ÉVÉNEMENTS INTERNATIONAUX`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.organisationEvenementsInternationaux.forEach((evenement, index) => {
                addText(`Événement ${index + 1}`, margin, yPos);
                addText(`Titre: ${evenement.titre}`, margin + 5, yPos);
                addText(`Date de début: ${evenement.dateDebut}`, margin + 5, yPos);
                addText(`Date de fin: ${evenement.dateFin}`, margin + 5, yPos);
                addText(`Détails: ${evenement.details}`, margin + 5, yPos);

                // Ajout des participants à l'événement
                if (evenement.participants && evenement.participants.length > 0) {
                    addText(`Participants:`, margin + 5, yPos);

                    evenement.participants.forEach((participant, pIndex) => {
                        addText(`Participant ${pIndex + 1}:`, margin + 10, yPos);
                        addText(`${participant.statut} ${participant.nom} ${participant.prenom} (${participant.affiliation})`, margin + 15, yPos);
                    });
                }
            });
        }

        // Ajout des positions actuelles
        if (teacher.positionsActuelles) { 
            doc.setFont('Helvetica', 'bold');
            addText(`POSITIONS ACTUELLES`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.positionsActuelles.forEach((position, index) => {
                addText(`Position ${index + 1}`, margin, yPos);
                addText(`Poste : ${position.poste}`, margin + 5, yPos);
                addText(`Université: ${position.universite}`, margin + 5, yPos);
                addText(`Département: ${position.departement}`, margin + 5, yPos);
                addText(`Année de début: ${position.anneeDebut}`, margin + 5, yPos);
                addText(`Année de fin: ${position.anneeFin}`, margin + 5, yPos);
                addText(`Institution: ${position.institution}`, margin + 5, yPos);
                addText(`Equipe: ${position.equipe}`, margin + 5, yPos);
                addText(`Superviseur: ${position.superviseur.statut} ${position.superviseur.nom} ${position.superviseur.prenom}`, margin + 5, yPos);
                addText(`Nombre de chercheurs: ${position.nombreChercheurs}`, margin + 5, yPos);
            });
        }

        // Ajout des positions précédentes
        if (teacher.positionsPrecedentes) { 
            doc.setFont('Helvetica', 'bold');
            addText(`POSITIONS PRECEDENTES`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.positionsPrecedentes.forEach((position, index) => {
                addText(`Position ${index + 1}`, margin, yPos);
                addText(`Poste : ${position.poste}`, margin + 5, yPos);
                addText(`Université: ${position.universite}`, margin + 5, yPos);
                addText(`Département: ${position.departement}`, margin + 5, yPos);
                addText(`Année de début: ${position.anneeDebut}`, margin + 5, yPos);
                addText(`Année de fin: ${position.anneeFin}`, margin + 5, yPos);
                addText(`Institution: ${position.institution}`, margin + 5, yPos);
                addText(`Equipe: ${position.equipe}`, margin + 5, yPos);
                addText(`Superviseur: ${position.superviseur.statut} ${position.superviseur.nom} ${position.superviseur.prenom}`, margin + 5, yPos);
                addText(`Nombre de chercheurs: ${position.nombreChercheurs}`, margin + 5, yPos);
            });
        }

        // Ajout des prix et nominations
        if (teacher.prixEtNominations) { 
            doc.setFont('Helvetica', 'bold');
            addText(`PRIX ET NOMINATIONS`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.prixEtNominations.forEach((prix, index) => {
                addText(`Prix/Nomination ${index + 1}`, margin, yPos);
                addText(`Année : ${prix.annee}`, margin + 5, yPos);
                addText(`Titre: ${prix.titre}`, margin + 5, yPos);
                addText(`Description: ${prix.description}`, margin + 5, yPos);
                if (prix.participants) {
                    addText(`Participants:`, margin + 5, yPos);
                    prix.participants.forEach((participant, i) => {
                        addText(`Participant ${i + 1}:`, margin + 10, yPos);
                        addText(`${participant.statut} ${participant.nom} ${participant.prenom}`, margin + 15, yPos);
                    });
                }
                yPos += 5; // Espacement supplémentaire après chaque prix/nomination
            });
        }
        
        // Ajout des publications
        if (teacher.publications) {
            doc.setFont('Helvetica', 'bold');
            addText(`PUBLICATIONS`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.publications.forEach((pub, index) => {
                addText(`Publication ${index + 1}`, margin, yPos);
                addText(`Titre: ${pub.titre}`, margin + 5, yPos);
                addText(`Pages: ${pub.pages}`, margin + 5, yPos);
                addText(`Annee: ${pub.annee}`, margin + 5, yPos);
                addText(`Type: ${pub.type}`, margin + 5, yPos);
                addText(`Auteurs: ${pub.auteurs}`, margin + 5, yPos);
            });
        }

        // Ajout des informations sur les relecteurs de revues
        if (teacher.relecteurDeRevues) {
            doc.setFont('Helvetica', 'bold');
            addText(`RELECTEURS DE REVUES`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.relecteurDeRevues.forEach((relecteur, index) => {
                addText(`Relecteur ${index + 1}`, margin, yPos);
                addText(`Titre de la revue: ${relecteur.titreRevue}`, margin + 5, yPos);
                addText(`Date de début: ${relecteur.dateDebut}`, margin + 5, yPos);
                addText(`Date de fin: ${relecteur.dateFin}`, margin + 5, yPos);
            });
        }

        // Ajout des responsabilités institutionnelles
        if (teacher.responsabilitesInstitutionnelles) {
            doc.setFont('Helvetica', 'bold');
            addText(`RESPONSABILITES INSTITUTIONNELLES`, margin, yPos);
            doc.setFont('Helvetica', 'normal');

            teacher.responsabilitesInstitutionnelles.forEach((responsabilite, index) => {
                addText(`Responsabilité ${index + 1}`, margin, yPos);
                addText(`Titre: ${responsabilite.titre}`, margin + 5, yPos);
                addText(`Institution: ${responsabilite.institution}`, margin + 5, yPos);
                addText(`Détails: ${responsabilite.details}`, margin + 5, yPos);
                addText(`Date de début: ${responsabilite.dateDebut}`, margin + 5, yPos);
                addText(`Date de fin: ${responsabilite.dateFin}`, margin + 5, yPos);
            });
        }
      
        doc.save('cv.pdf');
      };

      const activiteDelete = (idEn, idAct) => {
        deleteActiviteEnseignementFromEnseignant(idEn, idAct)
            .then((res) => {
                console.log('Activité d\'enseignement supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'activité d\'enseignement:', error);
            });
    };
    
    const conferenceDelete = (idEn, idConf) => {
        deleteConferenceInviteeFromEnseignant(idEn, idConf)
            .then((res) => {
                console.log('Conférence supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la conférence:', error);
            });
    };
    
    const contratDelete = (idEn, idCont) => {
        deleteContratDeRechercheFromEnseignant(idEn, idCont)
            .then((res) => {
                console.log('Contrat de recherche supprimé avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression du contrat de recherche:', error);
            });
    };
    
    const declarationDelete = (idEn, idDec) => {
        deleteDeclarationInventionFromEnseignant(idEn, idDec)
            .then((res) => {
                console.log('Déclaration d\'invention supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la déclaration d\'invention:', error);
            });
    };
    
    const educationDelete = (idEn, idEdu) => {
        deleteEducationFromEnseignant(idEn, idEdu)
            .then((res) => {
                console.log('Éducation supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'éducation:', error);
            });
    };
    
    const encadrementDelete = (idEn, idEnc) => {
        deleteEncadrementFromEnseignant(idEn, idEnc)
            .then((res) => {
                console.log('Encadrement supprimé avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'encadrement:', error);
            });
    };

    const membreComiteDelete = (idEn, idMembre) => {
        deleteMembreComiteProgrammeFromEnseignant(idEn, idMembre)
            .then((res) => {
                console.log('Membre du comité supprimé avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression du membre du comité:', error);
            });
    };
    
    const evenementDelete = (idEn, idEvenement) => {
        deleteOrganisationEvenementsInternationauxFromEnseignant(idEn, idEvenement)
            .then((res) => {
                console.log('Événement supprimé avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'événement:', error);
            });
    };
    
    const positionPrecenteDelete = (idEn, idPosition) => {
        deletePositionPrecedenteFromEnseignant(idEn, idPosition)
            .then((res) => {
                console.log('Position supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la position:', error);
            });
    };

    const positionActuelleDelete = (idEn, idPosition) => {
        deletePositionActuelleFromEnseignant(idEn, idPosition)
            .then((res) => {
                console.log('Position supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la position:', error);
            });
    };
    
    const prixEtNominationsDelete = (idEn, idPrix) => {
        deletePrixEtNominationsFromEnseignant(idEn, idPrix)
            .then((res) => {
                console.log('Prix et nominations supprimés avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression des prix et nominations:', error);
            });
    };
    
    const publicationDelete = (idEn, idPublication) => {
        deletePublicationFromEnseignant(idEn, idPublication)
            .then((res) => {
                console.log('Publication supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la publication:', error);
            });
    };
    
    const relecteurRevuesDelete = (idEn, idRelecteur) => {
        deleteRelecteurDeRevuesFromEnseignant(idEn, idRelecteur)
            .then((res) => {
                console.log('Relecteur de revues supprimé avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression du relecteur de revues:', error);
            });
    };
    
    const responsabiliteDelete = (idEn, idResponsabilite) => {
        deleteResponsabiliteInstitutionnelleFromEnseignant(idEn, idResponsabilite)
            .then((res) => {
                console.log('Responsabilité institutionnelle supprimée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de la responsabilité institutionnelle:', error);
            });
    };
    
  
    useEffect(() => {
        getUserById(id)
            .then((res) => {
                setTeacher(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            <Navbar/>
            <h2>Détails de l'Enseignant</h2>
            <div>
            <table className="table" style={{ width: '50%', margin: 'auto' }}>
                <tbody>
                    <tr>
                        <td>Prénom:</td>
                        <td>{teacher.prenom}</td>
                    </tr>
                    <tr>
                        <td>Nom:</td>
                        <td>{teacher.nom}</td>
                    </tr>
                    <tr>
                        <td>Date de naissance:</td>
                        <td>{teacher.dateDeNaissance}</td>
                    </tr>
                    <tr>
                        <td>Site web:</td>
                        <td>{teacher.urlDuSiteWeb}</td>
                    </tr>
                    <tr>
                        <td>Identifiant chercheur:</td>
                        <td>{teacher.identifiantChercheur}</td>
                    </tr>
                    <tr>
                        <td>Indice H:</td>
                        <td>{teacher.indiceH}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{teacher.email}</td>
                    </tr>
                    <tr>
                        <td>Téléphone:</td>
                        <td>{teacher.telephone}</td>
                    </tr>
                    <tr>
                        <td>Mots clés:</td>
                        <td>
                            {teacher.motsCles && teacher.motsCles.map((mot, index) => (
                            <span key={index}>{mot}{index !== teacher.motsCles.length - 1 ? ', ' : ''}</span>
                            ))}
                        </td>
                    </tr>
                    <tr>
                        <td><b>Activités Enseignant:</b></td>
                        <td>
                            <Link to={`/generateCv/addActiviteEnseignement/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.activitesEnseignement && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.activitesEnseignement && 
                                            teacher.activitesEnseignement.map((activite, index) => (
                                                <li>
                                                    <tr>
                                                        <td>Activité {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => activiteDelete(teacher.id, activite.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr key={index}>
                                                        <td>Titre:</td>
                                                        <td>{activite.titre}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{activite.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{activite.dateFin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Université:</td>
                                                        <td>{activite.universite}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pays:</td>
                                                        <td>{activite.pays}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Conférences Invitées:</b></td>
                        <td>
                            <Link to={`/generateCv/addConferenceInvitee/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.conferenceInvitees && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.conferenceInvitees.map((conference, index) => (
                                                <li>
                                                    <tr>
                                                        <td>Conférence {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => conferenceDelete(teacher.id, conference.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr key={index}>
                                                        <td>Date:</td>
                                                        <td>{conference.date}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description:</td>
                                                        <td>{conference.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Lieu:</td>
                                                        <td>{conference.lieu}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Contrats de Recherche:</b></td>
                        <td>
                            <Link to={`/generateCv/addContratDeRecherche/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.contratsDeRecherche && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.contratsDeRecherche && 
                                            teacher.contratsDeRecherche.map((contrat, index) => (
                                                <li>
                                                    <tr>
                                                        <td>Contrat de Recherche {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => contratDelete(teacher.id, contrat.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr key={index}>
                                                        <td>Nom:</td>
                                                        <td>{contrat.nom}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Titre:</td>
                                                        <td>{contrat.titre}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sponsor:</td>
                                                        <td>{contrat.sponsor}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Montant Total:</td>
                                                        <td>{contrat.montantTotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Montant pour l'Équipe:</td>
                                                        <td>{contrat.montantPourEquipe}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Période de Début:</td>
                                                        <td>{contrat.periodeDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Période de Fin:</td>
                                                        <td>{contrat.periodeFin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Implication:</td>
                                                        <td>{contrat.implication}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Déclarations d'Invention:</b></td>
                        <td>
                            <Link to={`/generateCv/addDeclarationInvention/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.declarationDInvention && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.declarationDInvention && 
                                            teacher.declarationDInvention.map((declaration, index) => (
                                                <li>
                                                    <tr>
                                                        <td>Déclaration {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => declarationDelete(teacher.id, declaration.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr key={index}>
                                                        <td>Année:</td>
                                                        <td>{declaration.annee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nom de l'invention:</td>
                                                        <td>{declaration.nomInvention}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description:</td>
                                                        <td>{declaration.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Statut:</td>
                                                        <td>{declaration.statut}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Éducation:</b></td>
                        <td>
                            <Link to={`/generateCv/addEducation/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.educations && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.educations && 
                                            teacher.educations.map((education, index) => (
                                                <li>
                                                    <tr>
                                                        <td>Éducation {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => educationDelete(teacher.id, education.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr key={index}>
                                                        <td>Diplôme:</td>
                                                        <td>{education.diplome}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Domaine:</td>
                                                        <td>{education.domaine}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Université:</td>
                                                        <td>{education.universite}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Sujet:</td>
                                                        <td>{education.sujet}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Superviseur:</td>
                                                        <td>
                                                            Nom: {education.superviseur && education.superviseur.nom}<br/> 
                                                            Prénom: {education.superviseur && education.superviseur.prenom}<br/>
                                                            Titre: {education.superviseur && education.superviseur.statut}<br/>
                                                            Financement: {education.superviseur && education.superviseur.financement}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Financement:</td>
                                                        <td>{education.financement}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{education.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{education.dateFin}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Encadrements:</b></td>
                        <td>
                            <Link to={`/generateCv/addEncadrement/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.encadrementDesEtudiants && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.encadrementDesEtudiants && 
                                            teacher.encadrementDesEtudiants.map((encadrement, index) => (
                                                <li>
                                                    <tr>
                                                        <td>Encadrement {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => encadrementDelete(teacher.id, encadrement.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr key={index}>
                                                        <td>Nom:</td>
                                                        <td>{encadrement.nom}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Statut:</td>
                                                        <td>{encadrement.statut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{encadrement.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{encadrement.dateFin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Projet:</td>
                                                        <td>{encadrement.projet}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Financement:</td>
                                                        <td>{encadrement.financement}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Superviseurs:</td>
                                                        <td>
                                                            {encadrement.superviseurs && encadrement.superviseurs.map((superviseur, i) => (
                                                                <div key={i}>
                                                                    <div>Nom: {superviseur.nom}</div>
                                                                    <div>Prénom: {superviseur.prenom}</div>
                                                                    <div>Statut: {superviseur.statut}</div>
                                                                    <div>Pourcentage de financement: {superviseur.pourcentageFinancement}%</div>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Emploi Actuel:</td>
                                                        <td>{encadrement.emploiActuel}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Membres du Comité de Programme:</b></td>
                        <td>
                            <Link to={`/generateCv/addMembreComiteProgramme/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.membresComiteProgramme && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.membresComiteProgramme.map((membre, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Membre {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => membreComiteDelete(teacher.id, membre.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Conférence:</td>
                                                        <td>{membre.conference}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{membre.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{membre.dateFin}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Organisation d'Événements Internationaux:</b></td>
                        <td>
                            <Link to={`/generateCv/addOrganisationEvenementsInternationaux/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.organisationEvenementsInternationaux && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.organisationEvenementsInternationaux.map((evenement, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Événement {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => evenementDelete(teacher.id, evenement.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Titre:</td>
                                                        <td>{evenement.titre}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{evenement.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{evenement.dateFin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Détails:</td>
                                                        <td>{evenement.details}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Participants:</td>
                                                        <td>
                                                            {evenement.participants && evenement.participants.map((participant, i) => (
                                                                <div key={i}>
                                                                    <div>Nom: {participant.nom}</div>
                                                                    <div>Prénom: {participant.prenom}</div>
                                                                    <div>Statut: {participant.statut}</div>
                                                                    <div>Affiliation: {participant.affiliation}</div>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Positions Actuelles:</b></td>
                        <td>
                            <Link to={`/generateCv/addPositionActuelle/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.positionsActuelles && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.positionsActuelles.map((position, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Position {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => positionActuelleDelete(teacher.id, position.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Poste:</td>
                                                        <td>{position.poste}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Université:</td>
                                                        <td>{position.universite}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Département:</td>
                                                        <td>{position.departement}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Année de début:</td>
                                                        <td>{position.anneeDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Année de fin:</td>
                                                        <td>{position.anneeFin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Institution:</td>
                                                        <td>{position.institution}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Équipe:</td>
                                                        <td>{position.equipe}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Superviseurs:</td>
                                                        <td>
                                                            {position.superviseurs && position.superviseurs.map((superviseur, i) => (
                                                                <div key={i}>
                                                                    <div>Nom: {superviseur.nom}</div>
                                                                    <div>Prénom: {superviseur.prenom}</div>
                                                                    <div>Statut: {superviseur.statut}</div>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nombre de chercheurs:</td>
                                                        <td>{position.nombreChercheurs}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Positions Pécédentes:</b></td>
                        <td>
                            <Link to={`/generateCv/addPositionPrecedente/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.positionsPrecedentes && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.positionsPrecedentes.map((position, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Position {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => positionPrecenteDelete(teacher.id, position.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Poste:</td>
                                                        <td>{position.poste}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Université:</td>
                                                        <td>{position.universite}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Département:</td>
                                                        <td>{position.departement}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Année de début:</td>
                                                        <td>{position.anneeDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Année de fin:</td>
                                                        <td>{position.anneeFin}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Institution:</td>
                                                        <td>{position.institution}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Équipe:</td>
                                                        <td>{position.equipe}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Superviseurs:</td>
                                                        <td>
                                                            {position.superviseurs && position.superviseurs.map((superviseur, i) => (
                                                                <div key={i}>
                                                                    <div>Nom: {superviseur.nom}</div>
                                                                    <div>Prénom: {superviseur.prenom}</div>
                                                                    <div>Statut: {superviseur.statut}</div>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Nombre de chercheurs:</td>
                                                        <td>{position.nombreChercheurs}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Prix et Nominations:</b></td>
                        <td>
                            <Link to={`/generateCv/addPrixEtNominations/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.prixEtNominations && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.prixEtNominations.map((prix, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Prix ou Nomination {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => prixEtNominationsDelete(teacher.id, prix.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Année:</td>
                                                        <td>{prix.annee}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Titre:</td>
                                                        <td>{prix.titre}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Description:</td>
                                                        <td>{prix.description}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Participants:</td>
                                                        <td>
                                                            <ul>
                                                                {prix.participants && prix.participants.map((participant, i) => (
                                                                    <li key={i}>
                                                                        <div>Nom: {participant.nom}</div>
                                                                        <div>Prénom: {participant.prenom}</div>
                                                                        <div>Statut: {participant.statut}</div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Publications:</b></td>
                        <td>
                            <Link to={`/generateCv/addPublication/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.publications && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.publications.map((publication, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Publication {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => publicationDelete(teacher.id, publication.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    {publication.titre && (
                                                        <tr>
                                                            <td>Titre:</td>
                                                            <td>{publication.titre}</td>
                                                        </tr>
                                                    )}
                                                    {publication.type && (
                                                        <tr>
                                                            <td>Type de publication:</td>
                                                            <td>{publication.type}</td>
                                                        </tr>
                                                    )}
                                                    {publication.pages && (
                                                        <tr>
                                                            <td>Pages:</td>
                                                            <td>{publication.pages}</td>
                                                        </tr>
                                                    )}
                                                    {publication.annee !== null && (
                                                        <tr>
                                                            <td>Année:</td>
                                                            <td>{publication.annee}</td>
                                                        </tr>
                                                    )}
                                                    {publication.lien && (
                                                        <tr>
                                                            <td>Lien:</td>
                                                            <td>{publication.lien}</td>
                                                        </tr>
                                                    )}
                                                    {publication.url && (
                                                        <tr>
                                                            <td>URL:</td>
                                                            <td>{publication.url}</td>
                                                        </tr>
                                                    )}
                                                    {publication.volume && (
                                                        <tr>
                                                            <td>Volume:</td>
                                                            <td>{publication.volume}</td>
                                                        </tr>
                                                    )}
                                                    {publication.journal && (
                                                        <tr>
                                                            <td>Journal:</td>
                                                            <td>{publication.journal}</td>
                                                        </tr>
                                                    )}
                                                    {publication.livre && (
                                                        <tr>
                                                            <td>Livre:</td>
                                                            <td>{publication.livre}</td>
                                                        </tr>
                                                    )}
                                                    {publication.crossref && (
                                                        <tr>
                                                            <td>Crossref:</td>
                                                            <td>{publication.crossref}</td>
                                                        </tr>
                                                    )}
                                                    {publication.auteurs.length > 0 && (
                                                        <tr>
                                                            <td>Auteurs:</td>
                                                            <td>{publication.auteurs.join(', ')}</td>
                                                        </tr>
                                                    )}
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Relecteurs de Revues:</b></td>
                        <td>
                            <Link to={`/generateCv/addRelecteurDeRevues/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.relecteurDeRevues && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.relecteurDeRevues.map((relecteur, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Relecteur {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => relecteurRevuesDelete(teacher.id, relecteur.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Titre de la Revue:</td>
                                                        <td>{relecteur.titreRevue}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{relecteur.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{relecteur.dateFin}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    <tr>
                        <td><b>Responsabilités Institutionnelles:</b></td>
                        <td>
                            <Link to={`/generateCv/addResponsabiliteInstitutionnelle/${teacher.id}`} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>  
                        <td colSpan="2">
                            <ul>
                                {teacher.responsabilitesInstitutionnelles && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.responsabilitesInstitutionnelles.map((responsabilite, index) => (
                                                <li key={index}>
                                                    <tr>
                                                        <td>Responsabilité {index + 1}</td>
                                                        <td>
                                                            <button onClick={() => responsabiliteDelete(teacher.id, responsabilite.id)} className="black btn btn-sm btn-danger ms-1">
                                                                Supprimer
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Titre:</td>
                                                        <td>{responsabilite.titre}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Institution:</td>
                                                        <td>{responsabilite.institution}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Détails:</td>
                                                        <td>{responsabilite.details}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de début:</td>
                                                        <td>{responsabilite.dateDebut}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date de fin:</td>
                                                        <td>{responsabilite.dateFin}</td>
                                                    </tr>
                                                    <br/>
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr>

                    {/* <tr>
                        <td><b>Publications:</b></td>
                        <td>
                            <Link to={'/generateCv/addPublication/' + teacher.id} className="black btn btn-sm btn-primary">Ajouter</Link>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <ul>
                                {teacher.publications && (
                                    <table className="table" style={{ width: '80%', margin: 'auto' }}>
                                        <tbody>
                                            {teacher.publications.map((publication, index) => (
                                                <li key={index}>
                                                    <tr>
                                                      <td>Publication {cpt1++} </td>
                                                      <td>
                                                        <button onClick={() => publicationDelete(teacher.id,publication.id)} className="black btn btn-sm btn-danger ms-1">
                                                        Supprimer
                                                        </button>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Auteurs:</td>
                                                        <td>{publication.authors}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Titre:</td>
                                                        <td>{publication.title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Publication:</td>
                                                        <td>{publication.publication}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Volume:</td>
                                                        <td>{publication.volume}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Number:</td>
                                                        <td>{publication.number}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pages:</td>
                                                        <td>{publication.pages}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Année:</td>
                                                        <td>{publication.year}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Éditeur:</td>
                                                        <td>{publication.publisher}</td>
                                                    </tr>
                                                    <br />
                                                </li>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </ul>
                        </td>
                    </tr> */}

                </tbody>
            </table>
                {/* Bouton pour générer le fichier PDF */}
                <button className="black btn btn-sm btn-danger ms-1" onClick={generatePDF}>Générer PDF</button>
            </div>
        </div>
    );
}

export default GenerateCV;
