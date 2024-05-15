import axios from 'axios';

//const BASE_URL = 'http://localhost:8000/'; // Remplacez par l'URL de votre API

/*const apiService = {
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
};*/

let url = 'http://localhost:8000';

const post = async (endpoint, data) => {
  // Utilisez la variable 'url' ici
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

const get = async (endpoint) => {
  // Utilisez la variable 'url' ici
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

const delet = async (endpoint) => {
  // Utilisez la variable 'url' ici
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

export default {
  post,
  get,
  delet,
};