import React, { useState, useEffect } from 'react';
import ListView from './ListView';
import InfSup from './InfSup';
import moment from 'moment';
import { get, post } from '../../service/service';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française
import Loading from '../Loading';
import { WarningAlert, MessageAlert } from '../CommunContent/Alert';
import SoutenanceJuryList from './SoutenanceJuryList';

const JuryView = (props) => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [currentStartDate, setCurrentStartDate] = useState(moment().startOf('week'));
    const [soutenances, setSoutenances] = useState(null); // Génère pour une semaine
    const [infSup, setInfSup] = useState(false);
    const [infSupData, setInfSupData] = useState(null);
    const [isMutipleJury, setIsMutipleJury] = useState(false);
    const [selectJury, setSelectJury] = useState(0);
    const [isLeader, setIsLeader] = useState(false);
    // error handling
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

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
                setError(true);
                setMessageError(response.error);
            } else {
                setSoutenances(response);
            }
        });
    }

    const handleisLeader = () => {
        return post (`isLeader/`,{id_membreJury: props.userInfo.id,id_jury:props.isJury.jury[selectJury]}).then((response) => {
            if (response.error) {
                setError(true);
                setMessageError(response.error);
            } else {
                setIsLeader(response.leader);
            }
        });
    }

    const handleJuryChange = (event) => {
        let newSelectJury = selectJury + 1;
        if(newSelectJury >= props.isJury.jury.length){
            newSelectJury = 0;
        }
        setSelectJury(newSelectJury);
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
                setError(true);
                setMessageError(response.error);
            } else {
                setIsLeader(response.leader);
            }
        });
    }

    const renderTabContent = () => {
        if(infSup){
            return <InfSup infSupData={infSupData} setInfSup={setInfSup} role={props.role} setObjectId={props.setObjectId} setError={setError} setMessageError={setMessageError}/>;
        }
        switch (activeTab) {
            case 'calendar':
                return <SoutenanceJuryList soutenances={soutenances.soutenance} currentStartDate={currentStartDate} setCurrentStartDate={setCurrentStartDate} handleInfSup={handleInfSup}/>;
            case 'list':
                return <ListView soutenances={soutenances.soutenance} setError={setError} setMessageError={setMessageError}/>;
            default:
                return null;
        }
    };

    if(soutenances === null){
        return <Loading />;
    }
    return (
        <>
        {isLeader ?(<MessageAlert message='Vous êtes super jury'/>):(<WarningAlert message="Vous n'êtes pas super jury" message_link="devenir super jury" onClick={handleSuperJury}/>)}
        {error ? <ErrorAlert message={messageError} /> : null}
        <div style={{ margin: '20px' }}>
            {isMutipleJury && (
                <div className="jury-selector">
                    <label htmlFor="jury-select">Changer de jury:</label>
                    <button className="btn btn-secondary" onClick={handleJuryChange}>Changer</button>
                </div>
            )}
            <div className="accordion mb-3" id="accordionPanelsStayOpen">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Jury n° {soutenances.num_jury}
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordion">
                      <div className="accordion-body">
                        <h2 className='info-jury-h2'><span className="label">Salle:</span> <span className="value">{soutenances.salle}</span></h2>
                        <h2 className='info-jury-h2'><span className="label">Batiment:</span> <span className="value">{soutenances.batiment}</span></h2>
                        <h2 className='info-jury-h2'><span className="label">Campus:</span> <span className="value">{soutenances.campus}</span></h2>
                        <h2 className='info-jury-h2'><span className="label">Zoom:</span> <span className="value">{soutenances.zoom}</span></h2>
                      </div>
                    </div>
                </div>
            </div>
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => {setActiveTab('calendar'); setInfSup(false);}}>Mes Soutenances</button>
                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false" onClick={() => {setActiveTab('list'); setInfSup(false);}}>Rechercher</button>
              </div>
            </nav>
            {renderTabContent()}
        </div>
        </>
    );
};

export default JuryView;
