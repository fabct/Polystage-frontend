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

const put = async (endpoint, data) => {
  // Utilisez la variable 'url' ici
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export { post, get, delet, put};