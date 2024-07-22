import React, { useState, useEffect } from 'react';
import { get } from '../../service/service';
import Info from '../Student/InternshipInfo';
import FormList from '../CommunContent/FormList';
import Loading from '../Loading';

const Tuteur = (props) => {
    const [studentData, setStudentData] = useState(null);
    const [existingInternship, setExistingInternship] = useState(false);
    const [selectedStageIndex, setSelectedStageIndex] = useState(0);
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

    const path = [
        {type : 'stage', keys: ['nom_entreprise','sujet','confidentiel','date_debut','date_fin']},
        {type : 'soutenance', keys: ['date_soutenance','heure_soutenance','place']},
        {type : 'resultat', keys: ['note']}
    ];

    const descriptionKeys = [
        {type : 'stage', keys: ['Company','Subject','Confidential','Start date','End date']},
        {type : 'soutenance', keys: ['Date','Time']},
        {type : 'resultat', keys: ['Note']}
    ];

    const handleGetInternship = () => {
        return get('getStageTuteur/').then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setExistingInternship(true);
                setStudentData(data);
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
        setStageData(studentData[Number(event.target.value)]);
        handleGetForm();
    };

    if (!existingInternship) {
        return <Loading />;
    }

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <label htmlFor="stageSelect" style={{ marginRight: '10px' }}>Sélectionnez un stage :</label>
            <select id="stageSelect" value={selectedStageIndex} onChange={handleStageChange}>
                {studentData.map((stage, index) => (
                    <option key={stage.id} value={index}>
                        {stage.nom_entreprise} - {stage.sujet}
                    </option>
                ))}
            </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: 'auto auto auto', gap: '10px', padding: '20px 20px 0px 20px' }}>
            <Info
                title={'Stage'}
                style={{gridColumn: '1/2', gridRow: '1/2'}}
                keys={path}
                type={path[0].type}
                descriptionKeys={descriptionKeys}
                data={stageData}
                existingInternship={existingInternship}
            />
            <Info
                title={'Convocation'}
                style={{gridColumn:'2/3', gridRow:'1/2'}}
                keys={path}
                type={path[1].type}
                descriptionKeys={descriptionKeys}
                data={stageData}
                existingInternship={existingInternship}
            />
            <div style={{margin: '0 10px',display: 'grid',gridColumn: '1/4',gridRow: '3/3'}}>
                <FormList forms={formData} role={props.role} setObjectId={props.setObjectId} stageId={stageData.id}/>
            </div>
        </div>
    </>
    );
}

export default Tuteur;