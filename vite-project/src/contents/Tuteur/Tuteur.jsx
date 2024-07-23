import React, { useState, useEffect } from 'react';
import { get } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import Info from '../CommunContent/InternshipInfo';
import FormList from '../CommunContent/FormList';
import Loading from '../Loading';

const Tuteur = (props) => {
    const [data, setData] = useState(null);
    const [existingInternship, setExistingInternship] = useState(false);
    const [selectedStageIndex, setSelectedStageIndex] = useState(0);
    const [confidentiel, setConfidentiel] = useState(false);
    const [stageData, setStageData] = useState(null);
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        handleGetInternship();
    }, []);

    useEffect(() => {
        if (existingInternship) {
            handleGetForm();
        }
    }, [existingInternship]);

    const navigate = useNavigate();

    const path = [
        {type : 'stage', keys: ['nom_entreprise','sujet','num_convention','confidentiel','date_debut','date_fin']},
        {type : 'etudiant', keys: ['first_name','last_name','num_etudiant','email']},
    ];

    const descriptionKeys = [
        {type : 'stage', keys: ['Entreprise','Sujet','Numéro de Convention','Confidential','Date de début du stage','Date de fin du stage']},
        {type : 'etudiant', keys: ['Prenom','Nom','Numéro Etudiant','Email']},
    ];

    const handleGetInternship = () => {
        return get('getStageTuteur/').then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setExistingInternship(true);
                
                setData(data);
                data[selectedStageIndex].confidentiel = data[selectedStageIndex].confidentiel ? 'Oui' : 'Non';
                setStageData(data[selectedStageIndex]);
            }
        });
    };

    const handleGetForm = () => {
        return get(`formUser/${stageData.id}/`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                setFormData(data);
            }
        })
    }

    const handleStageChange = (event) => {
        console.log(event.target.value);
        setSelectedStageIndex(Number(event.target.value));  
        const value = data[Number(event.target.value)].confidentiel;
        if (value !== 'Oui' && value !== 'Non') {
            if (value) setConfidentiel(true);
            data[Number(event.target.value)].confidentiel = value ? 'Oui' : 'Non';
        }
        setStageData(data[Number(event.target.value)]);
        handleGetForm();
    };

    const handleConfidentiel = (event) => {
        console.log(event.target.value);
        navigate(`/confidentiel`);
    }

    if (!existingInternship) {
        return <Loading />;
    }

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <label htmlFor="stageSelect" style={{ marginRight: '10px' }}>Sélectionnez un stage :</label>
            <select id="stageSelect" value={selectedStageIndex} onChange={handleStageChange}>
                {data.map((stage, index) => (
                    <option key={stage.id} value={index}>
                        {stage.nom_entreprise} - {stage.sujet}
                    </option>
                ))}
            </select>
        </div>
        {confidentiel?(
        <>
        
        </>
        ):(
        <>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}> Le stage est confidentiel 
            <button onClick={handleConfidentiel}>En savoir Plus</button>
            </div>
        </>)}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: 'auto auto auto', gap: '10px', padding: '20px 20px 0px 20px' }}>
            <Info
                title={'Stage'}
                style={{ gridColumn: '1/5', gridRow: '1/2' }}
                keys={path}
                type={path[0].type}
                descriptionKeys={descriptionKeys}
                data={stageData}
                existingInternship={existingInternship}
            />
            <Info
                title={'Etudiant'}
                style={{ gridColumn: '5/10', gridRow: '1/2' }}
                keys={path}
                type={path[1].type}
                descriptionKeys={descriptionKeys}
                data={stageData}
                existingInternship={existingInternship}
            />
            <div style={{margin: '0 10px',display: 'grid',gridColumn: '1/10',gridRow: '3/3'}}>
                <FormList forms={formData} role={props.role} setObjectId={props.setObjectId} stageId={stageData.id}/>
            </div>
        </div>
    </>
    );
}

export default Tuteur;