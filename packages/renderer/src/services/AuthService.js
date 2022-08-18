import axios from '/@/config/axios';

export default {
  login(credentials) {
    return axios.post('/auth/login', credentials);
  },
  checkPassword(passwordField) {
    return axios.post('/current-user/unlock-screen', passwordField);
  },

  logout() {
    return axios.get('/auth/logout');
  },
};
