import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPrixEtNominationsToEnseignant } from '../services/backend'; // Vérifiez l'importation du service backend
import Navbar from './Navbar';

const AddPrixEtNominations = () => {
    const [prixEtNominations, setPrixEtNominations] = useState({
        annee: '',
        titre: '',
        description: '',
        participants: [
            {
                nom: '',
                prenom: '',
                statut: ''
            }
        ]
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("participants.")) {
            const [index, subfield] = name.split(".");
            const updatedParticipants = [...prixEtNominations.participants];
            updatedParticipants[index][subfield] = value;
            setPrixEtNominations(prevParticipant => ({
                ...prevParticipant,
                participants: updatedParticipants
            }));
        } else {
            setPrixEtNominations(prevParticipant => ({
                ...prevParticipant,
                [name]: value
            }));
        }
    };

    const ajouterParticipant = () => {
        setPrixEtNominations(prevPrixEtNominations => ({
            ...prevPrixEtNominations,
            participants: [...prevPrixEtNominations.participants, 
                {
                    nom: '',
                    prenom: '',
                    statut: ''
                }
            ]
        }));
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addPrixEtNominationsHandler = (e) => {
        e.preventDefault();

        addPrixEtNominationsToEnseignant(id, {
            ...prixEtNominations,
            annee: formatDate(prixEtNominations.annee)
        })
            .then((res) => {
                console.log('Prix et nominations ajoutés avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout des prix et nominations:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter un Prix et des Nominations</div>

                            <div className="card-body">
                                <form onSubmit={addPrixEtNominationsHandler}>
                                    <div className="mb-3">
                                        <label>Année</label>
                                        <input
                                            type="date"
                                            name="annee"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(prixEtNominations.annee)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Titre</label>
                                        <input
                                            type="text"
                                            name="titre"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={prixEtNominations.titre}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={prixEtNominations.description}
                                            required
                                        />
                                    </div>
                                    {prixEtNominations.participants.map((participant, index) => (
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

export default AddPrixEtNominations;
