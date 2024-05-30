// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { addPublication } from '../services/backend';
// import Navbar from './Navbar';
// import Papa from 'papaparse';

// const AddPublication = () => {
//     const [publication, setPublication] = useState({
//         authors: '',
//         title: '',
//         publication: '',
//         volume: '',
//         number: '',
//         pages: '',
//         year: '',
//         publisher: ''
//     });
//     const [CSVRecords, setCSVRecords] = useState([]); // Déclaration de l'état pour stocker les enregistrements CSV

//     const navigate = useNavigate();
//     const { id } = useParams();

//     const handleChange = (e) => {
//         setPublication({
//             ...publication,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleFileChange = (e) => {
//         // Lecture et traitement du fichier CSV
//         const reader = new FileReader();
//         reader.onload = async (event) => {
//             const text = event.target.result;
//             Papa.parse(text, {
//                 header: true,
//                 complete: (result) => {
//                     console.log(result.data); // Afficher les enregistrements CSV dans la console
//                     setCSVRecords(result.data); // Mettre à jour l'état avec les enregistrements CSV
//                 }
//             });
//         };
//         reader.readAsText(e.target.files[0]);
//     };

//     const addPublicationHandler = (e) => {
//         e.preventDefault();

//         addPublication(id, publication)
//             .then((res) => {
//                 console.log('Publication ajoutée avec succès:', res.data);
//                 navigate('/generateCv');
//             })
//             .catch((error) => {
//                 console.error('Erreur lors de l\'ajout de la publication:', error);
//             });
//     };

//     const addPublicationHandlerFile = (e) => {
//         e.preventDefault();
    
//         // Construire un tableau de promesses pour ajouter chaque publication
//         const promises = CSVRecords.map((record) => {
//             // Séparer les données de l'enregistrement CSV en utilisant le point-virgule comme délimiteur
//             const data = record.Authors.split(';').map(item => item.trim());
    
//             // Créer un objet de publication à partir de chaque enregistrement CSV
//             const publicationData = {
//                 authors: data[0],
//                 title: data[1],
//                 publication: data[2],
//                 volume: data[3],
//                 number: data[4],
//                 pages: data[5],
//                 year: data[6],
//                 publisher: data[7]
//             };
    
//             return publicationData;
//         });
    
//         // Attendre que toutes les publications soient ajoutées avec succès
//         Promise.all(promises.map(publicationData => addPublication(id, publicationData)))
//             .then((responses) => {
//                 console.log('Publications ajoutées avec succès:', responses);
//                 navigate('/generateCv');
//             })
//             .catch((error) => {
//                 console.error('Erreur lors de l\'ajout des publications:', error);
//             });
//     };


//     return (
//         <div>
//             <Navbar/>
//             <div className="container mt-3">
//                 <div className="row">

//                     <div className="card-body offset-md-6" style={{ marginRight: '10%', marginLeft: '30%'}}>
//                         <form onSubmit={addPublicationHandlerFile} style={{ width: '60%'}}>
//                             {/* ... autres champs du formulaire */}
//                             <div className="mb-3">
//                                 <label>Fichier CSV</label>
//                                 <input
//                                     type="file"
//                                     name="file"
//                                     className="form-control"
//                                     onChange={handleFileChange}
//                                     accept=".csv" // Accepter uniquement les fichiers CSV
//                                     required
//                                 />
//                             </div>
//                             <button className="btn btn-primary col-md-12">Ajouter</button>
//                         </form>
//                     </div>

//                     <div className="col-md-6 offset-md-3">
//                         <div className="card">
//                             <div className="card-header fs-3 text-center">Ajouter une Publication</div>

//                             <div className="card-body">
//                                 <form onSubmit={addPublicationHandler}>
//                                     <div className="mb-3">
//                                         <label>Auteurs</label>
//                                         <input
//                                             type="text"
//                                             name="authors"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.authors}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Titre</label>
//                                         <input
//                                             type="text"
//                                             name="title"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.title}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Publication</label>
//                                         <input
//                                             type="text"
//                                             name="publication"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.publication}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Volume</label>
//                                         <input
//                                             type="text"
//                                             name="volume"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.volume}
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Number</label>
//                                         <input
//                                             type="text"
//                                             name="number"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.number}
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Pages</label>
//                                         <input
//                                             type="text"
//                                             name="pages"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.pages}
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Year</label>
//                                         <input
//                                             type="text"
//                                             name="year"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.year}
//                                         />
//                                     </div>
//                                     <div className="mb-3">
//                                         <label>Publisher</label>
//                                         <input
//                                             type="text"
//                                             name="publisher"
//                                             className="form-control"
//                                             onChange={handleChange}
//                                             value={publication.publisher}
//                                         />
//                                     </div>
//                                     <button className="btn btn-primary col-md-12">Ajouter</button>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddPublication;
