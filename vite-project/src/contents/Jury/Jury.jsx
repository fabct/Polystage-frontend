import React, { useState, useEffect } from 'react';
import CalendarView from './CalendarView';
import ListView from './ListView';
import InfSup from './InfSup';
import moment from 'moment';
import { get, post } from '../../service/service';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française
import Loading from '../Loading';

const JuryView = (props) => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [currentStartDate, setCurrentStartDate] = useState(moment().startOf('week'));
    const [soutenances, setSoutenances] = useState(null); // Génère pour une semaine
    const [infSup, setInfSup] = useState(false);
    const [infSupData, setInfSupData] = useState(null);
    const [isMutipleJury, setIsMutipleJury] = useState(false);
    const [selectJury, setSelectJury] = useState(0);
    const [isLeader, setIsLeader] = useState(false);

    useEffect(() => {
        soutenanceJury();
        handleisLeader();
    }, []);

    const soutenanceJury = () => {
        if(props.isJury.jury.length > 1){
            setIsMutipleJury(true);
        }
        return get(`juryAll/${props.isJury.jury[selectJury]}`).then((response) => {
            if (response.error) {
                console.error(response.error);
            } else {
                console.log(response);
                setSoutenances(response);
            }
        });
    }

    const handleisLeader = () => {
        return post (`isLeader/`,{id_membreJury: props.userInfo.id,id_jury:props.isJury.jury[selectJury]}).then((response) => {
            if (response.error) {
                console.error(response.error);
            } else {
                console.log(response);
                setIsLeader(response.leader);
            }
        });
    }

    const handleJuryChange = (event) => {
        setSelectJury(selectJury + 1);
        if(selectJury === props.isJury.jury.length - 1){
            setSelectJury(0);
        }
        setInfSup(false);
        setIsLeader(false);
        soutenanceJury();
        handleisLeader();
    }

    const handleInfSup = (event) => {
        setInfSup(true);
        setInfSupData(event);
    }

    const handleSuperJury = () => {
        return post (`becomeLeader/`,{id_user: props.userInfo.id,id_jury:props.isJury.jury[selectJury]}).then((response) => {
            if (response.error) {
                console.error(response.error);
            } else {
                console.log(response);
                setIsLeader(response.leader);
            }
        });
    }

    const renderTabContent = () => {
        if(infSup){
            return <InfSup infSupData={infSupData} setInfSup={setInfSup} role={props.role} setObjectId={props.setObjectId}/>;
        }
        switch (activeTab) {
            case 'calendar':
                return <CalendarView soutenances={soutenances.soutenance} currentStartDate={currentStartDate} setCurrentStartDate={setCurrentStartDate} handleInfSup={handleInfSup}/>;
            case 'list':
                return <ListView soutenances={soutenances.soutenance} />;
            default:
                return null;
        }
    };

    if(soutenances === null){
        return <Loading />;
    }
    return (
        <div style={{ margin: '20px' }}>
            <div className="tabs">
                {isLeader ?(<h1 className="title">Vous êtes super jury</h1>):(<h1 className="title">Vous n'êtes pas super jury</h1>)}
                <div className="tab-buttons">
                    <button className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>Calendrier</button>
                    <button className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>Liste</button>
                    {isLeader ?(<></>):(<button className={`super-jury tab `} onClick={handleSuperJury}>Devenir super jury</button>)}
                </div>
            </div>
            {isMutipleJury && (
                <div className="jury-selector">
                    <label htmlFor="jury-select">Changer de jury:</label>
                    <button className="btn" onClick={handleJuryChange}>Changer</button>
                </div>
            )}
            <div className="info-jury">
                <h1>Jury n° {soutenances.num_jury}</h1>
                <h2><span className="label">Salle:</span> <span className="value">{soutenances.salle}</span></h2>
                <h2><span className="label">Batiment:</span> <span className="value">{soutenances.batiment}</span></h2>
                <h2><span className="label">Campus:</span> <span className="value">{soutenances.campus}</span></h2>
                <h2><span className="label">Zoom:</span> <span className="value">{soutenances.zoom}</span></h2>
            </div>
            {renderTabContent()}
        </div>
    );
};

export default JuryView;
