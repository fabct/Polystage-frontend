import HeaderContent from "../contents/Admin/HeaderContent";
import NavBarAdmin from "../contents/Admin/NavBarAdmin";
import {useState} from 'react';
import SearchContent from "../contents/Admin/SerchContent";
import AllContent from "../contents/Admin/GetAllContent";
import Impxport from "../contents/Admin/ImportExportContent";

const AdminPage = (props) => {

    const [selectedButton, setSelectedButton] = useState(null);

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };

    const renderContent = () => {
        switch (selectedButton) {
            case 0:
                return <SearchContent
                        content={'user'}
                        />;
            case 1:
                return <AllContent 
                        content={'promo'}
                        />;
            case 2:
                return <SearchContent 
                        content={'internship'}
                        />;
            case 3:
                return <AllContent 
                        content={'form'}
                        />;
            case 4:
                return <Impxport 
                        selectedButton={0}
                        content={'Import'}
                        />;
            case 5:
                return <Impxport 
                        selectedButton={1}
                        content={'Download'}
                        />;
            default:
                return <h1 style={{margin: '300px 0 auto auto',textAlign:'center',color: '#000', fontFamily: 'CalibriRegular', fontSize: '48px', fontStyle: 'normal', fontWeight: '400', lineHeight: 'normal'}}>Welcome Back Dupond </h1>; // Aucun contenu à afficher par défaut
        }
    };

    return (
        <div style={{gridTemplateArea:`'header header header' 'body body body'`, background: '#E6E6E6',height:'100%'}}>
            <HeaderContent 
                gridArea={'header'}
                handleLogOutClick ={props.handleLogOutClick}
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

export default AdminPage;