import React from 'react';

const Select = (props) => {
    console.log(props.value);
    if (props.value) {
    }

    return (
        <select
            name={props.name}
            onChange={(event) => props.onInputChange(event.target.name, event.target.value)}
            value={props.value}
            className='select-style'
        >
            <option value="">Sélectionner</option>
            {props.options.map((option, index) => (
                <option 
                    key={index} 
                    value={option[props.valueField] || option}
                >
                    {option[props.displayField] || option}
                </option>
            ))}
        </select>
    );
}

export default Select;

