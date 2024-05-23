import InputSearch from './Content/Element/InputSearch'
import { useState } from 'react';
import { useEffect } from 'react';
import SearchButton from './Content/Element/SearchButton';
import Button from '../Login/ButtonLoginPage';
import { post,put } from '../../service/service';
import RenderContent from './Content/RenderContent';
import ContentTitle from './Content/Element/Title';

const SerchContent = (props) => {

    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [email, setEmail] = useState('');
    const [profile, setProfile] = useState('');
    const [numStudent, setNumStudent] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    useEffect(() => {
        if(props.content === 'user'){
            handleSearchUser();
        }

    }
    ,[]);
    /*
    dans cette partie on va s'occuper des fonction pour mémoiriser les entrée dans les champs
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
                setUsers(data);
            }
        })
    }

    const handleModify = (user) => {
        setName(user.last_name);
        setFirstName(user.first_name);
        setEmail(user.email);
        setEditingId(user.id);
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

    const handleDoModifyUser = () => {
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

    const Content = (content) => {
        if( content === 'user'){
        return(
            <RenderContent data={users} handleModify={handleModify} handleSearch={handleSearchUser} function={'userDetails'} editingId={editingId} isAdding={isAdding} content={props.content}
            // Upadate elémént 
            infoCellUpdate1 = {'Prenom :'} infoCellUpdate2 = {'Nom :'} infoCellUpdate3 = {'Email :'} infoCellUpdate4 = {'Profile :'} handleChangeCellUpdate1 = {handleFirstNameChange} handleChangeCellUpdate2 = {handleNameChange} handleChangeCellUpdate3 = {handleEmailChange} handleDoModify={handleDoModifyUser}
            // Add elémént
            infoCellAdd1 = {'Prenom :'} infoCellAdd2 = {'Nom :'} infoCellAdd3 = {'Email :'} infoCellAdd4 = {'Password :'} infoCellAdd5 = {'Verify Password :'} infoCellAdd6 = {'Profile :'} infoCellAdd7 = {'Numéro étudiant :'} infoCellAdd8 = {'Date de naissance :'} Cells6 = {profile} handleChangeCell1 = {handleFirstNameChange} handleChangeCell2 = {handleNameChange} handleChangeCell3 = {handleEmailChange} handleChangeCell4 = {handlePasswordChange} handleChangeCell5 = {handleVerifyPasswordChange} handleChangeCell6 = {handleProfileChange} handleChangeCell7 = {handleNumStudentChange} handleChangeCell8 = {handleBirthDateChange} handleCancel = {handleCancel} handleCreate = {handleCreateUser}
            />
        );
        }
        else if(content === 'internship'){

        }
    }


    return(
        <div style={{margin:'78px 70px', gridTemplateAreas:`'search . .' 'result result result' '. . button'`,borderRadius: '20px', background: '#D9D9D9', padding:'10px'}}>
            <div style={{gridArea:'search', margin:'20px 20px', borderRadius: '20px', background:'white', display:'inline-block'}}>
            <h1 style={{margin: '5px 10px',padding: '10px 10px 0px',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Rechercher des utilisateurs :</h1>
                <div style={{padding: '10px 10px 0px 10px', margin:'10px',display: 'flex'}} > 
                    <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>First name :</h1>
                    <InputSearch 
                        onChange = {handleFirstNameChange}
                        marginLeft={'15px'}
                        type={'text'}
                    />
                </div>
                <div style={{padding: '2px 10px',margin:'10px' ,display: 'flex'}}> 
                    <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Name :</h1>
                    <InputSearch 
                        onChange = {handleNameChange}
                        marginLeft={'15px'}
                        type={'text'}
                    />
                </div>
                <div style={{padding: '0px 10px 10px 10px',margin:'10px',display: 'flex'}}>
                    <h1 style={{margin:'0',color: '#000', fontFamily: 'CalibriRegular', fontSize: '24px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Email :</h1>
                    <InputSearch 
                        onChange = {handleEmailChange}
                        marginLeft={'15px'}
                        type={'text'}
                    />
                    <SearchButton 
                        onClick={handleSearchUser}
                    />
                </div>
            </div>
            <ContentTitle 
                researchTitle={'Résultat de la recherche'}
                Cell1={'First Name'}
                Cell2={'Name'}
                Cell3={'Email'}
                Cell4={'Profile'}
                Cell5={'Modify'}
                Cell6={'Add'}
                isAdding={isAdding}
                isAddingTitle={'Nouvel un utilisateur'}
            />
            <div style={{gridArea:'result', margin:'10px 20px', height:'325px',background:'white',borderRadius:'20px',overflow:'auto'}}>
                {Content(props.content)}
            </div>
            <div style={{ gridArea: 'button', display: 'flex'}}>
                <Button
                    content={'Créer'}
                    onClick={() => setIsAdding(true)}
                />
            </div>
        </div>
    );
}

export default SerchContent;