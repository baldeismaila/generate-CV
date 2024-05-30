import React, { useState } from "react";
import { addEnseignant } from "../services/backend";
import Navbar from "./Navbar";

const AddUser = () =>{ 
    const [enseignant, setEnseignant] = useState({
        nom: "",
        prenom: "",
        dateDeNaissance: "",
        urlDuSiteWeb: "",
        identifiantChercheur: "",
        indiceH: 0,
        email: "",
        telephone: "",
        role: "ROLE_USER",
        password: "",
        motsCles: []
    });
    const [msg, setMsg] = useState("");
    
    const handleChange2 = (e, index) => {
        const { value } = e.target;
        const nouveauxMotsCles = [...enseignant.motsCles];
        nouveauxMotsCles[index] = value;
        setEnseignant({ ...enseignant, motsCles: nouveauxMotsCles });
    };
    
    const ajouterChampMotCle = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du bouton
        setEnseignant({ ...enseignant, motsCles: [...enseignant.motsCles, ''] });
    };    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEnseignant(prevEnseignant => ({
            ...prevEnseignant,
            [name]: value
        }));
    };
    const formatDate = (date) => {
        if (!date) return ''; // Retourne une chaîne vide si la date est nulle ou non définie
        const formattedDate = new Date(date).toISOString().split('T')[0]; // Convertit la date en format ISO et extrait la partie date
        return formattedDate;
    };

    const UserRegister = (e) => {
        e.preventDefault();
        addEnseignant(enseignant)
            .then((res) => {
                setEnseignant({
                    nom: "",
                    prenom: "",
                    dateDeNaissance: "",
                    urlDuSiteWeb: "",
                    identifiantChercheur: "",
                    indiceH: 0,
                    email: "",
                    telephone: "",
                    role: "",
                    password: "",
                    motsCles: []
                });
                //console.log("Enseignant ajouté avec succès");
                setMsg("Enseignant ajouté avec succès");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    

    return (
        <div>
        <Navbar/>
        <div className="container row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header fs-3 text-center">
                        Créer un Compte
                    </div>
                    {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                    <div className="card-body">
                        <form onSubmit={(e) => UserRegister(e)}>
                            <div className="mb-3">
                                <label>Prénom</label>
                                <input type="text" name="prenom" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.prenom} />
                            </div>
                            <div className="mb-3">
                                <label>Nom</label>
                                <input type="text" name="nom" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.nom} />
                            </div>
                            <div className="mb-3">
                                <label>Date de naissance</label>
                                <input type="date" name="dateDeNaissance" className="form-control" onChange={(e) => handleChange(e)} value={formatDate(enseignant.dateDeNaissance)}/>
                            </div>
                            <div className="mb-3">
                                <label>Site Web</label>
                                <input type="text" name="urlDuSiteWeb" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.urlDuSiteWeb} />
                            </div>
                            <div className="mb-3">
                                <label>Identifiant Chercheur</label>
                                <input type="text" name="identifiantChercheur" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.identifiantChercheur} />
                            </div>
                            <div className="mb-3">
                                <label>Indice H</label>
                                <input type="number" name="indiceH" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.indiceH} />
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="text" name="email" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.email} />
                            </div>
                            <div className="mb-3">
                                <label>Téléphone</label>
                                <input type="text" name="telephone" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.telephone} />
                            </div>
                            <div>
                                <div className="mb-3">
                                    <label>Mots clés</label>
                                    {enseignant.motsCles.map((motCle, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            name="motsCles"
                                            className="form-control mb-2"
                                            onChange={(e) => handleChange2(e, index)}
                                            value={motCle}
                                        />
                                    ))}
                                    {/* Ajouter un bouton pour ajouter un nouveau champ d'entrée */}
                                    <button className="btn btn-primary" onClick={ajouterChampMotCle}>Ajouter un mot clé</button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Role</label>
                                <input type="text" name="role" className="form-control" disabled placeholder={enseignant.role} onChange={(e) => handleChange(e)} value={enseignant.role} />
                            </div>
                            <div className="mb-3">
                                <label>Mot De Passe</label>
                                <input type="password" name="password" className="form-control" onChange={(e) => handleChange(e)} value={enseignant.password} />
                            </div>
                            <button className="btn btn-primary col-md-12">Ajouter</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    
    )
}
export default AddUser;