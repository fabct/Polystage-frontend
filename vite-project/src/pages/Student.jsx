import '../index.css'
import HeaderContent from '../contents/Header/HeaderContent';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../service/function";
import { get } from "../service/service";
import Info from '../contents/Student/InternshipInfo';
import { buttonStyle3 } from '../contents/Styles';

const StudentPage = (props) => {
    const navigate = useNavigate();
    const [selectedButton, setSelectedButton] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [noteData, setNoteData] = useState(null); // [ {id: 1, note: 12}, {id: 2, note: 15}, {id: 3, note: 10} ]
    const [formData, setFormData] = useState([]);
    const [existingInternship, setExistingInternship] = useState(false);
    const [internshipData, setInternshipData] = useState(null);
    const [loading, setLoading] = useState(true);

    const keys = [
        {type : 'internship', keys: ['nom_entreprise','sujet','confidentiel','date_debut','date_fin']},
        {type : 'convocation', keys: ['date','time','place']},
    ];

    const descriptionKeys = [
        {type : 'internship', keys: ['Company','Subject','Confidential','Start date','End date']},
        {type : 'convocation', keys: ['Date','Time']},
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
        getUserInfo().then(data => {
        setUserInfo(data);
        setLoading(false);});
        handleGetForm();
    }, []);

    const handleSearchInternship = () => {
        return get('stageList/').then((data) => {
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

    if (loading) {
        return <div>Loading...</div>; // replace with your actual loading component or message
    }
    else{
    return(
        <div style={{gridTemplateArea:`'header header header' 'body body body'`, background: '#E6E6E6',height:'100%'}}>
            <HeaderContent 
                gridArea={'header'}
                handleLogOutClick ={props.handleLogOutClick}
                data={userInfo}
            />
            <div style={{gridArea:'body', gridTemplateRows:'auto auto',height:'100%'}}>
                <div style={{ position: 'relative' }}>
                    {/* Div 1 */}
                    <div style={{padding:'20px',height: '50px', backgroundColor: '#003865' }}>
                        <h1 style={{margin:'0', textAlign:'center', fontSize:'48px', fontFamily:'CalibriRegular', color:'white'}}> Bonjour {userInfo.first_name} {userInfo.last_name}</h1>
                    </div>
      
                    {/* Div 2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridTemplateRows: 'auto auto auto', gap: '10px', padding: '20px 20px 0px 20px' }}>
                        <Info
                            title={'Stage'}
                            style={{margin:'0 10px',gridColumn:'1/2', gridRow:'1/2', borderRadius:'20px',background:'white',padding: '10px' }}
                            keys={keys}
                            descriptionKeys={descriptionKeys}
                            data={internshipData}
                            existingInternship={existingInternship}
                        />
                        <Info
                            title={'Convocation'}
                            style={{margin:'0 10px',gridColumn:'2/3', gridRow:'1/2', borderRadius:'20px',background:'white',padding: '10px' }}
                            keys={keys}
                            descriptionKeys={descriptionKeys}
                            data={internshipData}
                            existingInternship={existingInternship}
                        />
                        <Info 
                            title={'Resultat'}
                            style={{ margin: '0 10px', gridColumn: '3', gridRow: '1/2', borderRadius: '20px', background: 'white', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                            keys={keys}
                            descriptionKeys={descriptionKeys}
                            data={noteData}
                            existingInternship={existingInternship}
                        />
                        <div style={{margin: '0 10px',display: 'grid', gridColumn: '1/4', gridRow: '3/3', background:'white',borderRadius: '20px',padding: '10px'}}>
                            <h1 style={{margin:'0',fontSize:'30px', fontFamily:'CalibriRegular'}}>Formulaires :</h1>
                            <div style={trStyle}>
                                <div style={{alignContent:'center', margin:'10px'}}>Titre : {formData.title}</div>
                                <div style={{alignContent:'center', margin:'10px'}}>Description : {formData.description}</div>
                                <button style={buttonStyle3} onClick={handleRespond}>Remplir</button>
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
                </div>
            </div>
        </div>
    );
    }
}

export default StudentPage;