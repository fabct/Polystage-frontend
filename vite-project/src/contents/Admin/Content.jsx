import React, { useState, useEffect } from 'react';
import { get, post, put } from '../../service/service';
import RenderContent from './Content/RenderContent';
import ContentTitle from './Content/Element/Title';
import AdminFunction from './adminFunction';
import SearchContent from './Content/Element/SearchContent';
import DragDrop from '../CommunContent/DragDrop';
import ExportContent from '../Admin/Content/ExportContent';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { buttonStyle1 } from '../Styles';
import documentCreator from '../../service/documentCreator';
import * as XLSX from 'xlsx';

const Content = ({ type, setNewFormId }) => {

    // UseState Généraux
    const [data, setData] = useState([]);
    const [specificData, setSpecificData] = useState([]);

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [numStudent, setNumStudent] = useState('');
    const [ajoutFiliere, setAjoutFiliere] = useState(false);
    const [annee, setAnnee] = useState('');
    const [filiere, setFiliere] = useState('');
    const [filiereId, setFiliereId] = useState('');
    const [directeurNom, setDirecteurNom] = useState('');
    const [directeurPrenom, setDirecteurPrenom] = useState('');
    const [internship, setInternship] = useState('');

    const [file, setFile] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [isDownload, setIsDownload] = useState(false);
    const [exportOption, setExportOption] = useState('');
    const [fileType, setFileType] = useState('');
    const [promoSelected, setPromoSelected] = useState(null);

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
    // Modification des informations d'un utilisateur

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleProfileChange = (e) => {
        setProfile(e.target.value);
    };

    const handleNumStudentChange= (e) => {
        setNumStudent(e.target.value);
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

    const handleDropFile = (e) => {
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel.sheet.macroEnabled.12','application/vnd.oasis.opendocument.spreadsheet','application/vnd.oasis.opendocument.spreadsheet-template','application/vnd.ms-excel.sheet.binary','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(fileTypes.includes(selectedFile.type)){
                setIsUpload(true);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = function(e) {
                    let workbook = XLSX.read(e.target.result, {type: 'buffer'});
                    let sheetdata = [];
                    for(var i = 0; i < workbook.SheetNames.length; i++){
                        let sheetName = workbook.SheetNames[i];
                        const worksheet = workbook.Sheets[sheetName];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet);
                        sheetdata[sheetName] = jsonData;
                    }
                    console.log(sheetdata);
                    setFile(sheetdata);
                }
            }
            else{
                window.alert('File type not supported');
                setFile(null);
                setIsUpload(false);
            }
        } 
    }

    // export

    const handleSetExportOption = (e) => {
        setExportOption(e.target.value);
    }

    const handlePromoSelected = (value) => {
        promoDetails(value);
        console.log(promoSelected);
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
            setProfile(dataToEdit.profile);
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
        if(type === 'form'){
            setNewFormId(dataToEdit.id);
            navigate(`/admin/form/${dataToEdit.id}`);
        }
    };
    
    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel ?")) {
            setEditingId(null);
            setName('');
            setFirstName('');
            setEmail('');
            setProfile('');
            setNumStudent('');
            setIsAdding(false);
            renderContent();
        }
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
        if(type === 'export'){
            setIsDownload(true);
            exportData(promoSelected,exportOption);
        }
    }

    /*
        Pour utilisateur
    */

    const handleCreateUser = () => {
        return post(`userList/`, {first_name: firstName, last_name: name, email: email,num_etudiant: numStudent, profile: profile})
        .then(data => {
            if(data.error){
                console.error(data.error);
                window.alert(data.error);
            }
            else{
                console.log(data);
                setName('');
                setFirstName('');
                setEmail('');
                setProfile('');
                setNumStudent('');
                setIsAdding(false);
                handleSearchUser();
                window.alert('User Create with success!');
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
        if (window.confirm("Are you sure you want to update this item?")) {
            console.log({editingId, name, firstName, email, profile});
            if(profile === 'ADM' || profile === 'ETU' || profile === 'ENS' || profile === 'TUT' || profile === 'PRO'){
                return put(`userDetails/${editingId}/`, {email: email, first_name: firstName, last_name: name,profile: profile})
                .then(data => {
                    if(data.error){
                        window.alert(data.error);
                        console.error(data.error);
                        setName('');
                        setFirstName('');
                        setEmail('');
                        setProfile('');
                    }
                    else{
                        console.log(data);
                        setEditingId(null);
                        setName('');
                        setFirstName('');
                        setEmail(''); 
                        setProfile('');
                        handleSearchUser();
                        window.alert('User updated with success!');
                    }
                })
            }
        }
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
        if (window.confirm("Are you sure you want to update this item ?")) {
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
            window.alert('Promo Create with success!');
        }
    }

    const handleUpdatePromo = () => {
        if (window.confirm("Are you sure you want to update this item ?")) {
            console.log({editingId,annee,filiereId});
            AdminFunction.handleUpdatePromo({editingId,annee,filiereId})
            setEditingId('');
            setAnnee('');
            setFiliere('');
            handleGetContent();
            window.alert('Promo updated with success!');
        }
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
        Pour import et export
    */
   const promoDetails = (id) => {
        return get(`promoDetails/${id}`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                setPromoSelected(data);
                get(`filiereDetails/${data.filiere}`).then((filiere) => {
                    if(filiere.error){
                        console.error(filiere.error);
                    }
                    else{
                        setPromoSelected(prevState => ({...prevState, filiereDetails: filiere}));
                    }
                });
                console.log(data);
            }
        });
    }

    const exportData = (promoSelected,exportOption) => {
        if(exportOption === 'notes'){
            console.log(promoSelected);
            return post(`exportNote/`,{filiere: promoSelected.filiereDetails.nom, promo: promoSelected.annee}).then((data) => {
                if(data.error){
                    console.error(data.error);
                }
                else{
                    console.log(data);
                    documentCreator.exportDoc(data,fileType);
                }
            });
        }
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
        else{
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
        if (type === 'import') {
            return(
                <ContentTitle 
                    researchTitle={'Importer des données'}
                    inputs = {[]}
                    isAdding={false}
                />
            );
        }
        if(type === 'export'){
            return(
                <ContentTitle 
                    researchTitle={'Exporter des données'}
                    inputs = {[]}
                    isAdding={false}
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
                        { infoCellUpdate: 'Profile',beUpdate:true,handleChangeCellUpdate: handleProfileChange,key:key[3]},
                    ]}
                    inputs1 = {[
                        { infoCell: 'First Name', handleInpuChangeCell: handleFirstNameChange, type: 'text' },
                        { infoCell: 'Name', handleInpuChangeCell: handleNameChange, type: 'text' },
                        { infoCell: 'Email', handleInpuChangeCell: handleEmailChange, type: 'text'}
                    ]}
                    inputs2 = {[
                        { infoCell: 'Num Student', value: numStudent, handleInpuChangeCell: handleNumStudentChange, type: 'text' }
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
        if (type === 'import') {
            return(
                <DragDrop
                    style={{margin:'5px 10px', gridColumn:'2/3', borderRadius:'20px',background:'white', padding: '10px'}}
                    isUpload={isUpload}
                    handleDropFile = {handleDropFile}
                    data={file}
                /> 
            );
        }
        if (type === 'export') {
            return(
                <ExportContent
                    style={{margin:'5px 10px', gridColumn:'2/3', borderRadius:'20px',background:'white', padding: '10px'}}
                    handleGetPromos={handleGetContent}
                    data={data}
                    exportOption={exportOption}
                    handleSetExportOption={handleSetExportOption}
                    handlePromoSelected={handlePromoSelected}
                    setFileType={setFileType}
                    fileType={fileType}
                /> 
            );
        }
        // Ajoutez d'autres conditions pour les autres types
    };

    const renderButton = () => {
        if (type === 'import'){
            return(
                <button style={buttonStyle1} onClick={handleIsAdding}>Upload</button>
            );
        }
        if (type === 'export'){
            return(
                <button style={buttonStyle1} onClick={handleIsAdding}>Download</button>
            );
        }
        else{
            return(
                <button style={buttonStyle1} onClick={handleIsAdding}>Créer</button>
            );
        }
    };


    return (
        <div>
            <div style={{gridTemplateAreas:`'search . .' 'result result result' '. . button'`,borderRadius: '5px', background: '#D9D9D9', padding:'10px'}}>
                <div style={{gridArea:'search', margin:'20px 20px', borderRadius: '20px', background:'white', display:'inline-block'}}>
                {renderSearch()}
                </div>
                {renderTitle()}
                {renderContent()}
                <div style={{ gridArea: 'button', display: 'flex', justifyContent: 'center'}}>
                {renderButton()}
                </div>
            </div>
        </div>
    );
};

export default Content;