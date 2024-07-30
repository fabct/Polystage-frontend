import React from 'react';
import ContentTitle from './Element/Title';
import CreateContentForm from './Element/CreateContentForm';


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


const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto

const content = (props) => {
    if(props.isAdding) {
        return(

            <CreateContentForm 
                inputs={props.inputs}
                inputs2={props.inputs2}
                options={props.options}
                handleChangeSelect={props.handleChangeSelect}
                infoCellSelect={props.infoCellSelect}
                handleCreate={props.handleCreate}
                handleCancel={props.handleCancel}
                type={props.type}
                cellAddStyle={cellAddStyle}
                isAddingTitle={props.isAddingTitle}
            />
        );
    }
    else{
        return(
            <div style={{background:'white'}}>
                <ContentTitle 
                researchTitle={props.researchTitle}
                inputs = {props.inputsTitle}
                isSearching={props.isSearching}
                />
                <div id={props.content} className="render-table">
                    {props.data.map((data) => (
                        <div className="tr-style mb-3" key={data.id} onClick={() => props.handleModify(data)}> 
                            {props.keys.map((key) => (
                                <div className="cell-style" key={key}>{getNestedValue(data, key)}</div>
                            ))}
                           </div>
                    ))}
                </div>
            </div>
        );
    }
}

const RenderContent = (props) => {
    
    return ( 
        <>
            {content(props)}
        </>
    );
}

export default RenderContent;