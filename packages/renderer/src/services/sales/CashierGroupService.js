import axios from '/@/config/axios';

export default {
  getCashierGroupsList(page, field) {
    return axios.post(`/cashiers/groups/list?page=${page}`, field);
  },

  addCashierGroup(cashierGroup) {
    return axios.post(`/cashiers/groups`, cashierGroup);
  },

  getCashierGroup(id) {
    return axios.get(`/cashiers/groups/${id}`);
  },

  updateCashierGroup(cashierGroup, id) {
    return axios.put(`/cashiers/groups/${id}`, cashierGroup);
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
