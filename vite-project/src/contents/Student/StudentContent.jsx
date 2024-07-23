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
        {type : 'soutenance', keys: ['date_soutenance','heure_soutenance','place']},
        {type : 'resultat', keys: ['note']}
    ];

    const descriptionKeys = [
        {type : 'stage', keys: ['Company','Subject','Confidential','Start date','End date']},
        {type : 'soutenance', keys: ['Date','Time']},
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
                setExistingInternship(true);
                setStudentData(data);
                setStageData(data.stage[selectedStageIndex]);
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
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <label htmlFor="stageSelect" style={{ marginRight: '10px' }}>Sélectionnez un stage :</label>
                <select id="stageSelect" value={selectedStageIndex} onChange={handleStageChange}>
                    {studentData.stage.map((stage, index) => (
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
                <Info 
                    title={'Resultat'}
                    style={{gridColumn: '3', gridRow: '1/2'}}
                    keys={path}
                    type={path[2].type}
                    descriptionKeys={descriptionKeys}
                    data={noteData}
                    existingInternship={existingInternship}
                />
                <div style={{margin: '0 10px',display: 'grid',gridColumn: '1/4',gridRow: '3/3'}}>
                    <FormList forms={formData} role={props.role} setObjectId={props.setObjectId} stageId={stageData.id}/>
                </div>
            </div>
        </>
    );
}

export default StudentPage;