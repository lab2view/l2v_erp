import axios from '/@/config/axios';

export default {
  getCashierSessionsList(page, field) {
    return axios.post(`/cashiers/sessions/list?page=${page}`, field);
  },

  addCashierSession(cashierSession) {
    return axios.post(`/cashiers/sessions`, cashierSession);
  },

  verifyCashierSession(cashierSession) {
    return axios.post(`/cashiers/sessions/verify`, cashierSession);
  },

  getCashierSession(id) {
    return axios.get(`/cashiers/sessions/${id}`);
  },

  getEndCashierSession(id) {
    return axios.get(`/cashiers/sessions/${id}/end`);
  },

  updateCashierSession(cashierSession, id) {
    return axios.put(`/cashiers/sessions/${id}`, cashierSession);
  },

  deleteCashierSession(id) {
    return axios.delete(`/cashiers/sessions/${id}`);
  },

  restoreCashierSession(id) {
    return axios.post(`/cashiers/sessions/restore/${id}`);
  },

  forceDeleteCashierSession(id) {
    return axios.delete(`/cashiers/sessions/delete/${id}`);
  },
};
