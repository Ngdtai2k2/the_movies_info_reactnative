import { API_KEY, API_URL_TMDB } from './config';

export const GET = async url => {
    const API_URL = `${API_URL_TMDB}${url}?api_key=${API_KEY}`;
    let response = await fetch(API_URL, {method: 'GET'});
    response = response.json();
    return response;
  };
