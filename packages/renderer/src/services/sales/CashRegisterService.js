import axios from '/@/config/axios';

export default {
  getCashRegistersList(page, field) {
    return axios.post(`/cash-registers/list?page=${page}`, field);
  },

  addCashRegister(cashRegister) {
    return axios.post(`/cash-registers`, cashRegister);
  },

  restoreCashRegister(id) {
    return axios.post(`/cash-registers/restore/${id}`);
  },

  forceDeleteCashRegister(id) {
    return axios.delete(`/cash-registers/delete/${id}`);
  },
};
