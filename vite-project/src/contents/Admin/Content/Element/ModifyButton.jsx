import { buttonStyle2 } from "../../../Styles";

const ModifyButton = (props) => {

    return (
            <button
                onClick={props.handleModify}
                style={buttonStyle2}
            >
                Modify
            </button>
    );
}

export default ModifyButton;