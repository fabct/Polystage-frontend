import React from 'react';
import Select from './Select';
import {role} from '../../../service/app-local';

const RightRespond = (props) => {


    return (
        <div className='right-respond-style'>
        <div className="select-wrapper">
            Selcetionner une session concernée par ce formulaire :
            <Select value={props.form.session} options={props.session} name={'session'} valueField={'id'} displayField={'nom'} onInputChange={props.onInputChange}/>
        </div>
        <div className="select-wrapper">
            Selectionner le type de profil qui peut répondre à ce formulaire :
            <Select value={props.form.profile} options={role} name={'profile'} onInputChange={props.onInputChange}/>
        </div>
        <div className="langue">
            <label>Langue du formulaire</label>
            <select name="langue" value={props.form.langue} onChange={(event) => props.onInputChange(event.target.name, event.target.value)}>
                <option value="">selectionner</option>
                <option value="FR">Français</option>
                <option value="EN">Anglais</option>
            </select>
        </div>
    </div>
    );
};

export default RightRespond;