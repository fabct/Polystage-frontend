import { useEffect, useState } from 'react';
import { get, post } from '../../../service/service';
import DataTable from './Element/DataTable';
import AddInSession from './Element/AddInSession';

const ModifyData = (props) => {
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

    const handleRemove = () => {
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
        e.preventDefault();
    };

    const handleCancelClick = () => {
        setAdd(false);
    }

    const handleSelectChange = (e) => {
        setSelectedData(e.target.value);
    };

    const handleMemberAddClick = () => {
    }

    const renderContent = () => {
        if (!dataDetails) {
            return <div>Loading...</div>;
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
                    <button type="button" className='add-button' onClick={handleSubmit}>Sauvegarder</button>
                    <button type="button" className='remove-button'>Supprimer</button>
                    <button type="button" className='back-button' onClick={handleBackClick}>Retour</button>
                </div>
            </>
        );
    };

    return (
        <div className='modify-data-content'>
            {renderContent()}
        </div>
    );
}

export default ModifyData;
