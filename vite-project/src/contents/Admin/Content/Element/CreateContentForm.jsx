import InputSearch from "./InputSearch";
import { useState } from 'react';

const CreateContentForm = (props) => {

    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const inputsMap = {
        "ETU": props.inputs2,
        "new": props.inputs2,
        // Ajoutez plus de clés ici pour plus de combinaisons de type et de valeur
    };
    
    const inputs = inputsMap[selectedOption] || [];

    return(
        <div style={{margin: '10px 10px', backgroundColor:'white', border: '3px solid rgb(11, 96, 131)', borderRadius: '10px', boxShadow: '0px 4px 4px #00000040', padding: '10px', display: 'flex'}}>
            <form>
                {
                    props.inputs1.map((input, index) => (
                        <div key={index} style={props.cellAddStyle}> {input.infoCell}
                            <InputSearch 
                                onChange = {input.handleInpuChangeCell}
                                marginLeft={'15px'}
                                type={input.type}
                            />
                        </div>
                    ))
                }
                {props.selector ? (
                    <div style={props.cellAddStyle}> {props.infoCellSelect}
                        <select style={{ marginLeft: '10px' }} onChange={(event) => {props.handleChangeSelect(event);handleOptionChange(event);}}>
                        {props.options.map((option, index) => (
                            <option value={option.value} key={index}>{option.text}</option>
                        ))}
                        </select>
                    </div>
                ):(
                    <></>
                )}
                {inputs.map((input, index) => (
                    <div key={index} style={props.cellAddStyle}> {input.infoCell}
                        <InputSearch 
                            onChange = {input.handleInpuChangeCell}
                            marginLeft={'15px'}
                            type={input.type}
                        />
                    </div>
                ))}
            </form>
            <div style={{alignContent:'end'}}>
                <button style={{margin:'0px 10px'}} onClick={props.handleCancel}>Annuler</button>
                <button onClick={props.handleCreate}>Créer</button>
            </div>
        </div>
    );
}

export default CreateContentForm;