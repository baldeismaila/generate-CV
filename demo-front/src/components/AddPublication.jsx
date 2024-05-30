import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPublicationListeToEnseignant, addPublicationToEnseignant } from '../services/backend'; // Assurez-vous que le service backend est correctement importé
import Navbar from './Navbar';

const AddPublication = () => {
    const [publication, setPublication] = useState({
        titre: '',
        pages: '',
        annee: 0,
        lien: '',
        url: '',
        school: '',
        type: '', // Type de publication : "Article" ou "Communication"
        volume: '', // Uniquement pour les articles
        journal: '', // Uniquement pour les articles
        livre: '', // Uniquement pour les communications
        crossref: '', // Uniquement pour les communications
        auteurs: [] // Liste des auteurs
    });

    const [publicationXML, setPublicationXML] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPublication(prevPublication => ({
            ...prevPublication,
            [name]: value
        }));
    };

    const addAuteur = () => {
        setPublication(prevPublication => ({
            ...prevPublication,
            auteurs: [...prevPublication.auteurs, '']
        }));
    };

    const handleAuteurChange = (e, index) => {
        const { value } = e.target;
        setPublication(prevPublication => {
            const updatedAuteurs = [...prevPublication.auteurs];
            updatedAuteurs[index] = value;
            return { ...prevPublication, auteurs: updatedAuteurs };
        });
    };

    const handleXmlFileChange = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        
        reader.onload = async (event) => {
            const text = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
    
            const articles = Array.from(xmlDoc.querySelectorAll('article'));
            const inproceedings = Array.from(xmlDoc.querySelectorAll('inproceedings'));
            const incollection = Array.from(xmlDoc.querySelectorAll('incollection'));
            const phdthesis = Array.from(xmlDoc.querySelectorAll('phdthesis'));
    
            const extractPublicationData = (elements) => {
                return elements.map((element) => {
                    const authors = Array.from(element.querySelectorAll('author')).map(author => author.textContent.trim());
                    const title = element.querySelector('title')?.textContent.trim() || '';
                    const pages = element.querySelector('pages')?.textContent.trim() || '';
                    const year = element.querySelector('year')?.textContent.trim() || '';
                    const volume = element.querySelector('volume')?.textContent.trim() || '';
                    const journal = element.querySelector('journal')?.textContent.trim() || '';
                    const livre = element.querySelector('booktitle')?.textContent.trim() || '';
                    const crossref = element.querySelector('crossref')?.textContent.trim() || '';
                    const ee = element.querySelector('ee')?.textContent.trim() || '';
                    const url = element.querySelector('url')?.textContent.trim() || '';
                    const school = element.querySelector('school')?.textContent.trim() || '';
    
                    const type = element.tagName === 'article' ? 'Article' : 'Communication';
    
                    return {
                        auteurs: authors,
                        titre: title,
                        pages: pages,
                        annee: parseInt(year),
                        type: type,
                        volume: volume,
                        journal: journal,
                        livre: livre,
                        crossref: crossref,
                        lien: ee,
                        url: url,
                        school: school
                    };
                });
            };
    
            const publicationArticle = extractPublicationData(articles);
            const publicationCommunication = extractPublicationData(inproceedings);
            const publicationIncollection = extractPublicationData(incollection);
            const publicationPhdthesis = extractPublicationData(phdthesis);
    
            // Construction du tableau de publications
            const publications = [
                ...publicationArticle,
                ...publicationCommunication,
                ...publicationIncollection,
                ...publicationPhdthesis
            ];

            setPublicationXML(publications);
        };
    
        reader.readAsText(e.target.files[0]);
    };    

    const addPublicationHandlerFile = async (e) => {
        e.preventDefault();
        addPublicationListeToEnseignant(id, publicationXML)
            .then((res) => {
                console.log('Toutes les publications sont ajoutées avec succès:', publicationXML.length);
                navigate('/generateCv'); 
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la publication:', error);
            });
    };

    const addPublicationHandler = (e) => {
        e.preventDefault();
        addPublicationToEnseignant(id, publication)
            .then((res) => {
                console.log('Publication ajoutée avec succès:');
                navigate('/generateCv');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'ajout de la publication:', error);
            });
    };

    return (
        <div>
            <Navbar/>
            <div className="container mt-3">
            <div className="row">
                    <div className="card-body offset-md-6" style={{ marginRight: '10%', marginLeft: '30%'}}>
                        <form onSubmit={addPublicationHandlerFile} style={{ width: '60%'}}>
                            <input
                                type="file"
                                name="xmlFile"
                                className="form-control"
                                onChange={handleXmlFileChange}
                                accept=".xml" // Accepter uniquement les fichiers XML
                                required
                            />

                            <button className="btn btn-primary col-md-12">Ajouter à partir du fichier XML</button>
                        </form>
                    </div>
                </div>
            </div>
                <br/><br/><br/>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Ajouter une Publication</div>

                            <div className="card-body">
                                <form onSubmit={addPublicationHandler}>
                                    <div className="mb-3">
                                        <label>Titre de la publication</label>
                                        <input
                                            type="text"
                                            name="titre"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.titre}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Pages</label>
                                        <input
                                            type="text"
                                            name="pages"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.pages}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Année</label>
                                        <input
                                            type="number"
                                            name="annee"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.annee}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Lien</label>
                                        <input
                                            type="text"
                                            name="lien"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.lien}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>URL</label>
                                        <input
                                            type="text"
                                            name="url"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.url}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Université</label>
                                        <input
                                            type="text"
                                            name="type"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.school}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Type de publication</label>
                                        <input
                                            type="text"
                                            name="type"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.type}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Volume</label>
                                        <input
                                            type="text"
                                            name="volume"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.volume}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Journal</label>
                                        <input
                                            type="text"
                                            name="journal"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.journal}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Livre</label>
                                        <input
                                            type="text"
                                            name="livre"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.livre}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Crossref</label>
                                        <input
                                            type="text"
                                            name="crossref"
                                            className="form-control"
                                            onChange={handleChange}
                                            value={publication.crossref}
                                        />
                                    </div>
                                    {publication.auteurs.map((auteur, index) => (
                                        <div key={index}>
                                            <div className="mb-3">
                                                <label>Auteur {index + 1} - Nom et Prenom</label>
                                                <input
                                                    type="text"
                                                    name={`auteurs.${index}`}
                                                    className="form-control"
                                                    onChange={(e) => handleAuteurChange(e, index)}
                                                    value={auteur}
                                                    required
                                                />
                                            </div>
                                            
                                        </div>
                                    ))}
                                    <button type="button" className="btn btn-secondary" onClick={addAuteur}>Ajouter un auteur</button>
                                    <br/><br/>

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

export default AddPublication;
