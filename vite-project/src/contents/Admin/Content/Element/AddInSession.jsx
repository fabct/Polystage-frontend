const AddInSession = (props) => {
    return (
        <div className="add-container">
            <h1>{props.title}</h1>
            <div>
                <select value={props.selected} onChange={props.handleSelectChange}>
                    <option value="">Sélectionner</option>
                    {props.availableData.map((item, index) => (
                        <option key={index} value={item.id || item.num_jury}>
                            {item.first_name ? `${item.first_name} ${item.last_name} (${item.email})` : `Jury ${item.num_jury}`}
                        </option>
                    ))}
                </select>
            </div>
            <div className="button-group">
                <button className="add-button" onClick={props.handleStudentAddClick}>Ajouter</button>
                <button className="remove-button" onClick={props.handleCancelClick}>Annuler</button>
            </div>
        </div>
    );
};

export default AddInSession;
