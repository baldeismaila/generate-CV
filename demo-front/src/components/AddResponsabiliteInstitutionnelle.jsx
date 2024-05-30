import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addResponsabiliteInstitutionnelleToEnseignant } from '../services/backend'; // Assurez-vous que le service backend est correctement importé
import Navbar from './Navbar';

const AddResponsabiliteInstitutionnelle = () => {
    const [responsabiliteInstitutionnelle, setResponsabiliteInstitutionnelle] = useState({
        titre: '',
        institution: '',
        details: '',
        dateDebut: '',
        dateFin: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponsabiliteInstitutionnelle({
            ...responsabiliteInstitutionnelle,
            [name]: value
        });
    };

    const formatDate = (date) => {
        if (!date) return '';
        const formattedDate = new Date(date).toISOString().split('T')[0];
        return formattedDate;
    };

    const addResponsabiliteInstitutionnelleHandler = (e) => {
        e.preventDefault();

        addResponsabiliteInstitutionnelleToEnseignant(id, responsabiliteInstitutionnelle)
            .then((res) => {
                console.log('Responsabilité institutionnelle ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la responsabilité institutionnelle:', error);
            });
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Responsabilité Institutionnelle</div>

                            <div className="card-body">
                                <form onSubmit={addResponsabiliteInstitutionnelleHandler}>
                                    <div className="mb-3">
                                        <label>Titre</label>
                                        <input
                                            type="text"
                                            name="titre"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={responsabiliteInstitutionnelle.titre}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Institution</label>
                                        <input
                                            type="text"
                                            name="institution"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={responsabiliteInstitutionnelle.institution}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Détails</label>
                                        <textarea
                                            name="details"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={responsabiliteInstitutionnelle.details}
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
                                            value={formatDate(responsabiliteInstitutionnelle.dateDebut)}
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
                                            value={formatDate(responsabiliteInstitutionnelle.dateFin)}
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

export default AddResponsabiliteInstitutionnelle;
