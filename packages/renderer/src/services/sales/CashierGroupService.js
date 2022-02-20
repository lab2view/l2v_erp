import axios from '/@/config/axios';

export default {
  getCashierGroupsList(page, field) {
    return axios.post(`/cashiers/groups/list?page=${page}`, field);
  },

  addCashierGroup(cashier) {
    return axios.post(`/cashiers/groups`, cashier);
  },

  getCashierGroup(id) {
    return axios.get(`/cashiers/groups/${id}`);
  },

  updateCashierGroup(cashier, id) {
    return axios.put(`/cashiers/groups/${id}`, cashier);
  },

  deleteCashierGroup(id) {
    return axios.delete(`/cashiers/groups/${id}`);
  },

  restoreCashierGroup(id) {
    return axios.post(`/cashiers/groups/restore/${id}`);
  },

  forceDeleteCashierGroup(id) {
    return axios.delete(`/cashiers/groups/delete/${id}`);
  },
};
