import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addOrganisationEvenementsInternationauxToEnseignant } from '../services/backend'; // Assurez-vous de bien importer le service backend
import Navbar from './Navbar';

const AddOrganisationEvenementsInternationaux = () => {
    const [organisationEvenementsInternationaux, setOrganisationEvenementsInternationaux] = useState({
        titre: '',
        dateDebut: '',
        dateFin: '',
        participants: [
            {
                nom: '',
                prenom: '',
                statut: '',
                affiliation: ''
            }
        ],
        details: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("participants.")) {
            const [index, subfield] = name.split(".");
            const updatedParticipants = [...organisationEvenementsInternationaux.participants];
            updatedParticipants[index][subfield] = value;
            setOrganisationEvenementsInternationaux(prevParticipant => ({
                ...prevParticipant,
                participants: updatedParticipants
            }));
        } else {
            setOrganisationEvenementsInternationaux(prevParticipant => ({
                ...prevParticipant,
                [name]: value
            }));
        }
    };

    const ajouterParticipant = () => {
        setOrganisationEvenementsInternationaux(prevOrganisationEvenementsInternationaux => ({
            ...prevOrganisationEvenementsInternationaux,
            participants: [...prevOrganisationEvenementsInternationaux.participants, 
                {
                    nom: '',
                    prenom: '',
                    statut: '',
                    affiliation: ''
                }
            ]
        }));
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        return new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
    };

    const addOrganisationEvenementsInternationauxHandler = (e) => {
        e.preventDefault();

        addOrganisationEvenementsInternationauxToEnseignant(id, organisationEvenementsInternationaux)
            .then((res) => {
                console.log('Organisation d\'événements internationaux ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de l\'organisation d\'événements internationaux:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Organisation d'Événements Internationaux</div>

                            <div className="card-body">
                                <form onSubmit={addOrganisationEvenementsInternationauxHandler}>
                                    <div className="mb-3">
                                        <label>Titre</label>
                                        <input
                                            type="text"
                                            name="titre"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={organisationEvenementsInternationaux.titre}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Date de Début</label>
                                        <input
                                            type="date"
                                            name="dateDebut"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(organisationEvenementsInternationaux.dateDebut)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Date de Fin</label>
                                        <input
                                            type="date"
                                            name="dateFin"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(organisationEvenementsInternationaux.dateFin)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Détails</label>
                                        <textarea
                                            name="details"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={organisationEvenementsInternationaux.details}
                                            required
                                        />
                                    </div>

                                    {organisationEvenementsInternationaux.participants.map((participant, index) => (
                                        <div key={index}>
                                            <div className="mb-3">
                                                <label>Participant {index + 1} - Nom</label>
                                                <input
                                                    type="text"
                                                    name={`participants.${index}.nom`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={participant.nom}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Participant {index + 1} - Prénom</label>
                                                <input
                                                    type="text"
                                                    name={`participants.${index}.prenom`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={participant.prenom}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Participant {index + 1} - Titre</label>
                                                <input
                                                    type="text"
                                                    name={`participants.${index}.statut`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={participant.statut}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Participant {index + 1} - Affiliation</label>
                                                <input
                                                    type="text"
                                                    name={`participants.${index}.affiliation`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={participant.affiliation}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={ajouterParticipant}>Ajouter un participant</button>
                                    <br/><br/>

                                    <button className="btn btn-primary col-md-12">Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOrganisationEvenementsInternationaux;
