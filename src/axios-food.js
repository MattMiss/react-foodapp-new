import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-food-app-3532b.firebaseio.com/'
});

export default instance;