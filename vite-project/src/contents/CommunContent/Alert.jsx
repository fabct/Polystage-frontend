
const ErrorAlert = ({ message }) => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <div>
                {message}
            </div>
        </div>
    );
}

const WarningAlert = ({ message, message_link, handleChange}) => {
    return(
    <div class="alert alert-warning d-flex align-items-center mb-0" role="alert">
        <div>
          {message} <a href="#" onClick={handleChange} class="alert-link">{message_link}</a>
        </div>
    </div>
    );
}

const MessageAlert = ({ message }) => {
    return (
        <div class="alert alert-success d-flex align-items-center" role="alert">
            <div>
            {message}
            </div>
        </div>
    );
}

export {ErrorAlert, WarningAlert, MessageAlert};