import Cookies from 'js-cookie';
let url = process.env.BACKEND_URL || 'http://localhost:8000';

const getCookie = () =>{
  const cookie = Cookies.get('userCookie');
  let userData = {};
  if (cookie) {
    try {
      userData = JSON.parse(cookie);
      console.log(userData);
      return userData.token;
    } catch (error) {
      console.error('Error parsing userCookie:', error);
    }
  }
}

const post = async (endpoint, data) => {
  const token = getCookie();
  const headers = {
    'Content-Type': 'application/json'
  };
  if (endpoint !== 'login/') {
    const token = getCookie();
    headers['Authorization'] = 'Token ' + token;
  }
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });

  return response.json();
};

const get = async (endpoint) => {
  const token = getCookie();
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'GET',
    headers: {
      'Authorization' : 'Token '+token,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
};

const delet = async (endpoint) => {
  const token = getCookie();
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Authorization' : 'Token '+token,
      'Content-Type': 'application/json'
    }
  });

  return response.json();
};

const put = async (endpoint, data) => {
  const token = getCookie();
  const response = await fetch(`${url}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Authorization' : 'Token '+token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

export { post, get, delet, put};