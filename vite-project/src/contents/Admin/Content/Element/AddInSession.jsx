import React, { useState } from 'react';

const AddInSession = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [displayValue, setDisplayValue] = useState(''); // Nouvel état pour l'affichage

    const handleInputChange = (event) => {
        const selectedValue = JSON.parse(event.target.value);
        setInputValue(selectedValue.id);
        setDisplayValue(selectedValue.fullName);
    };

    const handleInputFocus = () => {
        setDisplayValue(' '); // Mettre un espace pour déclencher le filtrage
        setTimeout(() => setDisplayValue(''), 0); // Réinitialiser l'input après un court délai
    };

    const filteredData = props.availableData.filter(item => {
        const fullName = item.first_name ? `${item.first_name} ${item.last_name} (${item.email})` : `Jury ${item.num_jury}`;
        return fullName.toLowerCase().includes(displayValue.trim().toLowerCase());
    });

    return (
        <>
            <div className="add-container">
                <h1>{props.title}</h1>
                <div>
                    <input 
                        list="brow" 
                        value={displayValue} 
                        onChange={handleInputChange} 
                        onFocus={handleInputFocus} 
                        className="form-control" 
                        placeholder="Sélectionner ou entrer une valeur" 
                    />
                    <datalist id="brow">
                        {filteredData.map((item, index) => (
                                <option key={index} value={JSON.stringify({id: item.id, fullName: item.first_name ? `${item.first_name} ${item.last_name} (${item.email})` : `Jury ${item.num_jury}`})}>
                                {item.first_name ? `${item.first_name} ${item.last_name} (${item.email})` : `Jury ${item.num_jury}`}
                            </option>
                        ))}
                    </datalist>
                </div>
                <div className="button-group">
                    <button className="btn btn-success" onClick={() => props.handleStudentAddClick(inputValue)}>Ajouter</button>
                    <button className="btn btn-danger" onClick={props.handleCancelClick}>Annuler</button>
                </div>
            </div>
        </>
    );
};

export default AddInSession;