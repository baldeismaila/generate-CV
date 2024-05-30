import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPositionPrecedentToEnseignant } from '../services/backend'; // Vérifiez l'importation du service backend
import Navbar from './Navbar';

function AddPositionPrecedente() {
    const [position, setPosition] = useState({
        poste: '',
        universite: '',
        departement: '',
        anneeDebut: '',
        anneeFin: '',
        institution: '',
        equipe: '',
        superviseur: {
            nom: '',
            prenom: '',
            statut: ''
        },
        nombreChercheurs: 0
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const [showSuperviseur, setShowSuperviseur] = useState(false);

    const toggleSuperviseurFields = () => {
        setShowSuperviseur(!showSuperviseur);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
        if (e.target.name === 'superviseur') {
            setPosition({
                ...position,
                superviseur: {
                    ...position.superviseur,
                    [e.target.id]: value
                }
            });
        } else {
            setPosition({
                ...position,
                [e.target.name]: value
            });
        }
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addPositionHandler = (e) => {
        e.preventDefault();

        addPositionPrecedentToEnseignant(id, position)
            .then((res) => {
                console.log('Position ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la position:', error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Position Actuelle</div>

                            <div className="card-body">
                                <form onSubmit={addPositionHandler}>
                                    <div className="mb-3">
                                        <label>Poste</label>
                                        <input
                                            type="text"
                                            name="poste"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={position.poste}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Université</label>
                                        <input
                                            type="text"
                                            name="universite"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={position.universite}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Département</label>
                                        <input
                                            type="text"
                                            name="departement"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={position.departement}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Année de Début</label>
                                        <input
                                            type="date"
                                            name="anneeDebut"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(position.anneeDebut)}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Année de Fin</label>
                                        <input
                                            type="date"
                                            name="anneeFin"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(position.anneeFin)}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Institution</label>
                                        <input
                                            type="text"
                                            name="institution"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={position.institution}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <label>Equipe</label>
                                        <input
                                            type="text"
                                            name="equipe"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={position.equipe}
                                            required />
                                    </div>
                                    <div className="mb-3">
                                        <button type="button" className="btn btn-primary" onClick={toggleSuperviseurFields}>
                                            {showSuperviseur ? 'Masquer le Superviseur' : 'Afficher le Superviseur'}
                                        </button>
                                    </div>
                                    {showSuperviseur && (
                                        <>
                                            <div className="mb-3">
                                                <label>Nom du Superviseur</label>
                                                <input
                                                    type="text"
                                                    id="nom"
                                                    name="superviseur"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={position.superviseur.nom}
                                                    required />
                                            </div>
                                            <div className="mb-3">
                                                <label>Prénom du Superviseur</label>
                                                <input
                                                    type="text"
                                                    id="prenom"
                                                    name="superviseur"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={position.superviseur.prenom}
                                                    required />
                                            </div>
                                            <div className="mb-3">
                                                <label>Statut du Superviseur</label>
                                                <input
                                                    type="text"
                                                    id="statut"
                                                    name="superviseur"
                                                    className="form-control"
                                                    onChange={handleChange}
                                                    value={position.superviseur.statut}
                                                    required />
                                            </div>
                                        </>
                                    )}
                                    <div className="mb-3">
                                        <label>Nombre de Chercheurs</label>
                                        <input
                                            type="number"
                                            name="nombreChercheurs"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={position.nombreChercheurs}
                                            required />
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
}

export default AddPositionPrecedente;
