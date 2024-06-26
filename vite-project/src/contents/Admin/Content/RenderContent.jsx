import React from 'react';
import ModifyButton from './Element/ModifyButton';
import DeleteButton from './Element/DeleteButton';
import CreateContentForm from './Element/CreateContentForm';
import { buttonDeleteStyle, buttonStyle3 } from '../../Styles';

// Paramètres pour le render Content
/*
    data : Données à afficher
    fields : Champs à afficher
    inputs1 : Inputs pour la création
    inputs2 : Inputs pour la création
    options : Options pour le select
    selector : Afficher le select
    handleChangeSelect : Fonction pour le select
    infoCellSelect : Texte pour le select
    handleCreate : Fonction pour la création
    isAdding : Booléen pour la création
    editingId : Id de l'élément à modifier
    handleCancel : Fonction pour annuler
    handleModify : Fonction pour modifier
    handleDoModify : Fonction pour modifier
    handleSearch : Fonction pour rechercher
    function : Fonction à appeler
    type : Type de contenu
    keys : Clés pour les champs
*/

const getNestedValue = (obj, key) => {
    return key.split('.').reduce((acc, part) => acc && acc[part] ? acc[part] : null, obj);
};

const trStyle = {
    margin: '10px 10px',
    backgroundColor:'white', 
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    height: '50px',
    display: 'flex'
}

const cellStyle = {textAlign: 'center', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1, margin: 'auto'}; // Add flex: 1 and width: auto

const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto


const RenderContent = (props) => {
    
    return ( 
        <div style={{ height:'400px',overflow:'auto'}}>
        { props.isAdding ? (
            <CreateContentForm 
                inputs1={props.inputs1}
                inputs2={props.inputs2}
                options={props.options}
                selector={props.selector}
                handleChangeSelect={props.handleChangeSelect}
                infoCellSelect={props.infoCellSelect}
                handleCreate={props.handleCreate}
                handleCancel={props.handleCancel}
                type={props.type}
                cellAddStyle={cellAddStyle}
                

            />
            ) : (
                <div id={props.content}>
                    {props.data.map((data) => (
                            <div style={trStyle} key={data.id}>
                            {props.editingId === data.id ? (
                                <>
                                    {props.fields.map((field, index) => (
                                        <div key={index} style={cellStyle}>
                                            {field.infoCellUpdate} : 
                                            {field.beUpdate ? (
                                                <input style={{ marginLeft: '5px' }} defaultValue={getNestedValue(data, field.key)} onChange={field.handleChangeCellUpdate}/>
                                                ):(
                                                    <>
                                                    {getNestedValue(data, field.key)}
                                                    </>
                                                )}
                                        </div>
                                    ))}
                                    <button style={buttonDeleteStyle} onClick={props.handleCancel}>Annuler</button>
                                    <button style={buttonStyle3} onClick={props.handleDoModify}>Valider</button>
                            
                                </>
                                ) : (
                                <>
                                {props.keys.map((key) => (
                                    <div style={cellStyle} key={key}>{getNestedValue(data, key)}</div>
                                ))}
                                <div style={cellStyle}>
                                    <ModifyButton
                                        handleModify={() => props.handleModify(data)}
                                    />
                                </div>
                                <div style={cellStyle}>
                                    <DeleteButton 
                                        id={data.id}
                                        refresh={props.handleSearch}
                                        function={props.function}
                                    />
                                </div>
                                </>
                                )}
                            </div>
                    ))}
                </div>
            )
        }
        </div>
    );
}

export default RenderContent;