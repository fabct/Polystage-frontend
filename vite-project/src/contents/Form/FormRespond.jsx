import React, { useState, useEffect } from 'react';
import { post } from '../../service/service';
import { getUserInfo } from '../../service/function';
import { useNavigate } from 'react-router-dom';
import HeaderContent from '../Header/HeaderContent';
import HeadForm from './Element/HeadForm';
import Loading from '../Loading';

const FormRespond = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notModify, setNotModify] = useState(false);
    const [form, setForm] = useState({
        id: '',
        titre: '',
        description: '',
        session: '',
        profile:'',
        langue: '',
        question: []
    });

    useEffect(() => {
        FormInfo();
        getUserInfo().then(data => {
            setUserInfo(data);
            setLoading(false);
        });
    }, []);

    const navigate = useNavigate();

    const FormInfo = () => {
        return post(`responseFormulaire/`, { id_stage: props.objectId.stageId, id_formulaire: props.objectId.fromId }).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log("Data from API:", data);
                const newForm = {
                    id: data.id,
                    langue: data.langue,
                    profile: data.profile,
                    session: data.session,
                    titre: data.titre,
                    description: data.description,
                    question: data.question ? data.question.map(question => ({
                        ...question,
                        response: question.response ? question.response : [],
                        checkbox: question.checkbox ? question.checkbox : [],
                    })) : []
                };
                if(data.profile !== props.objectId.role){
                    setNotModify(true);
                }
                console.log("form data:", newForm);
                setForm(newForm);
            }
        });
    };

    const onInputChange = (e, questionIndex) => {
        const newQuestions = [...form.question];
        newQuestions[questionIndex].response.stage = props.objectId.stageId;
        newQuestions[questionIndex].response.content = e.target.value;
        setForm({
            ...form,
            question: newQuestions
        });
    };

    const onInputCheckboxChange = (e, questionIndex, optionIndex) => {
        const newQuestions = [...form.question];
        newQuestions[questionIndex].checkbox[optionIndex].response.stage = props.objectId.stageId;
        newQuestions[questionIndex].checkbox[optionIndex].response.valeur = e.target.checked;
        setForm({
            ...form,
            question: newQuestions
        });
    };

    const submitResponse = () => {
        window.confirm("Etes vous sur de vouloir envoyer vos réponse ? \n Vous ne pourrez plus les modifier après !");
        return post(`validateFormulaire/`, {formulaire: form, id_stage: props.objectId.stageId}).then((data) => {
            if (data.error) {
                window.alert("Erreur lors de l'envoi du formulaire"+data.error);
            } else {
                console.log("Data validate", data);
                navigate(`/${props.objectId.role}`);
            }
        });
    };

    const saveBrouillonResponse = () => {
        window.confirm("Etes vous sur de vouloir erregistrer ce formulaire en brouillon ?");
        return post(`saveFormulaire/`, {formulaire: form, id_stage: props.objectId.stageId}).then((data) => {
            if (data.error) {
                window.alert("Erreur lors de la sauvegarde du formulaire"+data.error);
            } else {
                console.log("Data Saved", data);
                navigate(`/${props.objectId.role}`);
            }
        });
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
                    {form.question.map((question, index) => (
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
                    {notModify ?(<></>):(
                        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px auto' }}>
                            <button style={buttonStyle} onClick={submitResponse}>Envoyer</button>
                            <button style={buttonStyle} onClick={saveBrouillonResponse}>Brouillons</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default FormRespond;
