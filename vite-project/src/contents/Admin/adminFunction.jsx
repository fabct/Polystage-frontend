import {get, post, delet, put} from '../../service/service'
import Cookies from 'js-cookie';

const AdminFunction = {

    /*
        Promos
    */


    handleCreatePromo : (props) => {
        return post(`promoList/`, {filiere: props.filiere, annee: props.annee})
        .then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                return data// This line needs to be corrected
            }
        })
    },

    handleGetFiliere : () => {
        return get(`filiereList/`).then((data) => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                return data// This line needs to be corrected
            }
        })
    },

    handleCreateFiliere : (props) => {
        return post(`filiereList/`, {nom: props.filiere,nom_directeur: props.nom_directeur, prenom_directeur: props.prenom_directeur})
        .then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                return data// This line needs to be corrected
            }
        }).catch((error) => {
            console.error(error);
        });
    },

    handleUpdatePromo : (props) => {
        return put(`promoDetails/${props.editingId}/`, {annee: props.annee, filiere: props.filiereId})
        .then(data => {
            if(data.error){
                console.error(data.error);
            }
            else{
                console.log(data);
                return data// This line needs to be corrected
            }
        }).catch((error) => {         
            console.error(error);
        });
    }
}

export default AdminFunction;