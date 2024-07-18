import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { get } from '../../service/service';
import FormList from '../CommunContent/FormList';
import Loading from '../Loading';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française

const InfSup = (props) => {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        form();
    }, []);

    const handleClose = () => {
        props.setInfSup(false);
    };

    const form = () => {
        return get(`formUser/${props.infSupData.stage.id}/`).then((data) => {
            if (data.error) {
                console.error(data.error);
            } else {
                console.log(data);
                setFormData(data);
            }
        });
    };

    if (formData === null) {
        return <Loading />;
    }

    return (
        <div className="infSup-container">
            <div className="infSup-header">
                <h2 className="infSup-title">Soutenance de {props.infSupData.stage.etudiant.first_name} {props.infSupData.stage.etudiant.last_name}</h2>
                <button onClick={handleClose} className="infSup-closeButton">X</button>
            </div>
            <div className="infSup-content">
                <div className="infSup-content-inf">
                    <p><strong>Date de Soutenance: </strong>{moment(props.infSupData.date_soutenance).format('LL')}</p>
                    <p><strong>Heure de Soutenance: </strong>{props.infSupData.heure_soutenance}</p>
                    <p><strong>Soutenu: </strong>{props.infSupData.soutenu ? 'Oui' : 'Non'}</p>
                    <h3>Stage</h3>
                    <p><strong>Sujet: </strong>{props.infSupData.stage.sujet}</p>
                    <p><strong>Entreprise: </strong>{props.infSupData.stage.nom_entreprise}</p>
                    <p><strong>Confidentiel: </strong>{props.infSupData.stage.confidentiel ? 'Oui' : 'Non'}</p>
                    <p><strong>Date de Début: </strong>{moment(props.infSupData.stage.date_debut).format('LL')}</p>
                    <p><strong>Date de Fin: </strong>{moment(props.infSupData.stage.date_fin).format('LL')}</p>
                    <p><strong>Numéro de Convention: </strong>{props.infSupData.stage.num_convention}</p>
                    <h3>Étudiant</h3>
                    <p><strong>Numéro Étudiant: </strong>{props.infSupData.stage.etudiant.num_etudiant}</p>
                    <p><strong>Email: </strong>{props.infSupData.stage.etudiant.email}</p>
                </div>
                <div className='infSup-content-form'>
                    <FormList forms={formData} role={props.role} setObjectId={props.setObjectId}/>
                </div>
            </div>
        </div>
    );
};

export default InfSup;