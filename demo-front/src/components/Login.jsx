import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from "../services/backend";

let nomUser = "";
let userId = 0;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    //let role = "";
  
    const getUser = () => {
      getUserByEmail(email).then((reponse) => {
        nomUser =(reponse.data.prenom) + " " + (reponse.data.nom);
        userId = reponse.data.id;
        //role = reponse.data.role;
        //console.log(nom);
      }).catch((error)=> console.log(error));
    }
  
  
    const login = async (event) => {
        event.preventDefault();
        getUser();
        try {
          await axios.post("http://localhost:8080/enseignants/connexion", {
            username: email,
            password: password,
            }).then((res) => 
            {
              const token = res.data.bearer;
              localStorage.setItem('USER',res.data);
             // localStorage.setItem('token',token);
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              navigate("/");
              //console.log(token);
        
  
          }, fail => {
           console.error(fail); // Error!
           setMsg("Invalid Email or Password");
          });
        }
        catch (err) {
          alert(err);
          setMsg("Enter Email and Password");
        }
      
    }
   
    return (
      <div className="containerLogin">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">Login Form</h2>
              </div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              <div className="card-body">
                <form method="post" className="form-horizontal" onSubmit={login}>
  
                  <div className="form-group mb-3">
                    <label className="control-label"> Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <div className="form-group mb-3">
                    <label className="control-label"> Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary" >Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
  
  export {nomUser,userId}
  export default Login;
  