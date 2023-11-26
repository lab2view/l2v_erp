import axios from '/@/config/axios';

export default {
  login(credentials) {
    return axios.post('/auth/login', credentials);
  },

  checkPassword(passwordField) {
    return axios.post('/current-user/unlock-screen', passwordField);
  },

  checkConfirmPin(field) {
    return axios.post('/current-user/check-confirm-pin', field);
  },

  logout() {
    return axios.get('/auth/logout');
  },

  sendResetPasswordCode(inputField) {
    return axios.post('/auth/password/forget', inputField);
  },

  verifyOtpCode(inputField) {
    return axios.post('/auth/verify/otp', inputField);
  },

  resetPassword(inputField) {
    return axios.post('/auth/password/reset', inputField);
  },
};
