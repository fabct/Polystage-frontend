import {useState, useEffect} from 'react';
import { get } from "../../service/service";
import Info from '../CommunContent/InternshipInfo';
import FormList from '../CommunContent/FormList';
import Loading from '../Loading';

const StudentPage = (props) => {
    const [formData, setFormData] = useState([]);
    const [existingInternship, setExistingInternship] = useState(false);
    const [noteData, setNoteData] = useState(null);
    const [studentData, setStudentData] = useState(null);

    const [selectedStageIndex, setSelectedStageIndex] = useState(0);
    const [stageData, setStageData] = useState(null);

    const path = [
        {type : 'stage', keys: ['nom_entreprise','sujet','confidentiel','date_debut','date_fin']},
        {type : 'soutenance', keys: ['date_soutenance','heure_soutenance','jury.campus','jury.batiment','jury.salle','jury.num_jury','jury.zoom']},
        {type : 'resultat', keys: ['note']}
    ];

    const descriptionKeys = [
        {type : 'stage', keys: ['Company','Subject','Confidential','Start date','End date']},
        {type : 'soutenance', keys: ['Date','Time', 'Campus', 'Batiment', 'Salle', 'Jury n°', 'Lien Zoom']},
        {type : 'resultat', keys: ['Note']}
    ];

    useEffect(() => {
        handleSearchInternship();
    }, []);

    useEffect(() => {
        if (stageData) {
            handleGetForm();
        }
    }, [stageData]);


    const handleStageChange = (event) => {
        console.log(event.target.value);
        setSelectedStageIndex(Number(event.target.value));
        const value = studentData.stage[Number(event.target.value)].confidentiel;
        if (value !== 'Oui' && value !== 'Non') {
            studentData.stage[Number(event.target.value)].confidentiel = value ? 'Oui' : 'Non';
        }
        if(studentData.stage[Number(event.target.value)].soutenance[0].soutenu){
            setNoteData({note :studentData.stage[Number(event.target.value)].soutenance[0].note});
        }
        setStageData(studentData.stage[Number(event.target.value)]);
        handleGetForm();
    };

    const handleSearchInternship = () => {
        return get('etudiantAll/').then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setStudentData(data);        
                data.stage[selectedStageIndex].confidentiel = data.stage[selectedStageIndex].confidentiel ? 'Oui' : 'Non';
                if(!data.stage[selectedStageIndex].soutenance[0].soutenu){
                    setNoteData({note :data.stage[selectedStageIndex].soutenance[0].note});
                }
                setStageData(data.stage[selectedStageIndex]);
                setExistingInternship(true);
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

    if (!existingInternship) {
        return <Loading />;
    }

    return(
        <>
            <div className='mx-4 mt-2' style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: 'auto auto auto', gap: '10px'}}>
                <div className='form-floating' style={{gridColumn: '1/4', gridRow: '1/2'}}>
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" value={selectedStageIndex} onChange={handleStageChange}>
                        {studentData.stage.map((stage, index) => (
                            <option key={stage.id} value={index}>
                                {stage.nom_entreprise} - {stage.sujet}
                            </option>
                        ))}
                    </select>
                    <label htlmfor="floatingSelect">Sélectionnez un stage</label>
                </div>
                <Info
                    title={'Stage'}
                    style={{gridColumn: '1/2', gridRow: '2/3'}}
                    keys={path}
                    type={path[0].type}
                    descriptionKeys={descriptionKeys}
                    data={stageData}
                    existingInternship={existingInternship}
                />
                <Info
                    title={'Convocation'}
                    style={{gridColumn:'2/3', gridRow:'2/3'}}
                    keys={path}
                    type={path[1].type}
                    descriptionKeys={descriptionKeys}
                    data={stageData}
                    existingInternship={existingInternship}
                />
                <Info 
                    title={'Resultat'}
                    style={{gridColumn: '3', gridRow: '2/3'}}
                    keys={path}
                    type={path[2].type}
                    descriptionKeys={descriptionKeys}
                    data={noteData}
                    existingInternship={existingInternship}
                />
                <div style={{display: 'grid',gridColumn: '1/4',gridRow: '3/3'}}>
                    <FormList forms={formData} role={props.role} setObjectId={props.setObjectId} stageId={stageData.id}/>
                </div>
            </div>
        </>
    );
}

export default StudentPage;