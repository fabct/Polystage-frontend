import ModifyData from "./Content/ModifyData";
import RenderContent from "./Content/RenderContent";
import CreateContentForm from "./Content/Element/CreateContentForm";
import SearchContent from "../CommunContent/SearchContent";
import { useState, useEffect } from 'react';
import { post, put } from "../../service/service";
import {ErrorAlert} from "../CommunContent/Alert";


const UserContent = (props) => {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchContent, setSearchContent] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [numStudent, setNumStudent] = useState('');

    useEffect(() => {
        setError(false);
        setMessageError('');
        handleSearchUser();
    }, []);

    const getTypeKeys = (type) => {
        const typeObject = props.keys.find((item) => item.type === type);
        return typeObject ? typeObject.keys : [];
    };

    const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto

    const handleCancel = () => {
        if (window.confirm("Êtes vous sur de vouloir Annuler?")) {
            setEditingId(null);
            setName('');
            setFirstName('');
            setEmail('');
            setProfile('');
            setNumStudent('');
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

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleProfileChange = (e) => {
        setProfile(e.target.value);
    };

    const handleNumStudentChange= (e) => {
        setNumStudent(e.target.value);
    };

    const handleIsAdding = () => {
        setError(false);
        setMessageError('');
        setIsAdding(true);
    };

    const handleCreateUser = () => {
        return post(`userList/`, {first_name: firstName, last_name: name, email: email,num_etudiant: numStudent, profile: profile})
        .then(data => {
            if(data.error){
                setName('');
                setFirstName('');
                setEmail('');
                setProfile('');
                setNumStudent('');
                setIsAdding(false);
                handleSearchUser();
                setError(true);
                setMessageError(error.message);
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
                window.alert('Utilisateur créer !');
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };
    
    const handleSearchUser = () => {
        setEditingId(null);
        setIsAdding(false);
        setData([]);
        return post(`userSearch/`, {search: searchContent}).then(data => {
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
        const key = getTypeKeys("user");
        if (editing) {
            return <ModifyData type='user' setError={setError} setMessageError={setMessageError} editingId={editingId} setEditing={setEditing} />;
        } 
        if(isAdding){
            return <CreateContentForm 
                inputs = {[
                    { infoCell: 'First Name', handleInpuChangeCell: handleFirstNameChange,value:firstName ,type: 'text' },
                    { infoCell: 'Name', handleInpuChangeCell: handleNameChange,value:name, type: 'text' },
                    { infoCell: 'Email', handleInpuChangeCell: handleEmailChange,value:email,type: 'text'},
                    { infoCell: 'Profile', handleInpuChangeCell: handleProfileChange,value:profile ,type: 'selector' }
                ]}
                inputs2 = {[
                    { infoCell: 'Numéro Etudiant', handleInpuChangeCell: handleNumStudentChange,value:numStudent ,type: 'text' },
                ]}
                options = {[
                    {value: "",text: "Sélectionner profile", type: 'text' },
                    {value: "ADM",text: "ADM", type: 'text' },
                    {value: "ETU",text: "ETU", type: 'text' },
                    {value: "ENS",text: "ENS", type: 'text' },
                    {value: "TUT",text: "TUT", type: 'text' },
                    {value: "PRO",text: "PRO", type: 'text' },
                ]}
                handleChangeSelect={handleProfileChange}
                infoCellSelect={'Profile :'}
                handleCreate={handleCreateUser}
                handleCancel={handleCancel}
                type={"user"}
                cellAddStyle={cellAddStyle}
                isAddingTitle={'Nouvel utilisateur'}
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
                            handleSearch = {handleSearchUser}
                        />
                    </div>
                    <div className='float-end my-auto'>
                        <button type="button" className='btn btn-primary' onClick={handleIsAdding}>Créer</button>
                    </div>
                </div>
                <div className='mx-2 my-3' style={{gridArea:'result',borderRadius:'5px'}}>
                    <RenderContent 
                    researchTitle={'Résultat de la recherche'}
                    inputsTitle = {[{ name: 'Id'},{ name: 'Prénom'},{ name: 'Nom'},{ name: 'Mail'},{ name: 'Profil'}]}
                    isSearching={true}
                    
                    data={data}
                    
                    isAdding = {false}
                    editingId = {editingId}
                    handleCancel = {handleCancel}
                    handleModify = {handleModify}
                    handleSearch = {handleSearchUser}
                    function = {'userDetails'}
                    type = {"user"}
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

export default UserContent;