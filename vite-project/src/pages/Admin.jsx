import HeaderContent from "../contents/Header/HeaderContent";
import NavBarAdmin from "../contents/Admin/Content/NavBarAdmin";
import {useState} from 'react';
import {useEffect} from 'react';
import Content from "../contents/Admin/Content";
import { getUserInfo } from "../service/function";
import SessionDetails from "../contents/Admin/SessionDetails";
import ModifyData from "../contents/Admin/Content/ModifyData";
import CreateContentForm from "../contents/Admin/Content/Element/CreateContentForm";
import { useNavigate } from 'react-router-dom';

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
        return <div>Loading...</div>; // replace with your actual loading component or message
    }
    else{
        return (
            <div className='general-content' style={{gridTemplateArea:`'header header header' 'body body body'`, height:'100%'}}>
                <HeaderContent 
                    gridArea={'header'}
                    handleLogOutClick ={props.handleLogOutClick}
                    data={userInfo}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', height: '100%' }}>
                    {/* Div 1 - NavBar */}
                    <div style={{ gridRow: '1 / span 2', gridColumn: '1', backgroundColor: '#003865',height:'100%'}}>
                        <NavBarAdmin 
                            onClick = {handleButtonClick}
                            selectedButton = {selectedButton}
                        />
                    </div>

                    {/* Div 2 - Content */}
                    <div style={{ gridRow: '1', gridColumn: '2 / span 2', background: '#E6E6E6' }}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;