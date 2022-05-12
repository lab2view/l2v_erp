import axios from '/@/config/axios';

export default {
  getCashiersList(page, field) {
    return axios.post(`/cashiers/list?page=${page}`, field);
  },

  addCashier(cashier) {
    return axios.post(`/cashiers`, cashier);
  },

  getCashier(id) {
    return axios.get(`/cashiers/${id}`);
  },

  updateCashier(cashier, id) {
    return axios.put(`/cashiers/${id}`, cashier);
  },

  deleteCashier(id) {
    return axios.delete(`/cashiers/${id}`);
  },

  restoreCashier(id) {
    return axios.post(`/cashiers/restore/${id}`);
  },

  forceDeleteCashier(id) {
    return axios.delete(`/cashiers/delete/${id}`);
  },

  openSession(payload) {
    const endpoint = payload.cashier_id
      ? `/cashiers/${payload.cashier_id}/sessions/open`
      : `/cashiers/sessions/open`;
    return axios.post(endpoint, payload);
  },

  closeSession(cashier_session_id) {
    return axios.delete(`/cashiers/sessions/${cashier_session_id}/close`);
  },
};
