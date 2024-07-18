import { useEffect, useState } from 'react';
import { get, post } from '../../service/service';
import DataTable from './Content/Element/DataTable';
import AddInSession from './Content/Element/AddInSession';
import Loading from '../Loading';

const SessionDetails = (props) => {
    const [session, setSession] = useState(null);
    const [addStudent, setAddStudent] = useState(false);
    const [addJury, setAddJury] = useState(false);
    const [selectedData, setSelectedData] = useState('');
    const [availableData, setAvailableData] = useState([]);

    useEffect(() => {
        getInfoSession();
        
    }, []);

    const getInfoSession = () => {
        return get(`getInfoSession/${props.editingId}/`).then((response) => {
            setSession(response);
            console.log(response);
        });
    };

    const handleRemove = (id) => {
        window.confirm('Voulez-vous vraiment retirer cet item ?');
    };

    const handleBackClick = () => {
        props.setEditing(false);
    };

    const handleAddStudent = () => {
        setAddStudent(true);
        return post(`userSearch/`, {search: '',profile:'ETU'}).then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setAvailableData(data);
            }
        })
    };

    const handleJuryAddClick = () => {
    }

    const handleStudentAddClick = () => {
    }

    const handleAddJury = () => {
        setAddJury(true);
        return get(`juryList/`).then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setAvailableData(data);
            }
        })
    };

    const handleSelectChange = (e) => {
        setSelectedData(e.target.value);
    };

    const handleCancelClick = () => {
        window.confirm('Voulez-vous annuler ce que vous êtes entrain de faire ?');
        setAddStudent(false);
        setAddJury(false);
    };

    if (!session) {
        return (
            <Loading />
        );
    }
     
    const renderContent = () => {
        if(addStudent){
            return(
                <AddInSession 
                    title="Ajouter un étudiant"
                    selected={selectedData}
                    availableData={availableData.map(({ id, first_name, last_name, email }) => ({
                        id,
                        first_name,
                        last_name,
                        email
                    }))}
                    handleSelectChange={handleSelectChange}
                    handleStudentAddClick={handleStudentAddClick}
                    handleCancelClick={handleCancelClick}
                />
            );
        }

        if(addJury){
            return(
                <AddInSession 
                title="Ajouter un Jury"
                selected={selectedData}
                availableData={availableData.map(({ num_jury }) => ({
                    num_jury
                }))}
                handleSelectChange={handleSelectChange}
                handleStudentAddClick={handleJuryAddClick}
                handleCancelClick={handleCancelClick}
                />
            );
        }

        return(
            <div className="session-details-container">
            <h1>Détails de la session: {session.nom}</h1>
        
            <DataTable
                title="Étudiants"
                headers={['Nom', 'Prénom', 'Email', 'Actions']}
                data={session.etudiants.map(({ id, last_name, first_name, email }) => ({
                    id,
                    last_name,
                    first_name,
                    email
                }))}
                handleRemove={handleRemove}
                handleRowClick={null}
                addButtonLabel="Ajouter un étudiant"
                handleAdd={handleAddStudent}
            />
        

            <DataTable
                title="Jurys"
                headers={['Numéro', 'Salle', 'Actions']}
                data={session.jurys.map(({ num_jury, salle }) => ({
                    num_jury,
                    salle
                }))}
                handleRemove={handleRemove}
                handleRowClick={null}
                addButtonLabel="Ajouter un jury"
                handleAdd={handleAddJury}
            />
            {session.fini ? (<div className="session-message">La session est terminée</div>) : (<div className="session-message"> La session est actuellement en cours </div>)}
        </div>
        );
    }

    return (
        <div className='session-content'>
            {renderContent()}
            <div className='back-div'>
                <button className='back-button' onClick={handleBackClick}>Retour</button>
            </div>
        </div>
    );
};

export default SessionDetails;
