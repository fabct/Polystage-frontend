import HeaderContent from "../contents/Header/HeaderContent";
import NavBarAdmin from "../contents/Admin/Content/NavBarAdmin";
import {useState} from 'react';
import {useEffect} from 'react';
import SearchContent from "../contents/Admin/SerchContent";
import AllContent from "../contents/Admin/GetAllContent";
import Impxport from "../contents/Admin/ImportExportContent";
import Cookies from 'js-cookie';
import { get } from "../service/service";
import Content from "../contents/Admin/Content";

const AdminPage = (props) => {

    const [selectedButton, setSelectedButton] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then(data => {
        setUserInfo(data);
        setLoading(false);});
    }, []);

    const getUserInfo = () => {
        const userCookie = Cookies.get('userCookie');
        if (userCookie) {
            const user = JSON.parse(userCookie);
            const user_id = user.user_id;
            return get(`userDetails/${user_id}`).then(data => {
                console.log(data);
                return data;
            }).catch((error) => {
                console.error('Erreur de connexion:', error);
                return null;
            });
        } else {
            return Promise.resolve(null);
        }
    }

    const buttonConfig = [
        { type: 'user', action: 'search' },
        { type: 'promo', action: 'all' },
        { type: 'internship', action: 'search' },
        { type: 'form', action: 'all' },
        { type: 'import', action: 'import' },
        { type: 'download', action: 'download' },
    ];

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };


    const renderContent = () => {
        if (selectedButton === null) {
            return <h1 style={{margin: '300px 0 auto auto',textAlign:'center',color: '#000', fontFamily: 'CalibriRegular', fontSize: '48px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Welcome Back {userInfo.first_name} </h1>;
        }
    
        const { type, action } = buttonConfig[selectedButton];
        return <Content type={type} action={action} />;
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