import React from 'react';
import { useNavigate } from 'react-router-dom';
import { role_str } from '../../service/app-local';

const FormList = (props) => {
    const navigate = useNavigate();

    const handleRespond = (id) => {
        const objectId = {fromId:id, stageId:props.stageId, role:props.role, role_str:role_str[props.role]};
        props.setObjectId(objectId);
        navigate(`/${objectId.role_str}/form/${id}`, { state: { objectId } });
    };

    return (
        <div className='formList-container'>
            <h1 className='formList-title'>Formulaires :</h1>
            <div className='formList-overflow'>
                {props.forms.map((form) => (
                    <div key={form.id} className='formList-details'>
                        <div className='formList-details-style'>Titre : {form.titre}</div>
                        <div className='formList-details-style'>Description : {form.description}</div>
                        <div className='formList-details-style'>Date limite : {form.date_limite}</div>
                        <button type="button" className='btn btn-primary btn-lg' onClick={() => handleRespond(form.id)}>Remplir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormList;
