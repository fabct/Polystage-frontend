import React, { useState, useEffect } from 'react';
import CalendarView from './CalendarView';
import ListView from './ListView';
import moment from 'moment';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française


const generateFakeSoutenances = (startDate, numDays) => {
    const new_soutenances = [];
    const startDateTime = moment(startDate).startOf('day');
    for (let i = 0; i < numDays; i++) {
        const day = moment(startDateTime).add(i, 'days');
        for (let j = 0; j < 5; j++) {
            const startTime = moment(day).add(8 + j, 'hours'); // Heure de début aléatoire entre 8h et 12h
            const soutenance = {
                title: `Soutenance ${i * 5 + j + 1}`,
                startDate: startTime.toDate(),
                endDate: moment(startTime).add(1, 'hours').toDate(), // Durée de 1 heure
            };
            new_soutenances.push(soutenance);
        }
    }
    return new_soutenances;
};

const JuryView = (props) => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [currentStartDate, setCurrentStartDate] = useState(moment().startOf('week'));
    const [soutenances, setSoutenances] = useState(generateFakeSoutenances(currentStartDate, 8)); // Génère pour une semaine
    const [infSup, setInfSup] = useState(false);
    const [infSupData, setInfSupData] = useState(null);

    useEffect(() => {
        const fetchSoutenances = async () => {
            const response = await fetch('/api/soutenances');
            const data = await response.json();
            setSoutenances(data);
        };
        fetchSoutenances();
    }, []);

    const handleInfSup = (event) => {
        setInfSup(true);
        setInfSupData(event);
    }

    const renderTabContent = () => {
        if(infSup){
            <InfSup infSupData={infSupData} setInfSup={setInfSup} />
        }
        switch (activeTab) {
            case 'calendar':
                return <CalendarView soutenances={soutenances} currentStartDate={currentStartDate} setCurrentStartDate={setCurrentStartDate} handleInfSup={handleInfSup}/>;
            case 'list':
                return <ListView soutenances={soutenances} />;
            default:
                return null;
        }
    };

    return (
        <div style={{ margin: '20px' }}>
             <div className="tabs">
                <h1 className="title">Vous n'êtes pas super jury</h1>
                <div className="tab-buttons">
                    <button className={`tab ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>Calendrier</button>
                    <button className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>Liste</button>
                    <button className={`tab super-jury ${activeTab === 'super-jury' ? 'active' : ''}`} onClick={() => setActiveTab('super-jury')}>Devenir super jury</button>
                </div>
            </div>
            {renderTabContent()}
        </div>
    );
};

export default JuryView;
