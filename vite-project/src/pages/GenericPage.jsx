import HeaderContent from "../contents/Header/HeaderContent";
import { useState, useEffect } from 'react';
import { getUserInfo } from "../service/function";
import { post } from "../service/service";
import StudentPage from "../contents/Student/StudentContent";
import Jury from "../contents/Jury/Jury";
import Tuteur from "../contents/Tuteur/Tuteur";
import Loading from "../contents/Loading";
import {role} from "../service/app-local";
import {ErrorAlert} from "../contents/CommunContent/Alert";

const GenericPage = (props) => {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [isJury, setIsJury] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserInfo().then((data) => {
            setUserInfo(data);
            console.log(data.profile );
            if (data.profile === 'ENS' || data.profile === 'PRO' || data.profile === 'TUT') {
                isJuryMember(data);
            }
            else{
                setLoading(false);
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
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
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    }

    const renderRoleContent = () => {
        switch (userInfo.profile) {
            case role[1]:
                return <StudentPage userInfo={userInfo} setObjectId={props.setObjectId} role={'ETU'}/>;
            case role[2]:
            case role[4]:
                return isJury.is_jury ? <Jury userInfo={userInfo}  isJury={isJury} role={'jury'} setObjectId={props.setObjectId}/> : <div></div>;
            case role[3]:
                return (
                    <>
                        <Tuteur userInfo={userInfo} setObjectId={props.setObjectId} role={'TUT'}/>
                        {isJury.is_jury ? (<Jury userInfo={userInfo}  isJury={isJury} role={'jury'} setObjectId={props.setObjectId}/>) :( <div></div>)}
                    </>
                    
                );
            default:
                return <div>Role not found</div>;
        }
    }

    if (loading) {
        return (
            <>
            {error === true ? <ErrorAlert message={messageError} />: null}
            <Loading />
            </>
        );
    }
    else{
    return (
        <div className='general-content' style={{ gridTemplateArea: `'header header header' 'body body body'` }}>
            <HeaderContent gridArea={'header'} handleLogOutClick={props.handleLogOutClick} data={userInfo} profileInfo={true}/>
            <div style={{ gridArea: 'body', gridTemplateRows: 'auto auto', height: '100%' }}>
                <div style={{ position: 'relative' }}>
                    <div className='p-2' style={{ height: 'fit-content', backgroundColor: '#003865' }}>
                        <h1 className="user-welcome-title"> Bonjour {userInfo?.first_name} {userInfo?.last_name}</h1>
                    </div>
                </div>
                {error === true ? <ErrorAlert message={messageError} />: null}
                {renderRoleContent()}
            </div>
        </div>
    );}
}

export default GenericPage;
