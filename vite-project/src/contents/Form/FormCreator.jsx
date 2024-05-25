
import React, { useState, useEffect} from 'react';
import { getUserInfo } from "../../service/function";
import HeaderContent from '../Header/HeaderContent';
import HeadForm from './Element/HeadForm';
import Question from './Element/QuestionForm';
import { post } from '../../service/service';

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
    useEffect(() => {
        getUserInfo().then(data => {
        setUserInfo(data);
        setLoading(false);});
    }, []);

    const [userInfo, setUserInfo] = useState(null); // Add this line
    const [loading, setLoading] = useState(true); // Add this line
    const [form, setForm] = useState({
        title: '',
        description: '',
        questions: []
    });

    const onInputChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const addQuestion = () => {
        setForm({
            ...form,
            questions: [...form.questions, { title: '', type: 'text', answer: '' }]
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

    const submitEditForm = () => {
        console.log(JSON.stringify(form));
        // Sauvegardez les informations du formulaire ici
        post(`formulaireList/`,{id:props.id,title:form.title,description:form.description}).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
            }
        })
    };

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
        return <div>Loading...</div>; // replace with your actual loading component or message
    }
    else{
    return (
        <div style={{gridTemplateArea:`'header header header' 'body body body'`, background: '#E6E6E6',height:'100%'}}>
            <HeaderContent 
                gridArea={'header'}
                handleLogOutClick ={props.handleLogOutClick}
                data={userInfo}
            />
            <div style={{gridArea:'body', gridTemplateRows:'auto auto',height:'100%', display:'grid'}}>
                <HeadForm 
                    hasEditAccess={true}
                    onInputChange={onInputChange}
                    addQuestion={addQuestion}
                    title={form.title}
                    description={form.description}
                />
                {form.questions.map((question, index) => (
                    <Question 
                        key={index}
                        index={index}
                        title={question.title}
                        type={question.type}
                        updateQuestion={updateQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))}
                <button style={buttonStyle} onClick={submitEditForm}>Sauvegarder</button>
            </div>
        </div>
        );
    }
}

export default FormCreator;