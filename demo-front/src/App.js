import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListUser from './components/ListUser';
import Login from './components/Login';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import EditRole from './components/EditRole';
import GenerateCV from './components/GenerateCV';
import AddEducation from './components/AddEducation';
import AddActiviteEnseignement from './components/AddActiviteEnseignement';
import AddConferenceInvitee from './components/AddConferenceInvitee';
import AddContratDeRecherche from './components/AddContratDeRecherche';
import AddDeclarationInvention from './components/AddDeclarationInvention';
import AddEncadrement from './components/AddEncadrement';
import AddMembreComiteProgramme from './components/AddMembreComiteProgramme';
import AddOrganisationEvenementsInternationaux from './components/AddOrganisationEvenementsInternationaux';
import AddPositionActuelle from './components/AddPositionActuelle';
import AddPositionPrecedente from './components/AddPositionPrecedente';
import AddPrixEtNominations from './components/AddPrixEtNominations';
import AddPublication from './components/AddPublication';
import AddRelecteurDeRevues from './components/AddRelecteurDeRevues';
import AddResponsabiliteInstitutionnelle from './components/AddResponsabiliteInstitutionnelle';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/login" element= { <Login/>} />
        <Route path="/" element= { <Navbar/>} />
        <Route path="/addUser" element= { <AddUser/>} />
        <Route path="/generateCv" element= { <GenerateCV/>} />
        <Route path="/listUser" element= { <ListUser/>} />
        <Route path='/listUser/editUser/:id' element={<EditUser/>} />
        <Route path='/listUser/editRole/:email' element={<EditRole/>} />
        <Route path='/generateCv/addActiviteEnseignement/:id' element={<AddActiviteEnseignement/>} />
        <Route path='/generateCv/addConferenceInvitee/:id' element={<AddConferenceInvitee />} />
        <Route path='/generateCv/addContratDeRecherche/:id' element={<AddContratDeRecherche />} />
        <Route path='/generateCv/addDeclarationInvention/:id' element={<AddDeclarationInvention />} />
        <Route path='/generateCv/addEducation/:id' element={<AddEducation />} />
        <Route path='/generateCv/addEncadrement/:id' element={<AddEncadrement />} />
        <Route path='/generateCv/addMembreComiteProgramme/:id' element={<AddMembreComiteProgramme />} />
        <Route path='/generateCv/addOrganisationEvenementsInternationaux/:id' element={<AddOrganisationEvenementsInternationaux />} />
        <Route path='/generateCv/addPositionActuelle/:id' element={<AddPositionActuelle />} />
        <Route path='/generateCv/addPositionPrecedente/:id' element={<AddPositionPrecedente />} />
        <Route path='/generateCv/addPrixEtNominations/:id' element={<AddPrixEtNominations />} />
        <Route path='/generateCv/addPublication/:id' element={<AddPublication />} />
        <Route path='/generateCv/addRelecteurDeRevues/:id' element={<AddRelecteurDeRevues />} />
        <Route path='/generateCv/addResponsabiliteInstitutionnelle/:id' element={<AddResponsabiliteInstitutionnelle />} />
      </Routes>
    </div>
  );
}

export default App;

// const App = () => {
//   // Variable d'état pour suivre l'état de connexion de l'utilisateur
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
//         {isLoggedIn && <Route path="/navbar" element={<Navbar />} />}
//         {isLoggedIn && <Route path="/addUser" element={<AddUser />} />}
//         {isLoggedIn && <Route path="/generateCv" element={<GenerateCV />} />}
//         {isLoggedIn && <Route path="/listUser" element={<ListUser />} />}
//         {isLoggedIn && <Route path='/listUser/editUser/:id' element={<EditUser />} />}
//         {isLoggedIn && <Route path='/listUser/editRole/:email' element={<EditRole />} />}
//         {isLoggedIn && <Route path='/generateCv/addExperience/:id' element={<AddExperience />} />}
//         {isLoggedIn && <Route path='/generateCv/addPublication/:id' element={<AddPublication />} />}
//         {isLoggedIn && <Route path='/generateCv/addAward/:id' element={<AddAward />} />}
//         {isLoggedIn && <Route path='/generateCv/addEducationActivity/:id' element={<AddEducationActivity />} />}
//         {isLoggedIn && <Route path='/generateCv/addScientificActivity/:id' element={<AddScientificActivity />} />}
//         {isLoggedIn && <Route path='/generateCv/addRelatedPerson/:id' element={<AddRelatedPerson />} />}
//         {isLoggedIn && <Route path='/generateCv/addProgramResearch/:id' element={<AddProgramResearch />} />}
//         {isLoggedIn && <Route path='/generateCv/addEducation/:id' element={<AddEducation />} />}
//       </Routes>
//     </div>
//   );
// }

// export default App;
