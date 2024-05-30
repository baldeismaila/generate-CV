import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEncadrementToEnseignant } from '../services/backend';
import Navbar from './Navbar';

const AddEncadrement = () => {
    const [encadrement, setEncadrement] = useState({
        nom: '',
        statut: '',
        dateDebut: '',
        dateFin: '',
        projet: '',
        financement: '',
        superviseurs: [
            {
                nom: '',
                prenom: '',
                statut: '',
                pourcentageFinancement: ''
            }
        ],
        emploiActuel: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("superviseurs.")) {
            const [index, subfield] = name.split(".");
            const updatedSuperviseurs = [...encadrement.superviseurs];
            updatedSuperviseurs[index][subfield] = value;
            setEncadrement(prevEncadrement => ({
                ...prevEncadrement,
                superviseurs: updatedSuperviseurs
            }));
        } else {
            setEncadrement(prevEncadrement => ({
                ...prevEncadrement,
                [name]: value
            }));
        }
    };

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const addSuperviseur = () => {
        setEncadrement(prevEncadrement => ({
            ...prevEncadrement,
            superviseurs: [
                ...prevEncadrement.superviseurs,
                {
                    nom: '',
                    prenom: '',
                    statut: '',
                    pourcentageFinancement: ''
                }
            ]
        }));
    };

    const addEncadrementHandler = (e) => {
        e.preventDefault();
        //console.log(encadrement);

        addEncadrementToEnseignant(id, encadrement)
            .then((res) => {
                console.log('Encadrement ajouté avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de l\'encadrement:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter un Encadrement</div>

                            <div className="card-body">
                                <form onSubmit={addEncadrementHandler}>
                                    <div className="mb-3">
                                        <label>Nom</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={encadrement.nom}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Statut</label>
                                        <input
                                            type="text"
                                            name="statut"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={encadrement.statut}
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
                                            value={formatDate(encadrement.dateDebut)}
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
                                            value={formatDate(encadrement.dateFin)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Projet</label>
                                        <input
                                            type="text"
                                            name="projet"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={encadrement.projet}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Financement</label>
                                        <input
                                            type="text"
                                            name="financement"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={encadrement.financement}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Emploi Actuel</label>
                                        <input
                                            type="text"
                                            name="emploiActuel"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={encadrement.emploiActuel}
                                            required
                                        />
                                    </div>
                                    {encadrement.superviseurs.map((superviseur, index) => (
                                        <div key={index}>
                                            <div className="mb-3">
                                                <label>Superviseur {index + 1} - Nom</label>
                                                <input
                                                    type="text"
                                                    name={`superviseurs.${index}.nom`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={superviseur.nom}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Superviseur {index + 1} - Prénom</label>
                                                <input
                                                    type="text"
                                                    name={`superviseurs.${index}.prenom`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={superviseur.prenom}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Superviseur {index + 1} - Titre</label>
                                                <input
                                                    type="text"
                                                    name={`superviseurs.${index}.statut`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={superviseur.statut}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label>Superviseur {index + 1} - Pourcentage Financement</label>
                                                <input
                                                    type="text"
                                                    name={`superviseurs.${index}.pourcentageFinancement`}
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={superviseur.pourcentageFinancement}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={addSuperviseur}>Ajouter un superviseur</button>
                                    <br/><br/>
                                    <button className="btn btn-primary col-md-12 mt-3">Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEncadrement;
