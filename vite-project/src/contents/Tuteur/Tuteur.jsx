import React, { useState, useEffect } from 'react';
import { get } from '../../service/service';

const Tuteur = (props) => {
    const [data, setData] = useState(null);
    const [existingInternship, setExistingInternship] = useState(false);

    useEffect(() => {
        handleGetInternship();
    }, []);

    const handleGetInternship = () => {
        return get('getStageTuteur/').then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                setExistingInternship(true);
                setData(data);
            }
        });
    };

    const handleGetForm = () => {
        return get(`formUser/${stageData.id}/`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                setFormData(data);
            }
        })
    }

    return (
        <div>
            <h1>Tuteur</h1>
        </div>
    );
}

export default Tuteur;