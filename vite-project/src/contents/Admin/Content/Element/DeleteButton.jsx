import { useState } from 'react';
import { delet } from '../../../../service/service';

const DeleteButton = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        const data = delet(`${props.function}/${props.id}/`).then((data) => {
            if(data.error){
                setError(data.error);
            }
            else{
                console.log(data);
                props.refresh();
            }
        });
    };

    return (
            <button
                onClick={handleDelete}
                disabled={loading}
            >
                Delete
            </button>
    );
}

export default DeleteButton;