
import React, { useState, useEffect} from 'react';
import { getUserInfo } from "../../service/function";
import HeaderContent from '../Header/HeaderContent';
import HeadForm from './Element/HeadForm';
import Question from './Element/QuestionForm';
import RightRespond from './Element/RightRespond';
import { get, post, put } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

/*
    FormCreator
    on dois récuperer les informations du formulaire (titre, description, questions) et les sauvegarder dans la base de données
    on doit pouvoir ajouter des questions
    on doit pouvoir supprimer des questions
    on doit pouvoir modifier les questions
    on doit pouvoir modifier les informations du formulaire
    on doit pouvoir soumettre les modifications
    on envoie les informations du formulaire à la base de données et ce sont les suivantes 
    {
        uid: 'string',
        title: 'string',
        description: 'string',
        questions: [
            {
                title: 'string',
                type: 'string',
                answer: 'string'
            }
        ]
        sent : 'boolean'
    }

    {
        id: 'string',
        "title":"string",
        "description":"string",
        "questions":[
            {
                "idform":"string,
                "idQuestion":"string",
                "title":"string",
                "type":"string"
                "checkbox":[{
                    idQuestion:"string",
                    title:"string"
                }]
            }
        ]
    }
    Un utilisateur peut formuler qu'une seule réponse au formulaire mais peut modifier ces réponses tant n'est pas soumis
*/

function FormCreator(props) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState([]);
    const [form, setForm] = useState({
        titre: null,
        description: null,
        session: null,
        profile:null,
        langue:null,
        questions: []
    });

    useEffect(() => {
        if(!props.create){
            modifyForm();
        }
        getSession();
        getUserInfo().then(data => {
            setUserInfo(data);
            setLoading(false);
        });
    }, []);

    const navigate = useNavigate();

    const onInputChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const addQuestion = () => {
        setForm({
            ...form,
            questions: [...form.questions, { titre: '', type: 'text', checkbox: [] }]
        });
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...form.questions];
        newQuestions[index][field] = value;
        setForm({
            ...form,
            questions: newQuestions
        });
    };

    const deleteQuestion = (index) => {
        const newQuestions = [...form.questions];
        newQuestions.splice(index, 1);
        setForm({
            ...form,
            questions: newQuestions
        });
    };

    const addCheckboxOption = (questionIndex) => {
        const newQuestions = [...form.questions];
        const newCheckboxOptions = [...newQuestions[questionIndex].checkbox, { titre: '' }];
        newQuestions[questionIndex].checkbox = newCheckboxOptions;
        setForm({
            ...form,
            questions: newQuestions
        });
    };

    const deleteCheckboxOption = (questionIndex, optionIndex) => {
        const newQuestions = [...form.questions];
        newQuestions[questionIndex].checkbox = newQuestions[questionIndex].checkbox.filter((_, i) => i !== optionIndex);
        setForm({
            ...form,
            questions: newQuestions
        });
    };

    const handleCheckboxOptionChange = (questionIndex, optionIndex, value) => {
        setForm(currentForm => {
            const newQuestions = [...currentForm.questions];
            if (!newQuestions[questionIndex].checkbox) {
                newQuestions[questionIndex].checkbox = [];
            }
            if (!newQuestions[questionIndex].checkbox[optionIndex]) {
                newQuestions[questionIndex].checkbox[optionIndex] = {};
            }
            newQuestions[questionIndex].checkbox[optionIndex].titre = value;
            return {
                ...currentForm,
                questions: newQuestions
            };
        });
    };

    const submitEditForm = () => {
        console.log(JSON.stringify(form));
        console.log(props.id);
        if(props.create){
            return post(`createFormulaireAll/`, { id: props.id,langue:form.langue,profile:form.profile,session:form.session ,titre: form.titre, description: form.description, question: form.questions }).then((data) => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    console.log(data);
                    navigate('/admin');
                }
            });
        }
        console.log(form.questions);
        return put(`modifyFormulaireAll/${props.id}/`, {id: props.id,langue:form.langue,profile:form.profile,session:form.session ,titre: form.titre, description: form.description, question: form.questions }).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data);
                navigate('/admin');
            }
        });

        
    };

    const modifyForm = () => {
        get(`getFormulaireAll/${props.id}/`).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log("Data from API:", data); // Add this line
                const newForm = {
                    titre: data.titre,
                    description: data.description,
                    session: data.session,
                    profile:data.profile,
                    langue:data.langue,
                    questions: data.question ? data.question.map(questions => ({
                        ...questions,
                        checkbox: questions.checkbox ? questions.checkbox : []
                    })) : []
                };
            setForm(newForm);
            }
        });
    };

    const getSession = () => {
        return get(`sessionList/`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setSession(data);
            }
        });
    }
    

    const buttonStyle = {
        backgroundColor: '#00AEEF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '20px',
        margin: '30px auto',
        cursor: 'pointer',
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
                    <RightRespond session={session} onInputChange={onInputChange} form={form}/>

                    <HeadForm
                        hasEditAccess={true}
                        onInputChange={onInputChange}
                        addQuestion={addQuestion}
                        title={form.titre}
                        description={form.description}
                    />
                    {form.questions.map((question, index) => (
                        <Question
                            key={index}
                            index={index}
                            title={question.titre}
                            type={question.type}
                            checkboxOptions={question.checkbox}
                            updateQuestion={updateQuestion}
                            deleteQuestion={deleteQuestion}
                            addCheckboxOption={() => addCheckboxOption(index)}
                            deleteCheckboxOption={(optionIndex) => deleteCheckboxOption(index, optionIndex)}
                            handleCheckboxOptionChange={(index,optionIndex, value) => handleCheckboxOptionChange(index, optionIndex, value)}
                        />
                    ))}
                    <button style={buttonStyle} onClick={submitEditForm}>Sauvegarder</button>
                </div>
            </div>
        );
    }
}

/*
    const handleCheckboxOptionChange = (questionIndex, optionIndex, value) => {
        const newCheckboxOptions = [...checkboxOptions];
        newCheckboxOptions[optionIndex] ={title: value};
        setCheckboxOptions(newCheckboxOptions);
        updateQuestion(questionIndex, 'checkbox', newCheckboxOptions);
    };
*/

export default FormCreator;