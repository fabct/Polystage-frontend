import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../Login/ButtonLoginPage';
import ModifyButton from './Content/Element/ModifyButton';
import DeleteButton from './Content/Element/DeleteButton';
import AdminFunction from './adminFunction';
import ContentTitle from './Content/Element/Title';
import InputSearch from './Content/Element/InputSearch';

const AllContent = (props) => {

    const [data, setData] = useState([]);
    const [specificData, setSpecificData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [ajoutFilière, setAjoutFilière] = useState(false);
    const [annee, setAnnee] = useState('');
    const [filiere, setFiliere] = useState('');
    const [directeurNom, setDirecteurNom] = useState('');
    const [directeurPrenom, setDirecteurPrenom] = useState('');


    const handleFilièreChange = (e) => {
        if(e.target.value === "new"){
            setAjoutFilière(true);
            setDirecteurNom('');
            setDirecteurPrenom('');
        }
        else{
            setAjoutFilière(false);
            setFiliere(e.target.value);
            specificData.map((data) => {
                if(data.nom === e.target.value){
                    setFiliere(data.id);
                    setDirecteurNom(data.nom_directeur);
                    setDirecteurPrenom(data.prenom_directeur);
                }
            });
        }
    }

    const handleNewFiliereChange = (e) => {
        setFiliere(e.target.value);
    }

    const handleDirecteurNomChange = (e) => {
        setDirecteurNom(e.target.value);
    }

    const handleDirecteurPrenomChange = (e) => {
        setDirecteurPrenom(e.target.value);
    }

    const handleAnneeChange = (e) => {
        setAnnee(e.target.value);
    }

    /*
      Get the content
    */
    

    const handleGetContent = () => {
        AdminFunction.handleGetPromo({setData, setEditingId, setIsAdding});
    }

    const handleGetFilière = () => {
        AdminFunction.handleGetFiliere().then((data) => {
            setSpecificData(data);
        });
    }

    /*
        Créate a new promo
    */
    const handleCreatePromo = () => {
        if(ajoutFilière){
            AdminFunction.handleCreateFiliere({filiere, nom_directeur: directeurNom, prenom_directeur: directeurPrenom}).then((data) => {
                AdminFunction.handleCreatePromo({annee: annee,filiere: data.id})
                .then(() => {
                });
            });
        }
        else{
            AdminFunction.handleCreatePromo({annee: annee,filiere: filiere})
        }
        handleGetContent();
        setAjoutFilière(false);
        setFiliere('');
        setDirecteurNom('');
        setDirecteurPrenom('');
        setAnnee('');
    }

    const handleIsAdding = () => {
        setIsAdding(true);
        handleGetFilière();
    }

    /*
        Update a promo
    */

    const handleUpdatePromo = () => {
        console.log({editingId,annee,filiere});
        AdminFunction.handleUpdatePromo({editingId,annee,filiere})
        setEditingId('');
        setAnnee('');
        setFiliere('');
        handleGetContent();
    }

    const handleModify = (data) => {
        setAnnee(data.annee);
        setFiliere(data.filiere.nom);
        setDirecteurNom(data.filiere.nom_directeur);
        setDirecteurPrenom(data.filiere.prenom_directeur);
        setEditingId(data.id);
    };

    const trStyle = {
        margin: '10px 10px',
        backgroundColor:'white', 
        border: '3px solid rgb(11, 96, 131)', 
        borderRadius: '10px',
        boxShadow: '0px 4px 4px #00000040',
        height: '50px',
        display: 'flex'
    }

    const cellStyle = {textAlign: 'center', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1, margin: 'auto'}; // Add flex: 1 and width: auto

    const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto

    useEffect(() => {
        AdminFunction.handleGetPromo({setData, setEditingId, setIsAdding});
    }, []);

    const renderContent = (content) => {
        
        if(content === 'promo'){
                return ( isAdding ? (
                    <div style={{margin: '10px 10px', backgroundColor:'white', border: '3px solid rgb(11, 96, 131)', borderRadius: '10px', boxShadow: '0px 4px 4px #00000040', padding: '10px', display: 'flex'}}>
                        <form>
                            {/* Ajoutez vos champs de formulaire ici */}
                            <div style={cellAddStyle}> Année :
                                <InputSearch 
                                    onChange = {handleAnneeChange}
                                    marginLeft={'15px'}
                                    type={'text'}
                                />
                            </div>
                            <div style={cellAddStyle}> Filière :
                                <select style={{ marginLeft: '10px' }} onChange={handleFilièreChange}>
                                    <option value=''>Choisir une filière</option>
                                    {specificData.map((specificData) => (
                                        <option value={specificData.nom} key={specificData.id}>{specificData.nom}</option>
                                    ))}
                                    <option value='new'>Nouvelle filière</option>
                                </select>
                            </div>
                            {ajoutFilière ? (
                                <>
                                    <div style={cellAddStyle}> Nom de la filiere :
                                        <InputSearch 
                                            onChange = {handleNewFiliereChange}
                                            marginLeft={'15px'}
                                            type={'text'}
                                        />
                                    </div>
                                    <div style={cellAddStyle}> Nom du directeur :
                                    <InputSearch 
                                        onChange = {handleDirecteurNomChange}
                                        marginLeft={'15px'}
                                        type={'text'}
                                    />
                                    </div>
                                    <div style={cellAddStyle}> Prénom du directeur :
                                        <InputSearch 
                                            onChange = {handleDirecteurPrenomChange}
                                            marginLeft={'15px'}
                                            type={'password'}
                                        />
                                    </div> 
                                </> 
                            ):(<></>)}      
                        </form>
                        <div style={{alignContent:'end'}}>
                            <button style={{margin:'0px 10px'}} onClick={() =>{setAnnee(''),setDirecteurNom(''),setDirecteurPrenom(''),setFiliere(''),setIsAdding(false)}}>Annuler</button>
                            <button onClick={handleCreatePromo}>Créer</button>
                        </div>
                    </div>
                    ) : (
                        <div id={content}>
                            {data.map((data) => (
                                    <div style={trStyle} key={data.id}>
                                    {editingId === data.id ? (
                                        <>
                                            <div style={cellStyle}> Filière : {data.filiere.nom} 
                                            </div>
                                            <div style={cellStyle}> Année :
                                            <input style={{ marginLeft: '5px' }} defaultValue={data.annee} onChange={handleAnneeChange}/>
                                            </div>
                                            <div style={cellStyle}> Nom du directeur : {data.filiere.nom_directeur}
                                            </div>
                                            <div style={cellStyle}> Prenom du Directeur : {data.filiere.prenom_directeur}
                                            </div>
                                            <button style={{margin:'15px 2px'}} onClick={() => {setEditingId(null),setAnnee('')}}>Annuler</button>
                                            <button style={{margin:'15px 2px'}} onClick={() => {setFiliere(data.filiere.id),handleUpdatePromo()}}>Valider</button>
                                    
                                        </>
                                        ) : (
                                        <>
                                        <div style={cellStyle}>{data.filiere.nom}</div>
                                        <div style={cellStyle}>{data.annee}</div>
                                        <div style={cellStyle}>{data.filiere.nom_directeur}</div>
                                        <div style={cellStyle}>{data.filiere.prenom_directeur}</div>
                                        <div style={cellStyle}>
                                            <ModifyButton
                                                handleModify={() => handleModify(data)}
                                            />
                                        </div>
                                        <div style={cellStyle}>
                                            <DeleteButton 
                                                id={data.id}
                                                refresh={handleGetContent}
                                                function='userDetails'
                                            />
                                        </div>
                                        </>
                                        )}
                                    </div>
                            ))}
                        </div>
                    )
                );
            }
            else if(content === 'form'){
                return (<div id={content}>
                </div>
                );
            }
    }
    

    return(
        <div style={{margin:'78px 70px', gridTemplateAreas:`'content content content' '. . button'`,borderRadius: '20px', background: '#D9D9D9', padding:'10px'}}>
            <ContentTitle 
                researchTitle={'Résultat de la recherche'}
                Cell1={'Filère'}
                Cell2={'Année'}
                Cell3={'Nom du directeur'}
                Cell4={'Prénom du directeur'}
                Cell5={'Modify'}
                Cell6={'Add'}
                isAdding={isAdding}
                isAddingTitle={'Nouvel Promotion'}
            />
            <div style={{gridArea:'result', margin:'10px 20px', height:'520px',background:'white',borderRadius:'20px', overflow:'auto'}}>
                <div id={props.content}>
                    {renderContent(props.content)}
                </div>
            </div>
            <div style={{ gridArea: 'button', display: 'flex'}}>
                <Button
                    content={'Créer'}
                    onClick={handleIsAdding}
                />
            </div>
        </div>
    );

}

export default AllContent;