import axios from 'axios';

const BASE_URL = 'https://localhost:8000/'; // Remplacez par l'URL de votre API

const apiService = {
  get: (endpoint) => {
    return axios.get(`${BASE_URL}${endpoint}`);
  },

  post: (endpoint, data) => {
    return axios.post(`${BASE_URL}${endpoint}`, data);
  },

  delete: (endpoint) => {
    return axios.delete(`${BASE_URL}${endpoint}`);
  }
};

export default apiService;