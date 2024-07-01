import HeaderContent from "../contents/Header/HeaderContent";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from "../service/function";
import { post } from "../service/service";
import StudentPage from "../contents/Student/StudentContent";
import Jury from "../contents/Jury/Jury";

const GenericPage = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isJury, setIsJury] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then((data) => {
            setUserInfo(data);
            console.log(data.profile );
            if (data.profile === 'ENS' || data.profile === 'PRO') {
                isJuryMember(data);
            }
            else{
                setLoading(false);
            }
        });
    }, []);

    const isJuryMember = async (data) => {
        return post('isJury/', { id_user: data.id }).then((response) => {
        if (response.error) {
            console.error(response.error);
        } else {
            console.log(response);
            setIsJury(response);
            setLoading(false);
        }
        });
    }

    const renderRoleContent = () => {
        switch (userInfo.profile) {
            case 'ETU':
                return <StudentPage userInfo={userInfo} setNewFormId={props.setNewFormId} />;
            case 'ENS':
                return isJury.is_jury ? <Jury userInfo={userInfo}  isJury={isJury}/> : <div>Teacher</div>;
            case 'PRO':
                return <div>Professional</div>;
            default:
                return <div>Role not found</div>;
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    else{
    return (
        <div className='general-content' style={{ gridTemplateArea: `'header header header' 'body body body'` }}>
            <HeaderContent gridArea={'header'} handleLogOutClick={props.handleLogOutClick} data={userInfo} />
            <div style={{ gridArea: 'body', gridTemplateRows: 'auto auto', height: '100%' }}>
                <div style={{ position: 'relative' }}>
                    <div style={{ height: 'fit-content', backgroundColor: '#003865' }}>
                        <h1 className="user-welcome-title"> Welcome Back {userInfo?.first_name} {userInfo?.last_name}</h1>
                    </div>
                </div>
                {renderRoleContent()}
            </div>
        </div>
    );}
}

export default GenericPage;
