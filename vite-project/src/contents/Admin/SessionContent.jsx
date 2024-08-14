import { useEffect , useState} from "react";
import { get } from "../../service/service";
import {ErrorAlert} from "../CommunContent/Alert";
import CreateContentForm from "./Content/Element/CreateContentForm";
import RenderContent from "./Content/RenderContent";
import SearchContent from "../CommunContent/SearchContent";
import SessionDetails from "./SessionDetails";

const SessionContent = (props) => {

    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [nom , setNom] = useState('');
    const [etudiant, setEtudiant] = useState([]);
    const [jury, setJury] = useState([]);

    useEffect(() => {
        handleGetSession();
    }, []);

    const handleNomChange = (e) => {
        setNom(e.target.value);
    };

    const handleNewEtudiantChange = (e) => {
        console.log(e.target.value);
        setEtudiant(e.target.value);
    };

    const handleNewJuryChange = (e) => {
        setJury(e.target.value);
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

    const handleGetSession = () => {
        setData([]);
        return get(`sessionList/`).then((data) => {
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

    const handleCreateSession = () => {
    }

    const renderContent = () => {
        const key = getTypeKeys("session");
        if (editing) {
            return <SessionDetails setError={setError} setMessageError={setMessageError} editingId={editingId} setEditing={setEditing}/>;
        } 
        if(isAdding){
            return <CreateContentForm 
                inputs = {[
                    { infoCell: 'Nom', handleInpuChangeCell: handleNomChange, type: 'text', value: nom },
                    { infoCell: 'Etudiant', handleEtudiant: handleNewEtudiantChange, type: 'object', value: etudiant },
                    { infoCell: 'Jury', handleJury: handleNewJuryChange, type: 'object', value: jury }
                ]}
                handleCreate={handleCreateSession}
                handleCancel={handleCancel}
                type={"session"}
                cellAddStyle={cellAddStyle}
                isAddingTitle={'Nouvelle Session'}
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
                    inputsTitle = {[{ name: 'Id'},{ name: 'Nom de la séssion'}]}
                    isSearching={true}
                    data={data}        
                    isAdding = {false}
                    handleCancel = {handleCancel}
                    handleModify = {handleModify}
                    handleSearch = {handleGetSession}
                    function = {'promoDetails'}
                    type = {"session"}
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
}

export default SessionContent;