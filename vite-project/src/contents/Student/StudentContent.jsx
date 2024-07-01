import '../../index.css'
import HeaderContent from '../Header/HeaderContent';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../../service/function";
import { get } from "../../service/service";
import Info from './InternshipInfo';
import { buttonStyle3 } from '../Styles';

const StudentPage = (props) => {
    const navigate = useNavigate();
    const [noteData, setNoteData] = useState(null); // [ {id: 1, note: 12}, {id: 2, note: 15}, {id: 3, note: 10} ]
    const [formData, setFormData] = useState([]);
    const [existingInternship, setExistingInternship] = useState(false);
    const [internshipData, setInternshipData] = useState(null);


    const path = [
        {type : 'stage', keys: ['nom_entreprise','sujet','confidentiel','date_debut','date_fin']},
        {type : 'soutenance', keys: ['date','time','place']},
        {type : 'resultat', keys: ['note']}
    ];

    const descriptionKeys = [
        {type : 'stage', keys: ['Company','Subject','Confidential','Start date','End date']},
        {type : 'soutenance', keys: ['Date','Time']},
        {type : 'resultat', keys: ['Note']}
    ];

    const trStyle = {
        margin: '10px 10px',
        backgroundColor:'white',  
        borderRadius: '10px',
        boxShadow: '0px 4px 4px #00000040',
        height: '50px',
        display: 'flex',
        gridColumn: '1/4', 
        gridRow: '3/3'
    }

    useEffect(() => {
        handleSearchInternship();
        handleGetForm();
        console.log(internshipData);
    }, []);

    const handleSearchInternship = () => {
        return get('etudiantAll/'+props.userInfo.id+"/").then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setExistingInternship(true);
                setInternshipData(data);
            }
        });
    };

    const handleGetForm = () => {
        return get(`formulaireDetails/40a90560-27a3-4727-9f07-ab6d21966b5f/`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setFormData(data);
            }
        })
    }

    const handleRespond = () => {
        props.setNewFormId(formData.id);
        navigate(`/student/form/${formData.id}`);
    }

    return(
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: 'auto auto auto', gap: '10px', padding: '20px 20px 0px 20px' }}>
                <Info
                    title={'Stage'}
                    style={{gridColumn: '1/2', gridRow: '1/2'}}
                    keys={path}
                    type={path[0].type}
                    descriptionKeys={descriptionKeys}
                    data={internshipData}
                    existingInternship={existingInternship}
                />
                <Info
                    title={'Convocation'}
                    style={{gridColumn:'2/3', gridRow:'1/2'}}
                    keys={path}
                    type={path[1].type}
                    descriptionKeys={descriptionKeys}
                    data={internshipData}
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
                <div style={containerStyle}>
                    <h1 style={headerStyle}>Formulaires :</h1>
                    <div style={formDetailsStyle}>
                        <div style={detailItemStyle}>Titre : {formData.title}</div>
                        <div style={detailItemStyle}>Description : {formData.description}</div>
                        <button style={buttonStyle} onClick={handleRespond}>Remplir</button>
                    </div>
                </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'auto auto',padding: '0px 20px 20px 20px'}}>
               {/*<DragDrop
                    title={'Presentation'}
                    style={{display:'grid',margin:'5px 10px', gridColumn:'1/2', borderRadius:'20px',background:'white', padding: '10px'}}
                />
                <DragDrop
                    title={'Rapport'}
                    style={{margin:'5px 10px', gridColumn:'2/3', borderRadius:'20px',background:'white', padding: '10px'}}
                /> */}
            </div>
        </>
    );
}

const containerStyle = {
    margin: '0 10px',
    display: 'grid',
    gridColumn: '1/4',
    gridRow: '3/3',
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
    display: 'flex',
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

export default StudentPage;