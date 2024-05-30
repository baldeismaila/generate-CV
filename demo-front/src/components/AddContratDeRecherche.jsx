import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addContratDeRechercheToEnseignant } from '../services/backend'; // Assurez-vous que le service backend est correctement importé
import Navbar from './Navbar';

const AddContratDeRecherche = () => {
    const [contratDeRecherche, setContratDeRecherche] = useState({
        nom: '',
        titre: '',
        sponsor: '',
        montantTotal: '',
        montantPourEquipe: '',
        periodeDebut: '',
        periodeFin: '',
        implication: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setContratDeRecherche({
            ...contratDeRecherche,
            [e.target.name]: e.target.value
        });
    };

    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addContratDeRechercheHandler = (e) => {
        e.preventDefault();

        addContratDeRechercheToEnseignant(id, contratDeRecherche)
            .then((res) => {
                console.log('Contrat de recherche ajouté avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout du contrat de recherche:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter un Contrat de Recherche</div>

                            <div className="card-body">
                                <form onSubmit={addContratDeRechercheHandler}>
                                    <div className="mb-3">
                                        <label>Nom</label>
                                        <input
                                            type="text"
                                            name="nom"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={contratDeRecherche.nom}
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
                                            value={contratDeRecherche.titre}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Sponsor</label>
                                        <input
                                            type="text"
                                            name="sponsor"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={contratDeRecherche.sponsor}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Montant Total</label>
                                        <input
                                            type="text"
                                            name="montantTotal"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={contratDeRecherche.montantTotal}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Montant pour l'équipe</label>
                                        <input
                                            type="text"
                                            name="montantPourEquipe"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={contratDeRecherche.montantPourEquipe}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Période de Début</label>
                                        <input
                                            type="date"
                                            name="periodeDebut"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(contratDeRecherche.periodeDebut)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Période de Fin</label>
                                        <input
                                            type="date"
                                            name="periodeFin"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(contratDeRecherche.periodeFin)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Implication</label>
                                        <input
                                            type="text"
                                            name="implication"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={contratDeRecherche.implication}
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

export default AddContratDeRecherche;
