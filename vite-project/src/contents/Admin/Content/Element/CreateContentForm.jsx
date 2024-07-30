import { buttonDeleteStyle, buttonStyle3 } from "../../../Styles";
import { useState } from 'react';
import { post } from '../../../../service/service';
import DataTable from './DataTable';
import AddInSession from './AddInSession';

const CreateContentForm = (props) => {

    const [selectedOption, setSelectedOption] = useState("");
    const [selectedData, setSelectedData] = useState("");
    const [add, setAdd] = useState(false);
    const [availableData, setAvailableData] = useState([]);

    const handleInputChange = (event) => {
        setSelectedData(event.target.value);
    };

    const handdleChangeOption = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleMemberAddClick = (id) => {
        setSelectedData('');
        setAdd(false);
    };

    const handleCancelClick = () => {
        setSelectedData('');
        setAdd(false);
    };
    
    const handleSelectChange = (event) => {
        setSelectedData(event.target.value);
    };

    const handleAdd = (key) => {
        add ? setAdd(false) : setAdd(true);
        if(key === 'Etudiant'){
            return post(`userSearch/`, {search:'',profile:'ETU'}).then(data => {
                if(data.error){
                    console.error(data.error);
                }
                else{
                    console.log(data);
                    setAvailableData(data);
                }
            })
        }
    };

    const inputsMap = {
        "ETU": props.inputs2,
    };

    const inputs = inputsMap[selectedOption] || [];

    const renderField = (key, value, type,handleInpuChangeCell) => {
        if(value === undefined && type === 'object'){
            value = [];
        }
        else if(value === undefined){
            value = '';
        }

        if (type === 'object') {
            return (
                <DataTable 
                    title={key} 
                    headers={['Id', 'Email', 'Nom', 'Prénom', 'Actions']}
                    data={value.map(({ id, email, last_name, first_name }) => ({
                        id,
                        email,
                        last_name,
                        first_name,
                    }))}
                    handleRemove={props.handleRemove}
                    handleRowClick={null}
                    addButtonLabel={`Ajouter ${key}`}
                    handleAdd={()=> handleAdd(key)}
                />
            );
        }

        if (type === 'boolean') {
            return (
                <div key={key}>
                    <label>{key.replace('_', ' ')}: {value ? 'Oui' : 'Non'}</label>
                </div>
            );
        }

        if (type === 'selector') {
            return (
                <div key={key}>
                    <label>{key.replace('_', ' ')}:</label>
                    <select
                        name={key}
                        value={value}
                        onChange={(e) => {props.handleChangeSelect(e), handdleChangeOption(e)}}
                    >
                        {props.options.map((option, index) => (
                            <option key={index} value={option.value}>{option.text}</option>
                        ))}
                    </select>
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
                        onChange={handleInpuChangeCell}
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
                    onChange={handleInpuChangeCell}
                />
            </div>
        );
    };

    const renderContent = () => {
        if(add){
            return(
                <AddInSession 
                title={`Ajouter`}
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

        return (
            <>
                <form>
                    {props.inputs.map((input, index) => (
                        <div key={index} style={props.cellAddStyle}>
                            {renderField(input.infoCell, input.value, input.type, input.handleInpuChangeCell)}
                        </div>
                    ))}
                    {inputs.map((input, index) => (
                        <div key={index} style={props.cellAddStyle}>
                            {renderField(input.infoCell, input.value, input.type, input.handleInpuChangeCell)}
                        </div>
                    ))}
                </form>
                <div className='button-group'>
                    <button className="btn btn-danger" onClick={props.handleCancel}>Annuler</button>
                    <button className="btn btn-success" onClick={props.handleCreate}>Créer</button>
                </div>
            </>
        );
    };

    return (
        <div className="modify-data-content">
            <h1>{props.isAddingTitle}</h1>
            {renderContent()}
        </div>
    );
}

export default CreateContentForm;
