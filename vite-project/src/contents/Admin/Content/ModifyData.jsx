import { useEffect, useState } from 'react';
import { get, post, delet, put} from '../../../service/service';
import DataTable from './Element/DataTable';
import AddInSession from './Element/AddInSession';
import Loading from '../../Loading';
import { ErrorAlert } from '../../CommunContent/Alert';

const ModifyData = (props) => {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [dataDetails, setDataDetails] = useState(null);
    const [selectedData, setSelectedData] = useState('');
    const [availableData, setAvailableData] = useState([]);
    const [add,setAdd] = useState(false);

    useEffect(() => {
        if (props.type) {
            getInfoData();
        }
    }, [props.type]);

    const getInfoData = () => {
        return get(`${props.type}Details/${props.editingId}/`).then((response) => {
            setDataDetails(response);
            console.log(response);
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const handleBackClick = () => {
        window.confirm('Êtes vous vraiment sûr de revenir en arrière vos changement ne seront pas sauvegarder ?');
        props.setEditing(false);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDataDetails({
            ...dataDetails,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRemove = (id) => {
        console.log(id);
        return delet(`manageJuryMembreJury/`, {id_jury:props.editingId,id_membreJury: id}).then(data => {
            if(data.error){
                setError(true);
                setMessageError(data.error);
            }
            else{
                console.log(data);
                setAdd(false);
                setError(false);
                setMessageError('');
                getInfoData();
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const handleAddEnsigant = () => {
        setAdd(true);
        return post(`userSearch/`, {search:'',profile:''}).then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setAvailableData(data);
            }
        })
    };

    const handleSubmit = (e) => {
        window.confirm('Voulez-vous vraiment sauvegarder vos modification ?');
        return put(`${props.type}Details/${props.editingId}/`).then((response) => {
            window.alert(response.success);
            props.setEditing(false);
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const handleDelete = () => {
        window.confirm('Voulez-vous vraiment supprimer cet item ?');
        return delet(`${props.type}Details/${props.editingId}/`).then((response) => {
            window.alert(response.success);
            props.setEditing(false);
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const handleCancelClick = () => {
        setAdd(false);
    }

    const handleSelectChange = (e) => {
        setSelectedData(e.target.value);
    };

    const handleMemberAddClick = (id_membreJury) => {
        return post(`manageJuryMembreJury/`, {id_jury:props.editingId,id_membreJury: id_membreJury}).then(data => {
            if(data.error){
                setError(true);
                setMessageError(data.error);
            }
            else{
                console.log(data);
                setAdd(false);
                setError(false);
                setMessageError('');
                getInfoData();
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    }

    const renderContent = () => {
        if (!dataDetails) {
            return <Loading />;
        }

        if(add){
            return (
                <AddInSession 
                title="Ajouter un membre au jury"
                selected={selectedData}
                availableData={availableData.map(({ id, first_name, last_name, email }) => ({
                        id,
                        first_name,
                        last_name,
                        email
                }))}
                handleSelectChange={handleSelectChange}
                handleStudentAddClick={handleMemberAddClick}
                handleCancelClick={handleCancelClick}
                />
            );
        }

        const renderField = (key, value) => {
            const fieldType = typeof value;
            console.log(fieldType);
            if (key === 'id') return null; // Skip the ID field

            if (fieldType === 'object') {
                if(props.type === 'jury' && value !== null){
                return (
                    <DataTable title={key} headers={['Id','Email','Nom', 'Prénom','Actions']}
                        data={value.map(({id, email ,last_name, first_name}) => ({
                            id,
                            email,
                            last_name,
                            first_name,
                        }))}
                        handleRemove={handleRemove}
                        handleRowClick={null}
                        addButtonLabel="Ajouter un membre du jury"
                        handleAdd={handleAddEnsigant}
                    />
                );
                }
            }

            if (fieldType === 'boolean') {
                return (
                    <div key={key}>
                        <label>{key.replace('_', ' ')}: {value ? 'Oui' : 'Non'}</label>
                    </div>
                );
            }

            if (key.includes('email')) {
                return (
                    <div key={key}>
                        <label>{key.replace('_', ' ')}:</label>
                        <input
                            type="email"
                            name={key}
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                );
            }

            return (
                <div key={key}>
                    <label>{key.replace('_', ' ')}:</label>
                    <input
                        type="text"
                        name={key}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            );
        };

        return (
            <>
                <h1>Détails de la donnée</h1>
                {Object.keys(dataDetails).map(key => renderField(key, dataDetails[key]))}
                <div className='button-group'>
                    <button type="button" className='btn btn-success' onClick={handleSubmit}>Sauvegarder</button>
                    <button type="button" className='btn btn-danger'onClick={handleDelete}>Supprimer</button>
                    <button type="button" className='btn btn-primary' onClick={handleBackClick}>Retour</button>
                </div>
            </>
        );
    };

    return (
        <>
        {error === true ? <ErrorAlert message={messageError} />: null}
        <div className='modify-data-content'>
            
            {renderContent()}
        </div>
        </>
    );
}

export default ModifyData;
