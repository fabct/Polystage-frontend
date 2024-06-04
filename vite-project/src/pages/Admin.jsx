import HeaderContent from "../contents/Header/HeaderContent";
import NavBarAdmin from "../contents/Admin/Content/NavBarAdmin";
import {useState} from 'react';
import {useEffect} from 'react';
import Content from "../contents/Admin/Content";
import { getUserInfo } from "../service/function";

const AdminPage = (props) => {

    const [selectedButton, setSelectedButton] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then(data => {
        setUserInfo(data);
        setLoading(false);});
    }, []);

    const buttonConfig = [
        { type: 'user'},
        { type: 'promo'},
        { type: 'internship'},
        { type: 'form'},
        { type: 'import'},
        { type: 'download'},
    ];

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };


    const renderContent = () => {
        if (selectedButton === null) {
            return <h1 style={{margin: '300px 0 auto auto',textAlign:'center',color: '#000', fontFamily: 'CalibriRegular', fontSize: '48px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Welcome Back {userInfo.first_name} </h1>;
        }
    
        const { type } = buttonConfig[selectedButton];
        return <Content type={type} setNewFormId={props.setNewFormId}/>;
    };

    if (loading) {
        return <div>Loading...</div>; // replace with your actual loading component or message
    }
    else{
        return (
            <div style={{gridTemplateArea:`'header header header' 'body body body'`, background: '#E6E6E6',height:'100%'}}>
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