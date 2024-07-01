import moment from 'moment';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française

const InfSup = (props) => {

    const handleClose = () => {
        props.setInfSup(false);
    };

    return (
        <div className="infSup-container">
            <div className="infSup-header">
                <h2 className="infSup-title">Soutenance de {props.infSupData.etudiant.first_name} {props.infSupData.etudiant.last_name}</h2>
                <button onClick={handleClose} className="infSup-closeButton">X</button>
            </div>
            <div className="infSup-content">
                <p><strong>Date: </strong>{moment(props.infSupData.date_soutenance, "DD-MM-YYYY").format('LL')} {props.infSupData.heure_soutenance}</p>
                <p><strong>Durée: </strong>1 heure</p>
                <p><strong>Description:</strong>...</p>
                <p><strong>Lieu:</strong>...</p>
            </div>
        </div>
    );
};

export default InfSup;