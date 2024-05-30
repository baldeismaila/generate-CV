import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { deleteUser, getAll } from "../services/backend";
import { Link } from "react-router-dom";

const ListUser = () =>{

  const [usersList, setUserList] = useState([]);

  const getListUsers = () => {
    getAll().then((reponse) => setUserList(reponse.data)).catch((error)=> console.log(error));
  }
  const userDelete = (id) => {
    deleteUser(id)
    .then((res) => {
        console.log("enseignant supprimé");
      getListUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
      getListUsers();
  },[]);

    return (
      <div>
        <Navbar/>

        <div className="container mt-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header fs-3 text-center">
                  Liste des Enseignants
                </div>
                <div className="card-body">
                  <table className="table" /*style={{ width: '80%'}}*/>
                    <thead>
                      <tr>
                        <th scope="col">Nom</th>
                        <th scope="col">Prenom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date de Naissance</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Role</th>
                        <th scope="col">Site Web</th>
                        {/* <th scope="col">Identifiant Chercheur</th>
                        <th scope="col">Indice H</th>
                        <th scope="col">Mots Clés</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map((user, index) => (
                        <tr key={index}>
                          <td>{user.nom}</td>
                          <td>{user.prenom}</td>
                          <td>{user.email}</td>
                          <td>{user.dateDeNaissance}</td>
                          <td>{user.telephone}</td>
                          <td>{user.role}</td>
                          <td>{user.urlDuSiteWeb}</td>
                          {/* <td>{user.identifiantChercheur}</td>
                          <td>{user.indiceH}</td>
                          <td>{user.motsCles.join(', ')}</td> */}
                          <td>
                            <Link to={'/listUser/editUser/'+user.id} className="btn btn-sm btn-primary">Modifier</Link>
                            <button onClick={() => userDelete(user.id)} className="black btn btn-sm btn-danger ms-1">
                              Supprimer
                            </button>
                            <Link to={'/listUser/editRole/'+user.email} className="black btn btn-sm btn-primary">Role</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ListUser;