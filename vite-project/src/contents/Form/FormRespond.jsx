import React, { useState, useEffect } from 'react';
import { post } from '../../service/service';
import { getUserInfo } from '../../service/function';
import { useNavigate,useLocation } from 'react-router-dom';
import HeaderContent from '../Header/HeaderContent';
import HeadForm from './Element/HeadForm';
import Loading from '../Loading';
import {ErrorAlert} from "../CommunContent/Alert";

const FormRespond = (props) => {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
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
        date_limite: '',
        question: []
    });

    const location = useLocation();
    const objectId = location.state.objectId;

    useEffect(() => {
        FormInfo();
        getUserInfo().then(data => {
            setUserInfo(data);
            setLoading(false);
        });
    }, []);

    const navigate = useNavigate();

    const FormInfo = () => {
        return post(`responseFormulaire/`, { id_stage: objectId.stageId, id_formulaire: objectId.fromId }).then((data) => {
            if (data.error) {
                navigate(`/${objectId.role_str}`);
                window.alert(data.error);
            } else {
                console.log("Data from API:", data);
                const newForm = {
                    id: data.id,
                    date_limite: data.date_limite,
                    langue: data.langue,
                    profile: data.profile,
                    session: data.session,
                    titre: data.titre,
                    description: data.description,
                    question: data.question ? data.question.map(question => ({
                        ...question,
                        response: question.response ? question.response : {content: '', stage: ''},
                        checkbox: question.checkbox ? question.checkbox.map(checkbox => ({
                            ...checkbox,
                            response: checkbox.response ? checkbox.response : {valeur: false, stage: ''},
                        })): [],
                    })) : []
                };
                if(data.profile !== objectId.role){
                    setNotModify(true);
                }
                console.log("form data:", newForm);
                setForm(newForm);
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const onInputChange = (e, questionIndex) => {
        const newQuestions = [...form.question];
        newQuestions[questionIndex].response.stage = objectId.stageId;
        newQuestions[questionIndex].response.content = e.target.value;
        setForm({
            ...form,
            question: newQuestions
        });
    };

    const onInputCheckboxChange = (e, questionIndex, optionIndex) => {
        const newQuestions = [...form.question];
        newQuestions[questionIndex].checkbox[optionIndex].response.stage = objectId.stageId;
        newQuestions[questionIndex].checkbox[optionIndex].response.valeur = e.target.checked;
        setForm({
            ...form,
            question: newQuestions
        });
    };

    const submitResponse = () => {
        window.confirm("Etes vous sur de vouloir envoyer vos réponse ? \n Vous ne pourrez plus les modifier après !");
        return post(`validateFormulaire/`, {formulaire: form, id_stage: objectId.stageId}).then((data) => {
            if (data.error) {
                window.alert("Erreur lors de l'envoi du formulaire"+data.error);
            } else {
                console.log("Data validate", data);
                navigate(`/${objectId.role_str}`);
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    };

    const saveBrouillonResponse = () => {
        window.confirm("Etes vous sur de vouloir erregistrer ce formulaire en brouillon ?");
        return post(`saveFormulaire/`, {formulaire: form, id_stage: objectId.stageId}).then((data) => {
            if (data.error) {
                window.alert("Erreur lors de la sauvegarde du formulaire"+data.error);
            } else {
                console.log("Data Saved", data);
                navigate(`/${objectId.role_str}`);
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
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
        return(
            <>
                {error === true ? <ErrorAlert message={messageError} />: null}
                <Loading />
            </>
        );
    } else {
        return (
            <div style={{ gridTemplateArea: `'header header header' 'body body body'`, background: '#E6E6E6', height: '100%' }}>
                <HeaderContent
                    gridArea={'header'}
                    handleLogOutClick={props.handleLogOutClick}
                    data={userInfo}
                />
                <div style={{ gridArea: 'body', gridTemplateRows: 'auto auto', height: '100%', display: 'grid' }}>
                    {error === true ? <ErrorAlert message={messageError} />: null}
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
