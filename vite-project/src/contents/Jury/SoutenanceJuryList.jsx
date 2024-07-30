import moment from 'moment';
import 'moment/locale/fr'; // Si vous souhaitez utiliser la localisation française
import Loading from '../Loading';

const SoutenanceJuryList = (props) => {

    if (props.soutenances == null) {
        return <Loading />;
    }

    const events = props.soutenances.map(soutenance => ({
        title: `${soutenance.stage.etudiant.first_name} ${soutenance.stage.etudiant.last_name}`,
        date: moment(soutenance.date_soutenance, "YYYY-MM-DD").toDate(),
        heure: soutenance.heure_soutenance,
        soutenance: soutenance,
    }));

    const renderTab = () => {
        return (
            <>
            <div class="list-group container-lg">
                {events.map((data, key) => (
                <a href="#" class="list-group-item list-group-item-action" onClick={() => props.handleInfSup(data.soutenance)}>
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{data.title}</h5>
                      <small class="text-body-secondary">{data.heure}</small>
                    </div>
                    <p class="mb-1">{moment(data.date).format('YYYY-MM-DD')} </p>
                </a>
                ))}
            </div>
            </>
            );
    }

    return (
        <div className="mes-infos-container">
            <h2 className="mes-infos-title">Mes Soutenances</h2>
            <div className="container my-3">
                {renderTab()}
            </div>
        </div>
    );
}

export default SoutenanceJuryList;
