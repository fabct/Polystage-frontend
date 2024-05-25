import React from 'react';
import plusCircle from '../../../assets/plusCircle.svg'; // Assurez-vous de fournir le chemin correct vers votre image

const FormHeader = (props) => {
    const containerStyle = {
        margin: '10px auto',
        maxWidth: '800px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        background: '#fff'
    };

    const inputStyle = {
        width: '100%',
        marginBottom: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '30px'
    };

    const textAreaStyle = {
        width: '100%',
        height: '100px',
        marginBottom: '10px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontSize: '16px',
        resize: 'vertical'
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end'
    };

    const buttonStyle = {
        width: '50px',
        height: '50px',
        border: 'none',
        background: 'none',
        cursor: 'pointer'
    };

    return (
        <div style={containerStyle}>
            <div>
                <input
                    disabled={!props.hasEditAccess}
                    name="title"
                    onChange={(event) => props.onInputChange(event.target.name, event.target.value)}
                    placeholder="Titre du formulaire"
                    value={props.title}
                    style={inputStyle}
                />
                <textarea
                    disabled={!props.hasEditAccess}
                    name="description"
                    onChange={(event) => props.onInputChange(event.target.name, event.target.value)}
                    placeholder="Description du formulaire"
                    value={props.description}
                    style={textAreaStyle}
                ></textarea>
            </div>
            {props.hasEditAccess && (
                <div style={buttonContainerStyle}>
                    <button onClick={props.addQuestion} type="button" style={buttonStyle}>
                        <img src={plusCircle} alt="plus" style={{ width: '100%', height: '100%' }} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormHeader;
