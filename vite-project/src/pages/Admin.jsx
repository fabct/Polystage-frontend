import HeaderContent from "../contents/Header/HeaderContent";
import NavBarAdmin from "../contents/Admin/Content/NavBarAdmin";
import { useState, useEffect } from 'react';
import { getUserInfo } from "../service/function";
import Loading from "../contents/Loading";
import UserContent from "../contents/Admin/UserContent";
import SessionContent from "../contents/Admin/SessionContent";
import JuryContent from "../contents/Admin/JuryContent";
import SoutenanceContent from "../contents/Admin/SoutenanceContent";
import FormulaireContent from "../contents/Admin/FormulaireContent";
import { useNavigate, Route, Routes, useParams } from 'react-router-dom';
import icon from '../assets/icon.svg';
import StageContent from "../contents/Admin/StageContent";
import Content from "../contents/Admin/Content";

const AdminPage = (props) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then(data => {
            setUserInfo(data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            handleLogOutClick();
        });
    }, []);

    const navigate = useNavigate();

    const buttonConfig = [
        { type: 'user'},
        { type: 'session'},
        { type: 'jury'},
        { type: 'internship'},
        { type: 'soutenance'},
        { type: 'form'},
        { type: 'email'},
        { type: 'import'},
        { type: 'export'},
    ];

    const keys = [
        {type : 'user', keys: ['id','first_name', 'last_name', 'email', 'profile']},
        {type : 'session', keys: ['id','nom']},
        {type : 'jury', keys: ['id','num_jury','campus','batiment','salle']},
        {type : 'internship', keys: ['id','nom_entreprise','sujet','confidentiel','date_debut','date_fin']},
        {type : 'form', keys: ['titre','description']}
    ];

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
        navigate(`/admin/${buttonConfig[buttonIndex].type}`);
    };

    const handleModify = (dataToEdit) => {        
        if (buttonConfig[selectedButton].type === 'form') {
            props.setCreate(false);
            props.setObjectId(dataToEdit.id);
            navigate(`/admin/form/${dataToEdit.id}`);
        } else {    
            setEditing(true);
            setEditingId(dataToEdit.id);
        }
    };

    const RenderContent = () => {
        const { type } = useParams();
        switch (type) {
            case 'user':
                return <UserContent keys={keys}/>;
            case 'session':
                return <SessionContent keys={keys}/>;
            case 'jury':
                return <JuryContent keys={keys}/>;
            case 'internship':
                return <StageContent keys={keys}/>;
            case 'soutenance':
            case 'email':
                return <SoutenanceContent keys={keys}/>;
            case 'form':
                return <FormulaireContent keys={keys} setObjectId={props.setObjectId} setCreate={props.setCreate}/>;
            default:
                return <Content type={type} keys={keys}/>;
        }
    };

    if (loading) {
        return <Loading />; // replace with your actual loading component or message
    } else {
        return (
            <div className='general-content' style={{height:'100%'}}>
                <div className="container-fluid" style={{height: '100%', width:'100%', position:'absolute'}}>
                    <div className="row h-100">
                        <div className="col-auto px-0 d-flex flex-column align-items-left" style={{backgroundColor: '#003865', width:'fit-content'}}>
                            <div>
                                <div className="user-info-admin mx-3">
                                    <div className="mb-2">
                                        <img src={icon} alt="user" style={{width:'35px'}}/>
                                    </div>
                                    {userInfo.first_name} {userInfo.last_name}
                                </div>
                                <div>
                                    <NavBarAdmin 
                                        onClick={handleButtonClick}
                                        selectedButton={selectedButton}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col px-0">
                            <HeaderContent 
                                gridArea={'header'}
                                handleLogOutClick={props.handleLogOutClick}
                                profileInfo={false}
                            />
                            <div className="col-12" style={{background: '#E6E6E6' }}>
                                <Routes>
                                    <Route path=":type" element={<RenderContent />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default AdminPage;
