import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormList = (props) => {
    const navigate = useNavigate();

    const handleRespond = (id) => {
        props.setObjectId({fromId:id, stageId:props.stageId});
        navigate(`/${props.role}/form/${id}`);
    };

    return (
        <div className='formList-container'>
            <h1 className='formList-title'>Formulaires :</h1>
            <div className='formList-overflow'>
                {props.forms.map((form) => (
                    <div key={form.id} className='formList-details'>
                        <div className='formList-details-style'>Titre : {form.titre}</div>
                        <div className='formList-details-style'>Description : {form.description}</div>
                        <button onClick={() => handleRespond(form.id)}>Remplir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormList;
