import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormList = (props) => {
    const containerStyle = {
        margin: '0 10px',
        background: 'white',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const headerStyle = {
        margin: '0',
        fontSize: '30px',
        fontFamily: 'CalibriRegular',
        color: '#356084'
    };

    const formDetailsStyle = {
        flexDirection: 'column',
        marginTop: '10px',
        padding: '10px',
        background: '#f9f9f9',
        borderRadius: '10px',
        border: '1px solid #ddd',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const detailItemStyle = {
        margin: '10px 0',
        fontSize: '18px',
        fontFamily: 'CalibriRegular',
        color: '#333'
    };

    const buttonStyle = {
        marginTop: '20px',
        backgroundColor: '#00AEEF',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontFamily: 'CalibriRegular',
        fontSize: '16px',
        fontWeight: 'bold'
    };

    const navigate = useNavigate();

    const handleRespond = (id) => {
        props.setObjectId(id);
        navigate(`/${props.role}/form/${id}`);
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Formulaires :</h1>
            {props.forms.map((form) => (
                <div key={form.id} style={formDetailsStyle}>
                    <div style={detailItemStyle}>Titre : {form.titre}</div>
                    <div style={detailItemStyle}>Description : {form.description}</div>
                    <button style={buttonStyle} onClick={() => handleRespond(form.id)}>Remplir</button>
                </div>
            ))}
        </div>
    );
};

export default FormList;
