import React from "react";
import { Link, useNavigate} from "react-router-dom";
import {nomUser } from "./Login";
import axios from "axios";

const Navbar = () =>{
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('USER'); // Supprime le token d'authentification du stockage local
        delete axios.defaults.headers.common['Authorization']; // Supprime l'en-tête d'autorisation d'Axios
        //nomUser = ""; 
        navigate("/login"); // Redirige vers la page de connexion ou une autre page appropriée
        console.log("deconnecter");
      }
    

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
          <a class="navbar-brand" href="http://localhost:3000/">GENERATEUR CV</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                      <Link to="/addUser" class="nav-link active" aria-current="page" href="#">Ajouter un enseignants</Link>
                  </li>
                  <li class="nav-item">
                      <Link to="/generateCv" class="nav-link" href="#">Generation CV</Link>
                  </li>
                  <li class="nav-item">
                      <Link to="/listUser" class="nav-link" href="#">Liste Enseignants</Link>
                  </li>   
              </ul>

              <div class="d-flex">
                <input className="form-control me-2" type="search" disabled placeholder={nomUser} aria-label="Search"/>
                <button
                    className="btn btn-outline-success text-dark bg-white"
                    onClick={nomUser ? logout : logout}
                >
                    {nomUser ? 'Se déconnecter' : 'Se connecter'}
                </button>
              </div>
          </div>
        </div>
      </nav>

      {/* <div style={{ marginTop: '5%'}}>
          <h1>BIENVENUE SUR MA PAGE</h1>
      </div> */}
    </div>
  );
}

export default Navbar;
