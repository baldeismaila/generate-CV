import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addRole } from "../services/backend";
import Navbar from "./Navbar";


function EditRole() {
    const [role, setRole] = useState();
    const navigate = useNavigate();
  
    const { email } = useParams();
    console.log(email);
  
    const updateRole = () => {    
      addRole(email,role)
        .then((res) => {
          navigate("/listUser");
          console.log("role modifié");
        })
        .catch((error) => {
          console.log(error);
      });
  };
  
    return (
      <>
        <div className="content">
        <Navbar/>
          <table className="tableRole">
            <tr>
              <td>
                <label>Email:</label>
              </td>
              <td>
                  <input type="text" name="email" className="form-control" disabled value={email} />
              </td>
            </tr>
            <tr>
              <td>
                <label>Role:</label>
              </td>
              <td>
                  {/*  <input type="text" name="height" className="form-control" value={role}
                      onChange={(evt) => setRole(evt.target.value)} />
                  </td>*/} 
                <select value={role} onChange={(evt) => setRole(evt.target.value)}>
                  <option>--Choisi un role--</option>
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                  <option value="ROLE_USER">ROLE_USER</option>            
                </select>           
              </td>
            </tr>
            <tr>
              <td colspan="2">
              <button className="btn btn-sm btn-primary" onClick={updateRole}>Modifier</button>
              </td>
            </tr>
          </table>
        </div>
      </>
    );
  }
  
  export default EditRole;