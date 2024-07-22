import React, { useState, useEffect } from 'react';
import { post } from '../../service/service';
import { getUserInfo } from '../../service/function';
import HeaderContent from '../Header/HeaderContent';
import HeadForm from './Element/HeadForm';
import Loading from '../Loading';

const FormRespond = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        titre: '',
        description: '',
        questions: []
    });

    useEffect(() => {
        FormInfo();
        getUserInfo().then(data => {
            setUserInfo(data);
            setLoading(false);
        });
    }, []);

    const FormInfo = () => {
        return post(`responseFormulaire/`, { id_stage: props.objectId.stageId, id_formulaire: props.objectId.fromId }).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log("Data from API:", data);
                const newForm = {
                    titre: data.titre,
                    description: data.description,
                    questions: data.question ? data.question.map(question => ({
                        ...question,
                        checkbox: question.checkbox ? question.checkbox : [],
                    })) : []
                };
                console.log("form data:", newForm);
                setForm(newForm);
            }
        });
    };

    const onInputChange = (e, questionIndex) => {
        const newQuestions = [...form.questions];
        newQuestions[questionIndex].response.stage = props.objectId.stageId;
        newQuestions[questionIndex].response.content = e.target.value;
        setForm({
            ...form,
            questions: newQuestions
        });
    };

    const onInputCheckboxChange = (e, questionIndex, optionIndex) => {
        const newQuestions = [...form.questions];
        newQuestions[questionIndex].checkbox[optionIndex].response.stage = props.objectId.stageId;
        newQuestions[questionIndex].checkbox[optionIndex].response.valeur = e.target.checked;
        setForm({
            ...form,
            questions: newQuestions
        });
    };

    const submitResponse = () => {
        return post(`validateFormulaire/`, {id: props.objectId.fromId, formulaire : form ,langue:form.langue,profile:form.profile,session:form.session ,titre: form.titre, description: form.description, question: form.questions }).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log("Data Saved", data);
            }
        }
        );
    };

    const saveBrouillonResponse = () => {
        return post(`saveFormulaire/`, {id: props.objectId.fromId, formulaire : form ,langue:form.langue,profile:form.profile,session:form.session ,titre: form.titre, description: form.description, question: form.questions }).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log("Data Saved", data);
            }
        }
        );
    };

    const buttonStyle = {
        backgroundColor: '#00AEEF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '20px',
        margin: '10px',
        cursor: 'pointer',
    };

    const InputStyle = {
        marginBottom: '10px',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontSize: '16px',
        resize: 'vertical',
        width: '100%',
        height: '100px',
    };

    const containerStyle = {
        backgroundColor: 'white',
        borderRadius: '10px',
        margin: '10px auto',
        padding: '15px',
        width: '100%',
        maxWidth: '800px', // Assurez-vous que cette valeur correspond à celle de FormHeader
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    if (loading) {
        return <Loading />; // replace with your actual loading component or message
    } else {
        return (
            <div style={{ gridTemplateArea: `'header header header' 'body body body'`, background: '#E6E6E6', height: '100%' }}>
                <HeaderContent
                    gridArea={'header'}
                    handleLogOutClick={props.handleLogOutClick}
                    data={userInfo}
                />
                <div style={{ gridArea: 'body', gridTemplateRows: 'auto auto', height: '100%', display: 'grid' }}>
                    <HeadForm
                        hasEditAccess={false}
                        title={form.titre}
                        description={form.description}
                    />
                    {form.questions.map((question, index) => (
                        <div style={containerStyle} key={index}>
                            {question.titre}
                            {question.type === 'checkbox' ? (
                                question.checkbox.map((option, optionIndex) => (
                                    <div key={optionIndex}>
                                        <label>
                                            <input type="checkbox" name={option.titre} checked={option.response.valeur} onChange={(e) => onInputCheckboxChange(e, index, optionIndex)} />
                                            {option.titre}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <input style={InputStyle} type={question.type} value={question.response.content} onChange={(e) => onInputChange(e, index)} />
                            )}
                        </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px auto' }}>
                        <button style={buttonStyle} onClick={submitResponse}>Envoyer</button>
                        <button style={buttonStyle} onClick={saveBrouillonResponse}>Brouillons</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default FormRespond;
