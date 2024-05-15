import axios from 'axios';

const BASE_URL = 'http://localhost:8000/'; // Remplacez par l'URL de votre API

const apiService = {
  get: (endpoint) => {
    url = `${BASE_URL}${endpoint}`;
    return axios.get(url);
  },

  post: (endpoint, data) => {
    url = `${BASE_URL}${endpoint}`;
    return axios.post(url, data);
  },

  delete: (endpoint) => {
    url = `${BASE_URL}${endpoint}`;
    return axios.delete(url);
  }
};

export default apiService;