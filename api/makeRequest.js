import axios from 'axios';
import qs from 'querystring';
import config from '../config';

const { api } = config;
let spotify_token = null;

export default async function makeRequest(path, resourceType) {
  if(!spotify_token) {
    spotify_token = await getToken();
    console.log("Got Token:", spotify_token);
  }

  if(spotify_token) {
    const res = await axios.get(
      `${api.baseUrl}/browse/${path}?locale=hi_en`,
      {  headers: { Authorization: `Bearer ${spotify_token}` } }
    );
  
    return res.data[resourceType].items;
  }
}

const getToken = async () => {
  const AuthorizationString = `${btoa(`${api.clientId}:${api.clientSecret}`)}`;
  const { data: { access_token: token } } = await axios.post(
    api.authUrl,
    qs.stringify({ 'grant_type': 'client_credentials' }),
    {
      headers: {
        Authorization: `Basic ${AuthorizationString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  return token;
}

