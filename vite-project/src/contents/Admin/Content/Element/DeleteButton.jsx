import { useState } from 'react';
import { delet } from '../../../../service/service';

const DeleteButton = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const data = await delet(`${props.function}/${props.id}/`);
            if(data){
                console.log('Promo deleted successfully');
                setLoading(false);
                props.refresh();
            }
        } catch (error) {
            console.error('Error deleting promo');
            setLoading(false);
        }
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