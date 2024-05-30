import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addConferenceInviteeToEnseignant } from '../services/backend'; // Vérifiez l'importation du service backend
import Navbar from './Navbar';

const AddConferenceInvitee = () => {
    const [conferenceInvitee, setConferenceInvitee] = useState({
        date: '',
        description: '',
        lieu: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setConferenceInvitee({
            ...conferenceInvitee,
            [e.target.name]: e.target.value
        });
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addConferenceInviteeHandler = (e) => {
        e.preventDefault();

        addConferenceInviteeToEnseignant(id, conferenceInvitee)
            .then((res) => {
                console.log('Conférence invitée ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la conférence invitée:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Conférence Invitée</div>

                            <div className="card-body">
                                <form onSubmit={addConferenceInviteeHandler}>
                                    <div className="mb-3">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(conferenceInvitee.date)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={conferenceInvitee.description}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Lieu</label>
                                        <input
                                            type="text"
                                            name="lieu"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={conferenceInvitee.lieu}
                                            required
                                        />
                                    </div>
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

export default AddConferenceInvitee;
