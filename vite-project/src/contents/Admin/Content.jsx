import React, { useState, useEffect } from 'react';
import { get, post, put } from '../../service/service';
import ContentTitle from './Content/Element/Title';
import ImportContent from '../Admin/Content/ImportContent';
import ExportContent from '../Admin/Content/ExportContent';
import documentCreator from '../../service/documentCreator';
import * as XLSX from 'xlsx';
import {ErrorAlert} from '../CommunContent/Alert';

const Content = (props) => {

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');;
    const [data, setData] = useState([]);
    const [file, setFile] = useState({});
    const [isUpload, setIsUpload] = useState(false);
    const [isDownload, setIsDownload] = useState(false);
    const [exportOption, setExportOption] = useState('');
    const [fileType, setFileType] = useState('');
    const [promoSelected, setPromoSelected] = useState(null);


    useEffect(() => {
        setError(false);
        setMessageError('');
    }, []);

    const handleDropFile = (e) => {
        setFile('')
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.ms-excel.sheet.macroEnabled.12','application/vnd.oasis.opendocument.spreadsheet','application/vnd.oasis.opendocument.spreadsheet-template','application/vnd.ms-excel.sheet.binary'];
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
                    setFile(prevFile => ({...prevFile, ...sheetdata}));
                }
            }
            else{
                window.alert('Format de fichier non pris en charge');
                setFile(null);
                setIsUpload(false);
            } 
        } 
        e.target.value = '';
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

    const getTypeKeys = (type) => {
        const typeObject = props.keys.find((item) => item.type === type);
        return typeObject ? typeObject.keys : [];
    };

    const handleIsAdding = () => {
        setError(false);
        setMessageError('');
        if(props.type === 'export'){
            setIsDownload(true);
            exportData(promoSelected,exportOption);
        }
        if(props.type === 'import' && isUpload){
            handleUploadFile();
        }
    }


    /*
        Pour import
    */
    const importDataStructureToUpload = {
        user: ['email','first_name', 'last_name', 'profile', 'num_etudiant'],
        stage: ['email_tuteur', 'sujet', 'confidentiel', 'date_debut', 'date_fin','nom_entreprise','num_etudiant','num_convention'],
        session: ['nom'],
        soutenance: ['num_convention', 'nom_session', 'date_soutenance', 'heure_soutenance', 'num_jury'],
        // jury combination of jury and membresJury
        jury: ['nom_session', 'num_jury', 'zoom', 'campus','batiment','salle'],
        membresJury: ['membresJury'],  
    };

    const importDataFileStructure = {
        Utilisateur : [ 'Email','First Name', 'Last Name', 'Profile', 'Num Etudiant'],
        Stage : ['Email Tuteur', 'Sujet', 'Confidentiel', 'Date Debut', 'Date Fin', 'Nom Entreprise', 'Num Etudiant','Num de Convention'],
        Session : ['Nom'],
        Soutenance : ['Num Convention', 'Nom Session', 'Date Soutenance', 'Heure Soutenance', 'Num Jury'],
        Jury : ['Nom Session','Num Jury','Zoom' ,'Campus', 'Batiment', 'Salle'],
        MembresJury : ['Num Jury','Email']
    };

    const sectionMapping = {
        Utilisateur: 'user',
        Stage: 'stage',
        Session: 'session',
        Soutenance: 'soutenance',
        Jury: 'jury',
        MembresJury: 'membresJury'
    };    

    const handleUploadFile = () => {
        console.log(file);
        const transformedData = transformData(file, sectionMapping, importDataStructureToUpload, importDataFileStructure);
        if(fileType === 'user'){
            return post(`importUser/`, transformedData.user).then((data) => {
                if(data.errors){
                    for (const error of data.errors) {
                        const error1 = JSON.stringify(error.error)
                        const user = JSON.stringify(error.user)
                        window.alert(error1+`\n`+user);
                        setFile(null);
                    }
                }
                else{
                    setFile(null);
                    window.alert('Utilisateur importé avec succès !');
                }
            }).catch((error) => {
                setError(true);
                setMessageError(error.message);
            });
        }
        else if(fileType === 'stage'){  
            return post(`importStage/`, transformedData.stage).then((data) => {
                if(data.errors){
                    console.error(data.errors);
                    for (const error of data.errors) {
                        const error1 = JSON.stringify(error.errors)
                        const stage = JSON.stringify(error.stage)
                        window.alert(error1+`\n`+stage);
                        setFile(null);
                    }
                }
                else{
                    setFile(null);
                    window.alert('Stage importé avec succès !');
                }
            }).catch((error) => {
                setError(true);
                setMessageError(error.message);
            });
        }
        else if(fileType === 'soutenance'){
            console.log(transformedData);
            return post(`importSoutenance/`, transformedData.soutenance).then((data) => {
                if(data.errors){
                    console.error(data.errors);
                    for (const error of data.errors) {
                        const error1 = JSON.stringify(error.errors)
                        const stage = JSON.stringify(error.soutenance)
                        window.alert(error1+`\n`+stage);
                        setFile(null);
                    }
                }
                else{
                    setFile(null);
                    window.alert('Soutenance importé avec succès !');
                }
            }).catch((error) => {
                setError(true);
                setMessageError(error.message);
            });
        }
        else if(fileType === 'jury'){
            console.log(transformedData);
            return post(`importJury/`, {jury: transformedData.jury, membresJury: transformedData.membresJury}).then((data) => {
                if(data.errors){
                    console.error(data.errors);
                    for (const error of data.errors) {
                        const error1 = JSON.stringify(error.errors)
                        const stage = JSON.stringify(error.jury)
                        window.alert(error1+`\n`+stage);
                        setFile(null);
                    }
                }
                else{
                    setFile(null);
                    window.alert('Jury importé avec succès !');
                }
            }).catch((error) => {
                setError(true);
                setMessageError(error.message);
            });
        }
        else if(fileType === 'session'){
            console.log(transformedData);
            return post(`importSession/`, transformedData.session).then((data) => {
                if(data.errors){
                    for (const error of data.errors) {
                        console.error(error);
                        const error1 = JSON.stringify(error.errors)
                        const session = JSON.stringify(error.session)
                        window.alert(error1+`\n`+session);
                        setFile(null);
                    }
                }
                else{
                    setFile(null);
                    window.alert('Session importé avec succès !');
                }
            }).catch((error) => {
                setError(true);
                setMessageError(error.message);
            });
        }
        else{
            window.alert('Aucun type de fichier selectionné');
            setIsUpload(false);
        }
    }

    const transformData = (importedData, sectionMapping, dataStructureMap, fileStructureMap) => {
        const transformedData = {};
    
        Object.keys(sectionMapping).forEach(section => {
            const targetSection = sectionMapping[section];
            const dataKeys = dataStructureMap[targetSection];
            const fileKeys = fileStructureMap[section];
    
            // Vérifiez si la section existe dans les données importées
            if (!importedData[section] || !fileKeys) return;
    
            if (section === 'MembresJury') {
                transformedData[targetSection] = importedData[section].map(row => row['Email']);
            } else {
                transformedData[targetSection] = importedData[section].map(row => {
                    const transformedRow = {};
                    dataKeys.forEach((key, index) => {
                        if(row[fileKeys[index]]){
                            transformedRow[key] = row[fileKeys[index]];
                        }
                    });
                    return transformedRow;
                });
            }
        });
    
        return transformedData;
    };



    /*
        Pour export
    */
   const promoDetails = (id) => {
        return get(`promoDetails/${id}`).then((data) => {
            if(data.error){
                setError(true);
                setMessageError(error.message);
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
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
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
            }).catch((error) => {
                setError(true);
                setMessageError(error.message);
            }
            );
        }
    }

    // Rendu du contenu
    const renderContent = () => {
        const key = getTypeKeys(props.type);
        if (props.type === 'import') {
            return(
                <>
                <ImportContent
                    isUpload={isUpload}
                    handleDropFile = {handleDropFile}
                    data={file}
                    setFileType={setFileType}
                    fileType={fileType}
                /> 
                <button className='btn btn-primary' onClick={handleIsAdding}>Download</button>
                </>
            );
        }
        if (props.type === 'export') {
            return(
                <>
                <ExportContent
                    style={{margin:'5px 10px', gridColumn:'2/3', borderRadius:'20px',background:'white', padding: '10px'}}
                    data={data}
                    exportOption={exportOption}
                    handleSetExportOption={handleSetExportOption}
                    handlePromoSelected={handlePromoSelected}
                    setFileType={setFileType}
                    fileType={fileType}
                />
                <button className='btn btn-primary' onClick={handleIsAdding}>Download</button>
                </>
            );
        }
        // Ajoutez d'autres conditions pour les autres types
    };



    return (
        <div>
            {error === true ? <ErrorAlert message={messageError} />: null}
            <div style={{gridTemplateAreas:`'button button button' 'result result result'`, padding:'10px'}}>
                <div className='mx-2 my-3' style={{gridArea:'result',borderRadius:'5px'}}>
                {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Content;