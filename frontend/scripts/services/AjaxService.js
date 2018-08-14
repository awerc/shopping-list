import axios from 'axios';
import { API_URL } from '../constants/UrlConstants';

export default {
  get(url, query) {
    return axios({
      method: 'GET',
      url: `${API_URL}/${url}`,
      params: query
    });
  },

  delete(url, query) {
    return axios({
      method: 'DELETE',
      url: `${API_URL}/${url}`,
      params: query
    });
  },

  post(url, body) {
    return axios({
      method: 'POST',
      url: `${API_URL}/${url}`,
      data: body
    });
  },

  put(url, query) {
    return axios({
      method: 'PUT',
      url: `${API_URL}/${url}`,
      params: query
    });
  }
};
