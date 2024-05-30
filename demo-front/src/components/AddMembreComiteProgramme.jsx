import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addMembreComiteProgrammeToEnseignant } from '../services/backend'; // Vérifiez l'importation du service backend
import Navbar from './Navbar';

const AddMembreComiteProgramme = () => {
    const [membreComiteProgramme, setMembreComiteProgramme] = useState({
        conference: '',
        dateDebut: '',
        dateFin: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setMembreComiteProgramme({
            ...membreComiteProgramme,
            [e.target.name]: e.target.value
        });
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addMembreComiteProgrammeHandler = (e) => {
        e.preventDefault();

        addMembreComiteProgrammeToEnseignant(id, membreComiteProgramme)
            .then((res) => {
                console.log('Membre du comité de programme ajouté avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du membre du comité de programme:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter un Membre du Comité de Programme</div>

                            <div className="card-body">
                                <form onSubmit={addMembreComiteProgrammeHandler}>
                                    <div className="mb-3">
                                        <label>Conférence</label>
                                        <input
                                            type="text"
                                            name="conference"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={membreComiteProgramme.conference}
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
                                            value={formatDate(membreComiteProgramme.dateDebut)}
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
                                            value={formatDate(membreComiteProgramme.dateFin)}
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

export default AddMembreComiteProgramme;
