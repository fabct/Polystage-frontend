import React, { useState, useEffect } from 'react';
import Button from '../Login/ButtonLoginPage';
import { get, post, put } from '../../service/service';
import RenderContent from './Content/RenderContent';
import ContentTitle from './Content/Element/Title';
import AdminFunction from './adminFunction';
import SearchContent from './Content/Element/SearchContent';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Content = ({ type, setNewFormId }) => {

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
    const [ajoutFiliere, setAjoutFiliere] = useState(false);
    const [annee, setAnnee] = useState('');
    const [filiere, setFiliere] = useState('');
    const [filiereId, setFiliereId] = useState('');
    const [directeurNom, setDirecteurNom] = useState('');
    const [directeurPrenom, setDirecteurPrenom] = useState('');
    const [internship, setInternship] = useState('');

    useEffect(() => {
        if (type === 'user') {
            handleSearchUser();
        } else if (type === 'promo') {
            handleGetContent();
        }
        else if (type === 'internship') {
            handleSearchInternship();
        }
        else if (type === 'form') {
            handleGetForm();
        }
        // Ajoutez d'autres conditions pour les autres types et actions
    }, [type]);

    const navigate = useNavigate();

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
            setAjoutFiliere(true);
            setDirecteurNom('');
            setDirecteurPrenom('');
        }
        else{
            setAjoutFiliere(false);
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

    const keys = [
        {type : 'user', keys: ['first_name', 'last_name', 'email', 'profile']},
        {type : 'promo', keys: ['filiere.nom','annee','filiere.nom_directeur','filiere.prenom_directeur']},
        {type : 'internship', keys: ['nom_entreprise','sujet','confidentiel','date_debut','date_fin']},
        {type : 'form', keys: ['title','description']}
    ];

    const getTypeKeys = (type) => {
        const typeObject = keys.find((item) => item.type === type);
        return typeObject ? typeObject.keys : [];
    };

    const handleModify = (dataToEdit) => {
        if(type === 'user'){    
            console.log(dataToEdit.id);
            setName(dataToEdit.last_name);
            setFirstName(dataToEdit.first_name);
            setEmail(dataToEdit.email);
            setEditingId(dataToEdit.id);
        }
        else if(type === 'promo'){
            setFiliereId(dataToEdit.filiere.id);
            setAnnee(dataToEdit.annee);
            setFiliere(dataToEdit.filiere.nom);
            setDirecteurNom(dataToEdit.filiere.nom_directeur);
            setDirecteurPrenom(dataToEdit.filiere.prenom_directeur);
            setEditingId(dataToEdit.id);
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
        if(type === 'internship'){
            setIsAdding(true);
        }
        if(type === 'form'){
            setIsAdding(true);
            const newFormId = uuidv4();
            setNewFormId(newFormId);
            navigate(`/admin/form/${newFormId}`);
        }
    }

    /*
        Pour utilisateur
    */

    const handleCreateUser = () => {
        return post(`userList/`, {first_name: firstName, last_name: name, email: email,password1: password, password2: verifyPassword,num_etudiant: numStudent, date_naissance: birthDate, profile: profile})
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
        setData([]);
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
        setData([]);
        AdminFunction.handleGetPromo({setData, setEditingId, setIsAdding});
    }
    
    const handleGetFilière = () => {
        AdminFunction.handleGetFiliere().then((data) => {
            setSpecificData(data);
        });
    }

    const handleCreatePromo = () => {
        if(ajoutFiliere){
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
        setAjoutFiliere(false);
        setFiliere('');
        setDirecteurNom('');
        setDirecteurPrenom('');
        setAnnee('');
    }

    const handleUpdatePromo = () => {
        console.log({editingId,annee,filiereId});
        AdminFunction.handleUpdatePromo({editingId,annee,filiereId})
        setEditingId('');
        setAnnee('');
        setFiliere('');
        handleGetContent();
    }

    /*
        Pour stage
    */

    const handleSearchInternship = () => {
        return get('stageList/').then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setData(data);
            }
        });
    }

    /*
        Pour formulaire
    */

    const handleGetForm = () => {
        return get(`formulaireList/`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setData(data);
            }
        })
    }

    /*
        Rendu du contenu
    */

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
        if(type === 'internship'){
            return (
                <SearchContent 
                    isSearching = {true}SearchTitle = {'Rechercher un stage'}
                    inputs = {[
                        { name: 'First Name Student', handleInputSearch: handleFirstNameChange, type: 'text' },
                        { name: 'Name Student', handleInputSearch: handleNameChange, type: 'text' },
                        { name: 'First Name Tuteur', handleInputSearch: handleFirstNameChange, type: 'text' },
                        { name: 'Name Tuteur', handleInputSearch: handleNameChange, type: 'text' },   
                        { name: 'Company', handleInputSearch: handleNameChange, type: 'text' },          
                        { name: 'Subject', handleInputSearch: handleNameChange, type: 'text' },       
                    ]}
                    handleSearch = {handleSearchInternship}
                />
            );
        }
        if(type === 'form'){
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
                    inputs = {[{ name: 'First Name'},{ name: 'Name'},{ name: 'Email'},  { name: 'Profile'},{ name: 'Modify'}, { name: 'Add'}]}
                    isAdding={isAdding}
                    isAddingTitle={'Nouvel utilisateur'}
                />
            );
        }
        if(type === 'promo'){
            return(
                <ContentTitle 
                    researchTitle={'Résultat de la recherche'}
                    inputs = {[{ name: 'Nom de la Filière'}, { name: 'Année'}, { name: 'Directeur Name'}, { name: 'Directeur First Name'}, { name: 'Modify'}, { name: 'Delete'}]}
                    isAdding={isAdding}
                    isAddingTitle={'Nouvelle promo'}
                />
            );
        }
        if(type === 'internship'){
            return(
                <ContentTitle 
                    researchTitle={'Résultat de la recherche'}
                    inputs = {[{ name: 'Nom Entreprise'},{ name: 'Sujet'},{ name: 'Confidentialité'},{ name: 'Date de debut'},{ name: 'Date de fin'}, { name: 'Modify'}, { name: 'Delete'}]}
                    isAdding={isAdding}
                    isAddingTitle={'Nouveau stage'}
                />
            );
        }
        if(type === 'form'){
            return(
                <ContentTitle 
                    researchTitle={'Résultat de la recherche'}
                    inputs = {[{ name: 'Nom du formulaire'},{ name: 'Description'},{ name: 'Edit'},{ name: 'Delete'}]}
                    isAdding={isAdding}
                />
            );
        }
    }

    // Rendu du contenu
    const renderContent = () => {
        const key = getTypeKeys(type);
        if (type === 'user') {
            return (
                <RenderContent 
                    data={data}
                    fields={[
                        { infoCellUpdate: 'Prenom',beUpdate:true, handleChangeCellUpdate: handleFirstNameChange,key:key[0]},
                        { infoCellUpdate: 'Nom',beUpdate:true, handleChangeCellUpdate: handleNameChange,key:key[1]},
                        { infoCellUpdate: 'Email',beUpdate:true, handleChangeCellUpdate: handleEmailChange,key:key[2]},
                        { infoCellUpdate: 'Profile',beUpdate:false,key:key[3]},
                    ]}
                    inputs1 = {[
                        { infoCell: 'First Name', handleInpuChangeCell: handleFirstNameChange, type: 'text' },
                        { infoCell: 'Name', handleInpuChangeCell: handleNameChange, type: 'text' },
                        { infoCell: 'Email', handleInpuChangeCell: handleEmailChange, type: 'text'},
                        { infoCell: 'Password', handleInpuChangeCell: handlePasswordChange, type: 'password'},
                        { infoCell: 'Verify Password', handleInpuChangeCell: handleVerifyPasswordChange, type: 'password'},
                    ]}
                    inputs2 = {[
                        { infoCell: 'Num Student', value: numStudent, handleInpuChangeCell: handleNumStudentChange, type: 'text' },
                        { infoCell: 'Birth Date', value: birthDate, handleInpuChangeCell: handleBirthDateChange, type: 'date' },
                    ]}
                    options = {[
                        {value: "",text: "Sélectionner profile", type: 'text' },
                        {value: "ADM",text: "ADM", type: 'text' },
                        {value: "ETU",text: "ETU", type: 'text' },
                        {value: "ENS",text: "ENS", type: 'text' },
                        {value: "TUT",text: "TUT", type: 'text' },
                        {value: "PRO",text: "PRO", type: 'text' },
                    ]}
                    selector = {true}
                    handleChangeSelect = {handleProfileChange}
                    infoCellSelect = {'Profile :'}
                    handleCreate = {handleCreateUser}
                    isAdding = {isAdding}
                    editingId = {editingId}
                    handleCancel = {handleCancel}
                    handleModify = {handleModify}
                    handleDoModify = {handleModifyUser}
                    handleSearch = {handleSearchUser}
                    function = {'userDetails'}
                    type = {type}
                    keys = {key}
                />
            );
        }
        if (type === 'promo') {
            return(
            <RenderContent 
                data={data}
                fields={[
                    { infoCellUpdate: 'Filière',beUpdate:false,key:key[0]},
                    { infoCellUpdate: 'Annee',beUpdate:true, handleChangeCellUpdate: handleAnneeChange,key:key[1]},
                    { infoCellUpdate: 'Directeur Nom',beUpdate:false,key:key[2]},
                    { infoCellUpdate: 'Directeur Prenom',beUpdate:false,key:key[3]},
                ]}
                inputs1 = {[
                    { infoCell: 'Annee', handleInpuChangeCell: handleAnneeChange, type: 'text' },
                ]}
                inputs2 = {[
                    { infoCell: 'Nom Filière', value: filiere, handleInpuChangeCell: handleNewFiliereChange, type: 'text' },
                    { infoCell: 'Directeur Nom', value: directeurNom, handleInpuChangeCell: handleDirecteurNomChange, type: 'text' },
                    { infoCell: 'Directeur Prenom', value: directeurPrenom, handleInpuChangeCell: handleDirecteurPrenomChange, type: 'text' },
                ]}
                options = {[
                    {value: "",text: "Sélectionner filière", type: 'text' },
                    {value: "new",text: "Ajouter une nouvelle filière", type: 'text' },
                    ...specificData.map((data) => ({value: data.nom,text: data.nom, type: 'text' }))
                ]}
                selector = {true}
                handleChangeSelect = {handleFilièreChange}
                infoCellSelect = {'Filière :'}
                handleCreate = {handleCreatePromo}
                isAdding = {isAdding}
                editingId = {editingId}
                handleCancel = {handleCancel}
                handleModify = {handleModify}
                handleDoModify = {handleUpdatePromo}
                handleSearch = {handleGetContent}
                function = {'promoDetails'}
                type = {type}
                keys = {key}
            />
            );
        }
        if (type === 'internship') {
            return(
                <RenderContent 
                    data={data}
                    handleModify = {handleModify}
                    handleSearch = {handleSearchInternship}
                    function = {'stageDetails'}
                    type = {type}
                    keys = {key}
                />
            );
        }
        if (type === 'form') {
            return(
                <RenderContent 
                    data={data}
                    handleModify = {handleModify}
                    handleSearch = {handleGetForm}
                    function = {'formulaireDetails'}
                    type = {type}
                    keys = {key}
                />
            );
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
                        onClick={handleIsAdding}
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;