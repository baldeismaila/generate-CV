import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addRelecteurDeRevuesToEnseignant } from '../services/backend'; // Vérifiez l'importation du service backend
import Navbar from './Navbar';

const AddRelecteurDeRevues = () => {
    const [relecteurDeRevues, setRelecteurDeRevues] = useState({
        titreRevue: '',
        dateDebut: '',
        dateFin: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setRelecteurDeRevues({
            ...relecteurDeRevues,
            [e.target.name]: e.target.value
        });
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addRelecteurDeRevuesHandler = (e) => {
        e.preventDefault();

        addRelecteurDeRevuesToEnseignant(id, relecteurDeRevues)
            .then((res) => {
                console.log('Relecteur de revues ajouté avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du relecteur de revues:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter un Relecteur de Revues</div>

                            <div className="card-body">
                                <form onSubmit={addRelecteurDeRevuesHandler}>
                                    <div className="mb-3">
                                        <label>Titre de la Revue</label>
                                        <input
                                            type="text"
                                            name="titreRevue"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={relecteurDeRevues.titreRevue}
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
                                            value={formatDate(relecteurDeRevues.dateDebut)}
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
                                            value={formatDate(relecteurDeRevues.dateFin)}
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

export default AddRelecteurDeRevues;
