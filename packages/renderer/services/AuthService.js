import axios from '../config/axios';

export default {
  login(credentials) {
    return axios.post('/auth/login', credentials);
  },

  logout() {
    return axios.get('/auth/logout');
  },
};
