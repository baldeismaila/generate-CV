import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addActiviteEnseignementToEnseignant } from '../services/backend';
import Navbar from './Navbar';

const AddActiviteEnseignement = () => {
    const [activiteEnseignement, setActiviteEnseignement] = useState({
        titre: '',
        description: '',
        anneeDebut: '',
        anneeFin: '',
        universite: '',
        pays: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setActiviteEnseignement({
            ...activiteEnseignement,
            [e.target.name]: e.target.value
        });
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addActiviteEnseignementHandler = (e) => {
        e.preventDefault();

        addActiviteEnseignementToEnseignant(id, activiteEnseignement)
            .then((res) => {
                console.log('Activité d\'enseignement ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de l\'activité d\'enseignement:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Activité d'Enseignement</div>

                            <div className="card-body">
                                <form onSubmit={addActiviteEnseignementHandler}>
                                    <div className="mb-3">
                                        <label>Titre</label>
                                        <input
                                            type="text"
                                            name="titre"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={activiteEnseignement.titre}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={activiteEnseignement.description}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Année de Début</label>
                                        <input
                                            type="date"
                                            name="anneeDebut"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(activiteEnseignement.anneeDebut)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Année de Fin</label>
                                        <input
                                            type="date"
                                            name="anneeFin"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(activiteEnseignement.anneeFin)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Université</label>
                                        <input
                                            type="text"
                                            name="universite"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={activiteEnseignement.universite}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Pays</label>
                                        <input
                                            type="text"
                                            name="pays"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={activiteEnseignement.pays}
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

export default AddActiviteEnseignement;
