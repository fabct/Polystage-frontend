import React, { useState, useEffect } from 'react';
import InputSearch from './Content/Element/InputSearch';
import SearchButton from './Content/Element/SearchButton';
import Button from '../Login/ButtonLoginPage';
import { post, put } from '../../service/service';
import RenderContent from './Content/RenderContent';
import ContentTitle from './Content/Element/Title';
import AdminFunction from './adminFunction';
import SearchContent from './Content/Element/SearchContent';

const Content = ({ type, action }) => {

    // UseState Généraux
    const [data, setData] = useState([]);
    const [specificData, setSpecificData] = useState([]);

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [numStudent, setNumStudent] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [ajoutFilière, setAjoutFilière] = useState(false);
    const [annee, setAnnee] = useState('');
    const [filiere, setFiliere] = useState('');
    const [directeurNom, setDirecteurNom] = useState('');
    const [directeurPrenom, setDirecteurPrenom] = useState('');

    useEffect(() => {
        if (type === 'user') {
            handleSearchUser();
        } else if (type === 'promo') {
            AdminFunction.handleGetPromo({setData, setEditingId, setIsAdding});
        }
        // Ajoutez d'autres conditions pour les autres types et actions
    }, []);

    // Fonction  handle pour les types et actions
    /*
        Ecoute entrée clavier
    */
    // Recherche d'utilisateur par nom et prénom
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
  
    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    // Modification des informations d'un utilisateur

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleProfileChange = (e) => {
        setProfile(e.target.value);
    };

    const handleNumStudentChange= (e) => {
        setNumStudent(e.target.value);
    };

    const handleVerifyPasswordChange = (e) => {
        setVerifyPassword(e.target.value);
    };

    // Pour promo
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
        Pour Tous les types
    */

    const handleModify = (data) => {
        if(type === 'user'){    
            setName(data.last_name);
            setFirstName(data.first_name);
            setEmail(data.email);
            setEditingId(data.id);
        }
        else if(type === 'promo'){
            setAnnee(data.annee);
            setFiliere(data.filiere.nom);
            setDirecteurNom(data.filiere.nom_directeur);
            setDirecteurPrenom(data.filiere.prenom_directeur);
            setEditingId(data.id);
        }
    };
    
    const handleCancel = () => {
        setEditingId(null);
        setName('');
        setFirstName('');
        setEmail('');
        setProfile('');
        setNumStudent('');
        setBirthDate('');
        setPassword('');
        setIsAdding(false);
    };

    const handleIsAdding = () => {
        if(type === 'user'){
            setIsAdding(true);
        }
        if(type === 'promo'){
            setIsAdding(true);
            handleGetFilière();
        }
    }

    /*
        Pour utilisateur
    */

    const handleCreateUser = () => {
        return post(`userList/${profile}/`, {first_name: firstName, last_name: name, email: email,password1: password, password2: verifyPassword,num_etudiant: numStudent, date_naissance: birthDate})
        .then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setName('');
                setFirstName('');
                setEmail('');
                setProfile('');
                setNumStudent('');
                setBirthDate('');
                setPassword('');
                setIsAdding(false);
                handleSearchUser();
            }
        })
    };
    
    const handleSearchUser = () => {
        setEditingId(null);
        setIsAdding(false);
        return post(`userSearch/`, {first_name: firstName, last_name: name, email: email}).then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setData(data);
            }
        })
    }

    const handleModifyUser = () => {
        return put(`userDetails/${editingId}/`, {email: email, first_name: firstName, last_name: name})
        .then(data => {
            if(data.error){
                console.error(data.error);
                setName('');
                setFirstName('');
                setEmail('');
            }
            else{
                console.log(data);
                setEditingId(null);
                setName('');
                setFirstName('');
                setEmail('');
                handleSearchUser();
            }
        })
    };

    /*
        Pour promo et filière
    */

    const handleGetContent = () => {
        AdminFunction.handleGetPromo({setData, setEditingId, setIsAdding});
    }
    
    const handleGetFilière = () => {
        AdminFunction.handleGetFiliere().then((data) => {
            setSpecificData(data);
        });
    }

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

    const handleUpdatePromo = () => {
        console.log({editingId,annee,filiere});
        AdminFunction.handleUpdatePromo({editingId,annee,filiere})
        setEditingId('');
        setAnnee('');
        setFiliere('');
        handleGetContent();
    }

    const renderSearch = () => {
        if(type ==='user'){
            return (
                <SearchContent 
                    isSearching = {true}
                    SearchTitle = {'Rechercher un utilisateur'}
                    inputs = {[
                        { name: 'First Name', handleInputSearch: handleFirstNameChange, type: 'text' },
                        { name: 'Name', handleInputSearch: handleNameChange, type: 'text' },
                        { name: 'Email', handleInputSearch: handleEmailChange, type: 'text'},                    
                    ]}
                    handleSearch = {handleSearchUser}
                />
            );
        }
        if(type === 'promo'){
            return (
                <SearchContent 
                    isSearching = {false}
                />
            );
        }
    }

    const renderTitle = () => {
        if(type === 'user'){
            return(
                <ContentTitle 
                    researchTitle={'Résultat de la recherche'}
                    Cell1={'First Name'}
                    Cell2={'Name'}
                    Cell3={'Email'}
                    Cell4={'Profile'}
                    Cell5={'Modify'}
                    Cell6={'Add'}
                    isAdding={isAdding}
                    isAddingTitle={'Nouvel utilisateur'}
                />
            );
        }
        if(type === 'promo'){
            return(
                <ContentTitle 
                    researchTitle={'Résultat de la recherche'}
                    Cell1={'Année'}
                    Cell2={'Filière'}
                    Cell3={'Directeur'}
                    Cell4={'Modify'}
                    Cell5={'Add'}
                    isAdding={isAdding}
                    isAddingTitle={'Nouvelle promo'}
                />
            );
        }
    }

    // Rendu du contenu
    const renderContent = () => {
        if (type === 'user') {
            return (
                <RenderContent data={data} handleModify={handleModify} handleSearch={handleSearchUser} function={'userDetails'} editingId={editingId} isAdding={isAdding} content={type}
                // Upadate elémént 
                infoCellUpdate1 = {'Prenom :'} infoCellUpdate2 = {'Nom :'} infoCellUpdate3 = {'Email :'} infoCellUpdate4 = {'Profile :'} handleChangeCellUpdate1 = {handleFirstNameChange} handleChangeCellUpdate2 = {handleNameChange} handleChangeCellUpdate3 = {handleEmailChange} handleDoModify={handleModifyUser}
                // Add elémént
                infoCellAdd1 = {'Prenom :'} infoCellAdd2 = {'Nom :'} infoCellAdd3 = {'Email :'} infoCellAdd4 = {'Password :'} infoCellAdd5 = {'Verify Password :'} infoCellAdd6 = {'Profile :'} infoCellAdd7 = {'Numéro étudiant :'} infoCellAdd8 = {'Date de naissance :'} Cells6 = {profile} handleChangeCell1 = {handleFirstNameChange} handleChangeCell2 = {handleNameChange} handleChangeCell3 = {handleEmailChange} handleChangeCell4 = {handlePasswordChange} handleChangeCell5 = {handleVerifyPasswordChange} handleChangeCell6 = {handleProfileChange} handleChangeCell7 = {handleNumStudentChange} handleChangeCell8 = {handleBirthDateChange} handleCancel = {handleCancel} handleCreate = {handleCreateUser}
                />
            );
        } else if (type === 'promo') {
            console.log('promo');
        }
        // Ajoutez d'autres conditions pour les autres types
    };

    return (
        <div>
            <div style={{margin:'78px 70px', gridTemplateAreas:`'search . .' 'result result result' '. . button'`,borderRadius: '20px', background: '#D9D9D9', padding:'10px'}}>
                <div style={{gridArea:'search', margin:'20px 20px', borderRadius: '20px', background:'white', display:'inline-block'}}>
                {renderSearch()}
                </div>
                {renderTitle()}
                <div style={{gridArea:'result', margin:'10px 20px', height:'325px',background:'white',borderRadius:'20px',overflow:'auto'}}>
                {renderContent()}
                </div>
                <div style={{ gridArea: 'button', display: 'flex'}}>
                    <Button
                        content={'Créer'}
                        onClick={() => setIsAdding(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;