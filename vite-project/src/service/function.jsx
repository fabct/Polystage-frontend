import { get } from './service';
import Cookies from 'js-cookie';

const getUserInfo = () => {
    const userCookie = Cookies.get('userCookie');
    if (userCookie) {
        const user = JSON.parse(userCookie);
        const user_id = user.user_id;
        return get(`userDetails/${user_id}`).then(data => {
            console.log(data);
            return data;
        }).catch((error) => {
            console.error('Erreur de connexion:', error);
            return null;
        });
    } else {
        return Promise.resolve(null);
    }
};



export {getUserInfo};