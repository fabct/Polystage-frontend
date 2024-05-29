import { useState } from 'react';
import { delet } from '../../../../service/service';
import { buttonDeleteStyle } from '../../../Styles';

const DeleteButton = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        if (window.confirm("Are you sure you want to delete this item?")) {
            const data = delet(`${props.function}/${props.id}/`).then((data) => {
                if(data.error){
                    setError(data.error);
                }
                else{
                    console.log(data);
                    props.refresh();
                }
            });
        }
        setLoading(false);
    };

    return (
            <button
                onClick={handleDelete}
                disabled={loading}
                style={buttonDeleteStyle}
            >
                Delete
            </button>
    );
}

export default DeleteButton;