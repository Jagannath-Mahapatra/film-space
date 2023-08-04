import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  accept: 'application/json',
  Authorization: 'Bearer ' + TMDB_TOKEN,
};

export const fetchDataFromAPI = async (url, params) => {
  const options = {
    method: 'GET',
    url: BASE_URL + url,
    params,
    headers,
  };

  return axios
    .request(options)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.error(error.message);
      return error;
    });
};
