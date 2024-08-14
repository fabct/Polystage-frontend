import ModifyData from "./Content/ModifyData";
import RenderContent from "./Content/RenderContent";
import CreateContentForm from "./Content/Element/CreateContentForm";
import SearchContent from "../CommunContent/SearchContent";
import { useState, useEffect } from 'react';
import { post, put } from "../../service/service";
import {ErrorAlert} from "../CommunContent/Alert";

const StageContent = (props) => {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchContent, setSearchContent] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [sujet, setSujet] = useState('');
    const [nomEntreprise, setNomEntreprise] = useState('');
    const [numConv, setNumConv] = useState('');
    const [tuteur, setTuteur] = useState('');
    const [etudiant, setEtudiant] = useState('');

    useEffect(() => {
        setError(false);
        setMessageError('');
        handleSearchInternship();
    }, []);

    const getTypeKeys = (type) => {
        const typeObject = props.keys.find((item) => item.type === type);
        return typeObject ? typeObject.keys : [];
    };

    const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto

    const handleCancel = () => {
        if (window.confirm("Êtes vous sur de vouloir Annuler?")) {
            setEditingId(null);
            setIsAdding(false);
            setError(false);
            setMessageError('');
            renderContent();
        }
    };

    const handleModify = (dataToEdit) => {
        setEditingId(dataToEdit.id);
        setEditing(true);
    };

    const handleInputSearch = (e) => {
        setSearchContent(e.target.value);
    };

    const handleDateDebutChange = (e) => {
        setDateDebut(e.target.value);
    };

    const handleDateFinChange = (e) => {
        setDateFin(e.target.value);
    };

    const handleSujetChange = (e) => {
        setSujet(e.target.value);
    };

    const handleNomEntrepriseChange = (e) => {
        setNomEntreprise(e.target.value);
    };

    const handleNumConvChange = (e) => {
        setNumConv(e.target.value);
    };

    const handleTuteurChange = (e) => {
        setTuteur(e.target.value);
    };

    const handleEtudiantChange = (e) => {
        setEtudiant(e.target.value);
    };

    const handleIsAdding = () => {
        setError(false);
        setMessageError('');
        setIsAdding(true);
    };

   const handleCreateStage = () => {
        return post('stageList/',{date_debut: dateDebut, date_fin: dateFin, sujet: sujet, nom_entreprise: nomEntreprise, num_conv: numConv, tuteur: tuteur, etudiant: etudiant}).then((data) => {
            if(data.error){
                setError(true);
                setMessageError(error.message);
            }
            else{
                console.log(data);
                setDateDebut('');
                setDateFin('');
                setSujet('');
                setNomEntreprise('');
                setNumConv('');
                setTuteur('');
                setEtudiant('');
                setIsAdding(false);
                handleSearchInternship();
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };
    
    const handleSearchInternship = () => {
        return post('stageSearch/',{search: searchContent}).then((data) => {
            if(data.error){
                setError(true);
            setMessageError(error.message);
            }
            else{
                console.log(data);
                setData(data);
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const renderContent = () => {
        const key = getTypeKeys("internship");
        if (editing) {
            return <ModifyData type='stage' setError={setError} setMessageError={setMessageError} editingId={editingId} setEditing={setEditing} />;
        } 
        if(isAdding){
            return <CreateContentForm 
                inputs = {[
                    { infoCell: 'Date Début', handleInpuChangeCell: handleDateDebutChange, value:dateDebut ,type: 'text' },
                    { infoCell: 'Date Fin', handleInpuChangeCell: handleDateFinChange, value:dateFin, type: 'text' },
                    { infoCell: 'Sujet', handleInpuChangeCell: handleSujetChange,value:sujet,type: 'text'},
                    { infoCell: 'Nom Entreprise', handleInpuChangeCell: handleNomEntrepriseChange,value:nomEntreprise ,type: 'text' },
                    { infoCell: 'Numéro de Convention', handleInpuChangeCell: handleNumConvChange,value:numConv ,type: 'text' },
                    { infoCell: 'Tuteur (user Id)', handleInpuChangeCell: handleTuteurChange,value:tuteur ,type: 'text' },
                    { infoCell: 'Etudiant (user Id)', handleInpuChangeCell: handleEtudiantChange,value:etudiant ,type: 'text' },
                ]}
                handleCreate={handleCreateStage}
                handleCancel={handleCancel}
                type={"stage"}
                cellAddStyle={cellAddStyle}
                isAddingTitle={'Nouveau stage'}
            />;
        }

        return(
            <div style={{gridTemplateAreas:`'button button button' 'result result result'`}}>
                <div className='mx-2 my-3 clearfix' style={{gridArea:'button'}}>
                    <div className='float-start'>
                        <SearchContent 
                            isSearching = {true}
                            SearchTitle = {'Rechercher un utilisateur'}
                            handleInputSearch = {handleInputSearch}
                            type={'text' }                 
                            handleSearch = {handleSearchInternship}
                        />
                    </div>
                    <div className='float-end my-auto'>
                        <button type="button" className='btn btn-primary' onClick={handleIsAdding}>Créer</button>
                    </div>
                </div>
                <div className='mx-2 my-3' style={{gridArea:'result',borderRadius:'5px'}}>
                <RenderContent 
                    researchTitle={'Résultat de la recherche'}
                    inputsTitle = {[{ name: 'Id'},{ name: 'Nom Entreprise'},{ name: 'Sujet'},{ name: 'Confidentialité'},{ name: 'Date de debut'},{ name: 'Date de fin'}]}
                    isAdding={false}
                    isSearching={true}
                    data={data}
                    handleModify = {handleModify}
                    handleSearch = {handleSearchInternship}
                    function = {'stageDetails'}
                    type = {'intership'}
                    keys = {key}
                />
                </div>
            </div>
        );
    }

    return(
        <div>
            {error === true ? <ErrorAlert message={messageError} />: null}
            <div style={{padding:'10px'}}>
                {renderContent()}
            </div>
        </div>
    );
}

export default StageContent;