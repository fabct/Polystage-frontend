import React from 'react';

const Info = (props) => {
    if (!props.existingInternship || !props.data || !props.data[props.type]) {
        return (
            <div className='content-info' style={props.style}>
                <h1 className='header-style-internship-info title-internship-info'>{props.title}</h1>
                <h1 className='header-style-internship-info title-internship-info'>Revenez Bientôt</h1>
            </div>
        );
        
    }

    const getNestedValue = (obj, key) => {
        return key.split('.').reduce((acc, part) => acc && acc[part] ? acc[part] : null, obj);
    };
        
    const currentKeys = props.keys.find(keyObj => keyObj.type === props.type).keys;
    const currentDescriptions = props.descriptionKeys.find(descObj => descObj.type === props.type).keys;
    const dataObject = props.data[props.type][0]

    if (!dataObject) {
        return (
            <div className='content-info' style={props.style}>
                <h1 className='header-style-internship-info title-internship-info'>{props.title}</h1>
                <h1 className='header-style-internship-info title-internship-info'>Revenez Bientôt</h1>
            </div>
        );
    }
    return (
        <div className='content-info content-true' style={props.style}>
            <h1 className='header-style-internship-info title-content-internship-info'>{props.title}</h1>
            {currentKeys.map((key, index) => (
                <div key={index} className='.info-item-internship-info'>
                    <div className='description-internship-info'>{currentDescriptions[index]}:</div>
                    <div className='value-internship-info'>{getNestedValue(dataObject,key)}</div>
                </div>
            ))}
        </div>
    );
};

export default Info;
