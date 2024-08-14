import { useEffect , useState} from "react";
import { get } from "../../service/service";
import {ErrorAlert} from "../CommunContent/Alert";
import CreateContentForm from "./Content/Element/CreateContentForm";
import RenderContent from "./Content/RenderContent";
import SearchContent from "../CommunContent/SearchContent";
import ModifyData from "./Content/ModifyData";

const JuryContent = (props) => {

    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const [jury, setJury] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [salle, setSalle] = useState('');
    const [batiment, setBatiment] = useState('');
    const [campus, setCampus] = useState('');
    const [zoom, setZoom] = useState('');
    const [numJury, setNumJury] = useState('');
    const [session, setSession] = useState('');
    const [leader, setLeader] = useState('');

    useEffect(() => {
        setError(false);
        setMessageError('');
        handleSearchJury();
    }, []);



    const handleMemberJuryChange = (e) => {
        setJury(e.target.value);
    };

    const handleisActive = (e) => {
        setIsActive(e.target.checked);
    };

    const handleSalleChange = (e) => {
        setSalle(e.target.value);
    };

    const handleBatimentChange = (e) => {
        setBatiment(e.target.value);
    };

    const handleCampusChange = (e) => {
        setCampus(e.target.value);
    };

    const handleZoomChange = (e) => {
        setZoom(e.target.value);
    };

    const handleNumJuryChange = (e) => {
        setNumJury(e.target.value);
    };

    const handleSessionChange = (e) => {
        setSession(e.target.value);
    };

    const handleLeaderChange = (e) => {
        setLeader(e.target.value);
    };

    const getTypeKeys = (type) => {
        const typeObject = props.keys.find((item) => item.type === type);
        return typeObject ? typeObject.keys : [];
    };

    const cellAddStyle = {margin:'10px', fontFamily: 'CalibriRegular', fontStyle: 'normal', flex: 1}; // Add flex: 1 and width: auto

    const handleIsAdding = () => {
        setError(false);
        setMessageError('');
        setIsAdding(true);
    };

    const handleCancel = () => {
        if (window.confirm("Êtes vous sur de vouloir Annuler?")) {
            setEditingId(null);
            setIsAdding(false);
            setError(false);
            setMessageError('');
            renderContent();
        }
    };

    const handleModify = (dataToEdit) => {
        setEditingId(dataToEdit.id);
        setEditing(true);
    };

    const handleSearchJury = () => {
        return get('juryList/').then((data) => {
            if(data.error){
                setError(true);
                setMessageError(error.message);
            }
            else{
                console.log(data);
                setData(data);
            }
        }).catch((error) => {
            setError(true);
            setMessageError(error.message);
        });
    }

    const handleCreateJury = () => {
    }

    const renderContent = () => {
        const key = getTypeKeys("jury");
        if (editing) {
            return <ModifyData type='jury' setError={setError} setMessageError={setMessageError} editingId={editingId} setEditing={setEditing} />;
        } 
        if(isAdding){
            return <CreateContentForm 
                inputs = {[
                    { infoCell: 'Membre Jury', handleMemberJuryChange: handleMemberJuryChange, type: 'object', value: jury },
                    { infoCell: 'Est actif', handleisActive: handleisActive, type: 'boolean', value: isActive },
                    { infoCell: 'Salle', handleInpuChangeCell:handleSalleChange, type: 'text', value: salle },
                    { infoCell: 'Bâtiment', handleInpuChangeCell: handleBatimentChange, type: 'text', value: batiment },
                    { infoCell: 'Campus', handleInpuChangeCell: handleCampusChange, type: 'text', value: campus },
                    { infoCell: 'Zoom', handleInpuChangeCell: handleZoomChange, type: 'text', value: zoom },
                    { infoCell: 'Numéro de Jury', handleInpuChangeCell: handleNumJuryChange, type: 'text', value: numJury },
                    { infoCell: 'Numéro de Session (id de la séssion)', handleInpuChangeCell: handleSessionChange, type: 'text', value: session },
                    { infoCell: 'Leader (id du leader du jury)', handleInpuChangeCell: handleLeaderChange, type: 'text', value: leader },
                ]}
                handleCreate={handleCreateJury}
                handleCancel={handleCancel}
                type={"jury"}
                cellAddStyle={cellAddStyle}
                isAddingTitle={'Nouveaux Jury'}
            />;
        }

        return(
            <div style={{gridTemplateAreas:`'button button button' 'result result result'`}}>
                <div className='mx-2 my-3 clearfix' style={{gridArea:'button'}}>
                    <div className='float-start'>
                        <SearchContent 
                            isSearching = {false}
                        />
                    </div>
                    <div className='float-end my-auto'>
                        <button type="button" className='btn btn-primary' onClick={handleIsAdding}>Créer</button>
                    </div>
                </div>
                <div className='mx-2 my-3' style={{gridArea:'result',borderRadius:'5px'}}>
                <RenderContent 
                    researchTitle={'Résultat de la recherche'}
                    inputsTitle = {[{ name: 'Id'},{ name: 'Numéro de jury'}, { name: 'Campus'}, { name: 'Batiment'}, { name: 'Salle'}]}
                    isAdding={isAdding}
                    isSearching={true}

                    data={data}
                    handleModify = {handleModify}
                    handleSearch = {handleSearchJury}
                    function = {'juryDetails'}
                    type = {'jury'}
                    keys = {key}
                />
                </div>
            </div>
        );
    }

    return (
        <div>
            {error === true ? <ErrorAlert message={messageError} />: null}
            <div style={{padding:'10px'}}>
                {renderContent()}
            </div>
        </div>
    );
};

export default JuryContent;