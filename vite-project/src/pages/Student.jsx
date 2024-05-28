import '../index.css'
import HeaderContent from '../contents/Header/HeaderContent';
import check from '../assets/Check.svg'
import fileIcon from "../assets/fileIcon.svg";
import {useState, useEffect} from 'react';
import { getUserInfo } from "../service/function";
import Info from '../contents/Student/InternshipInfo';
import DragDrop from '../contents/Student/DragDrop';

const StudentPage = (props) => {

    const [selectedButton, setSelectedButton] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [noteData, setNoteData] = useState(null); // [ {id: 1, note: 12}, {id: 2, note: 15}, {id: 3, note: 10} ]
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

    useEffect(() => {
        getUserInfo().then(data => {
        setUserInfo(data);
        setLoading(false);});
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
                        <div style={{ margin: '0 10px', gridColumn: '1/4', gridRow: '2/3', borderRadius: '20px', background: 'white', padding: '10px', display: 'grid',gridTemplateColumns: 'auto auto auto'}}>
                            <div style={{gridColumn:'1/2'}}>
                                <h1 style={{margin: '25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400' }}>Formulaire auto évaluation</h1>
                            </div>
                            <div style={{gridColumn:'3/4', display:'flex'}}>
                                <h1 style={{margin:'25px 47px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '35px', fontWeight: '400'}}>Limit date : 20/08/2024</h1>
                                <div style={{margin:'5px auto'}}>
                                    <img src={check} style={{ alignSelf: 'center', height: '40px',width: '40px'}} />
                                    <p style={{textAlign:'center', margin:'2px', color: 'black', fontFamily: 'CalibriRegular', fontSize: '25px', fontWeight: '400'}}>Do</p>
                                </div>
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