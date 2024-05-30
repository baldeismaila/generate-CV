import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDeclarationInventionToEnseignant } from '../services/backend'; // Vérifiez l'importation du service backend
import Navbar from './Navbar';

const AddDeclarationInvention = () => {
    const [declarationInvention, setDeclarationInvention] = useState({
        annee: '',
        nomInvention: '',
        description: '',
        statut: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setDeclarationInvention({
            ...declarationInvention,
            [e.target.name]: e.target.value
        });
    };

    // Méthode pour formater l'année
    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const addDeclarationInventionHandler = (e) => {
        e.preventDefault();

        addDeclarationInventionToEnseignant(id, declarationInvention)
            .then((res) => {
                console.log('Déclaration d\'invention ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la déclaration d\'invention:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Déclaration d'Invention</div>

                            <div className="card-body">
                                <form onSubmit={addDeclarationInventionHandler}>
                                    <div className="mb-3">
                                        <label>Année</label>
                                        <input
                                            type="date"
                                            name="annee"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formatDate(declarationInvention.annee)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Nom de l'Invention</label>
                                        <input
                                            type="text"
                                            name="nomInvention"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={declarationInvention.nomInvention}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={declarationInvention.description}
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
                                            value={declarationInvention.statut}
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

export default AddDeclarationInvention;
