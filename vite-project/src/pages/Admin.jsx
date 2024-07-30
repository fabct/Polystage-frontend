import HeaderContent from "../contents/Header/HeaderContent";
import NavBarAdmin from "../contents/Admin/Content/NavBarAdmin";
import {useState} from 'react';
import {useEffect} from 'react';
import Content from "../contents/Admin/Content";
import { getUserInfo } from "../service/function";
import SessionDetails from "../contents/Admin/SessionDetails";
import ModifyData from "../contents/Admin/Content/ModifyData";
import icon from '../assets/icon.svg';
import { useNavigate } from 'react-router-dom';
import Loading from "../contents/Loading";

const AdminPage = (props) => {

    const [selectedButton, setSelectedButton] = useState(null);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then(data => {
        setUserInfo(data);
        setLoading(false);}).catch(error => {
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

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
        setEditing(false);
    };

    const handleModify = (dataToEdit) => {        
        if(buttonConfig[selectedButton].type === 'form'){
            props.setCreate(false);
            props.setObjectId(dataToEdit.id);
            navigate(`/admin/form/${dataToEdit.id}`);
        }
        else{    
            setEditing(true);
            setEditingId(dataToEdit.id);
        }
    };


    const renderContent = () => {
        if (selectedButton === null) {
            return <h1 className="bonjour">Bonjour {userInfo.first_name} {userInfo.last_name}</h1>;
        }
        const { type } = buttonConfig[selectedButton];
        if(editing && type === 'session'){
            return <SessionDetails editingId={editingId} setEditing={setEditing}/>;
        }
        if(editing){
            return <ModifyData editingId={editingId} setEditing={setEditing} type={type}/>;
        }
        return <Content type={type} setObjectId={props.setObjectId} handleModify={handleModify} setCreate={props.setCreate}/>;
    };

    if (loading) {
        return <Loading /> // replace with your actual loading component or message
    }
    else{
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
                                onClick = {handleButtonClick}
                                selectedButton = {selectedButton}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="col  px-0">
                        <HeaderContent 
                        gridArea={'header'}
                        handleLogOutClick ={props.handleLogOutClick}
                        profileInfo={false}
                        />
                        <div className="col-12" style={{background: '#E6E6E6' }}>
                         {renderContent()}
                        </div>
                    </div>
                    
                </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;