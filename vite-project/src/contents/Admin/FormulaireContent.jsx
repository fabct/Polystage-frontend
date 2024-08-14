import RenderContent from "./Content/RenderContent";
import SearchContent from "../CommunContent/SearchContent";
import { useState, useEffect } from 'react';
import { get } from "../../service/service";
import {ErrorAlert} from "../CommunContent/Alert";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const FormulaireContent = (props) => {
    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [data, setData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        setError(false);
        setMessageError('');
        handleGetForm();
    }, []);

    const navigate = useNavigate();

    const getTypeKeys = (type) => {
        const typeObject = props.keys.find((item) => item.type === type);
        return typeObject ? typeObject.keys : [];
    };

    const handleIsAdding = () => {
        const newFormId = uuidv4();
        props.setObjectId(newFormId);
        props.setCreate(true);
        navigate(`/admin/form/${newFormId}`);
    };

    const handleModify = (dataToEdit) => {
        props.setCreate(false);
        props.setObjectId(dataToEdit.id);
        navigate(`/admin/form/${dataToEdit.id}`);
    };

    const handleGetForm = () => {
        return get(`formulaireList/`).then((data) => {
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
    };


    const renderContent = () => {
        const key = getTypeKeys("form");
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
                    inputsTitle = {[{ name: 'Nom du formulaire'},{ name: 'Description'}]}
                    isAdding={false}
                    isSearching={true}
                    data={data}
                    handleModify = {handleModify}
                    handleSearch = {handleGetForm}
                    function = {'formulaireDetails'}
                    type = {'form'}
                    keys = {key}
                />
                </div>
            </div>
        );
    }

    return(
        <div>
            {error === true ? <ErrorAlert message={messageError} />: null}
            <div style={{padding:'10px'}}>
                {renderContent()}
            </div>
        </div>
    );
}

export default FormulaireContent;