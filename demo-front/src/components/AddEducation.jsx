import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addEducationToEnseignant } from '../services/backend'; // Assurez-vous d'importer le bon service backend
import Navbar from './Navbar';

const AddEducation = () => {
    const [education, setEducation] = useState({
        diplome: '',
        domaine: '',
        universite: '',
        sujet: '',
        superviseur: {
            nom: "",
            prenom: "",
            statut: ""
        },
        financement: '',
        dateDebut: '',
        dateFin: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("superviseur.")) {
            const superviseurField = name.split(".")[1];
            setEducation(prevEducation => ({
                ...prevEducation,
                superviseur: {
                    ...prevEducation.superviseur,
                    [superviseurField]: value
                }
            }));
        } else {
            setEducation(prevEducation => ({
                ...prevEducation,
                [name]: value
            }));
        }
      };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addEducationHandler = (e) => {
        e.preventDefault();

        addEducationToEnseignant(id, education)
            .then((res) => {
                console.log('Éducation ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de l\'éducation:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Éducation</div>

                            <div className="card-body">
                                <form onSubmit={addEducationHandler}>
                                    <div className="mb-3">
                                        <label>Diplôme</label>
                                        <input
                                            type="text"
                                            name="diplome"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={education.diplome}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Domaine</label>
                                        <input
                                            type="text"
                                            name="domaine"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={education.domaine}
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
                                            value={education.universite}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Sujet</label>
                                        <input
                                            type="text"
                                            name="sujet"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={education.sujet}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Superviseur - Nom</label>
                                        <input
                                            type="text"
                                            name="superviseur.nom"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={education.superviseur.nom}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Superviseur - Prénom</label>
                                        <input
                                            type="text"
                                            name="superviseur.prenom"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={education.superviseur.prenom}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Superviseur - Titre</label>
                                        <input
                                            type="text"
                                            name="superviseur.statut"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={education.superviseur.statut}
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
                                            value={education.financement}
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
                                            value={formatDate(education.dateDebut)}
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
                                            value={formatDate(education.dateFin)}
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

export default AddEducation;
