import React from 'react';

const Question = ({ index, title, type, updateQuestion, deleteQuestion, checkboxOptions, addCheckboxOption, deleteCheckboxOption, handleCheckboxOptionChange }) => {

    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: '10px auto',
        padding: '15px',
        width: '100%',
        maxWidth: '800px', // Assurez-vous que cette valeur correspond à celle de FormHeader
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const QuestionStyle = {
        width: '100%',
        height: '100px',
        marginBottom: '10px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontSize: '16px',
        resize: 'vertical'
    };

    const InputStyle = {
        margin: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    };

    const selectStyle = {
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    };

    const buttonStyle = {
        backgroundColor: 'rgb(11, 96, 131)',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        margin: '10px',
        cursor: 'pointer'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '5px'
    };

    return (
        <div style={containerStyle}>
            <div>
                <label style={labelStyle}>Question :</label>
                <textarea
                    name="description"
                    value={title}
                    onChange={(e) => updateQuestion(index, 'titre', e.target.value)}
                    style={QuestionStyle}
                ></textarea>
            </div>
            <div>
                <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Type :</label>
                    <select
                        value={type}
                        onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                        style={selectStyle}
                    >
                        <option value="text">Text</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="paragraph">Paragraph</option>
                        <option value="dropdown">Dropdown</option>
                    </select>
                    {type === 'checkbox' && (
                        <>
                            <div style={{ display: 'block' }}>
                                <button style={buttonStyle} onClick={addCheckboxOption}>Add option</button>
                                <label style={labelStyle}>Options :</label>
                                {checkboxOptions.map((option, optionIndex) => (
                                    <div key={optionIndex} style={{ display: 'block' }}>
                                        Option {optionIndex + 1}:
                                        <input
                                            type="text"
                                            value={option.titre}
                                            onChange={(e) => handleCheckboxOptionChange(index, optionIndex, e.target.value)}
                                            style={InputStyle}
                                        />
                                        <button style={buttonStyle} onClick={() => deleteCheckboxOption(optionIndex)}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button onClick={() => deleteQuestion(index)} style={buttonStyle}>Delete</button>
                </div>
            </div>
        </div>
    );
}

export default Question;
