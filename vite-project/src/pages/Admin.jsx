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
                <div style={{gridArea:'body', gridTemplateRows:'auto auto',height:'100%'}}>
                    <div style={{ position: 'relative' }}>
                        {/* Div 1 */}
                        <div style={{ height: '50px', backgroundColor: '#003865' }}>
                            <div style={{ position: 'absolute',margin:'10px 0' ,top: '0', left: '0', width: '100%' }}>
                                <NavBarAdmin 
                                    onClick = {handleButtonClick}
                                    selectedButton = {selectedButton}
                                />
                            </div>
                        </div>
          
                        {/* Div 2 */}
                        <div style={{padding:'20px auto' ,background: '#E6E6E6', height: '100%', position: 'relative' }}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminPage;