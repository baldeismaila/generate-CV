import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/backend";
import Navbar from "./Navbar";

const EditUser = () => {
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

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUserById(id)
            .then((res) => {
                setEnseignant(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEnseignant({
            ...enseignant,
            [name]: value
        });
    }

    const userUpdate = (e) => {
        e.preventDefault();
        updateUser(enseignant)
            .then((res) => {
                navigate("/listUser");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header fs-3 text-center">Modifier l'Enseignant</div>

                        <div className="card-body">
                            <form onSubmit={(e) => userUpdate(e)}>
                                <div className="mb-3">
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.nom}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.prenom}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Date de Naissance</label>
                                    <input
                                        type="date"
                                        name="dateDeNaissance"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.dateDeNaissance}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Site Web</label>
                                    <input
                                        type="text"
                                        name="urlDuSiteWeb"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.urlDuSiteWeb}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.email}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Téléphone</label>
                                    <input
                                        type="text"
                                        name="telephone"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.telephone}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Rôle</label>
                                    <input disabled
                                        type="text"
                                        name="role"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.role}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Mot de Passe</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.password}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Mots Clés</label>
                                    <input
                                        type="text"
                                        name="motsCles"
                                        className="form-control"
                                        onChange={(e) => handleChange(e)}
                                        value={enseignant.motsCles}
                                    />
                                </div>
                                <button className="btn btn-primary col-md-12">Modifier</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default EditUser;
