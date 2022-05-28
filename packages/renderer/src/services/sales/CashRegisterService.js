import axios from '/@/config/axios';

export default {
  getCashRegistersList(page, field) {
    return axios.post(`/cash-registers/list?page=${page}`, field);
  },

  addCashRegister(cashRegister) {
    return axios.post(`/cash-registers`, cashRegister);
  },

  getCashRegister(id) {
    return axios.get(`/cash-registers/${id}`);
  },

  updateCashRegister(cashRegister, id) {
    return axios.put(`/cash-registers/${id}`, cashRegister);
  },

  updateStatusCashRegister(cashRegister, id) {
    if (cashRegister.disabled_at === null) {
      cashRegister.disabled_at = new Date();
      return axios.put(`/cash-registers/${id}`, cashRegister);
    }
  },

  deleteCashRegister(id) {
    return axios.delete(`/cash-registers/${id}`);
  },

  restoreCashRegister(id) {
    return axios.post(`/cash-registers/restore/${id}`);
  },

  forceDeleteCashRegister(id) {
    return axios.delete(`/cash-registers/delete/${id}`);
  },
};
