import axios from '/@/config/axios';

export default {
  getSalesList(page, field) {
    return axios.post(`/sales/list?page=${page}`, field);
  },

  addSale(sale) {
    return axios.post(`/sales`, sale);
  },

  getSale(id) {
    return axios.get(`/sales/${id}`);
  },

  updateSale(sale, id) {
    return axios.put(`/sales/${id}`, sale);
  },

  deleteSale(id) {
    return axios.delete(`/sales/${id}`);
  },

  restoreSale(id) {
    return axios.post(`/sales/restore/${id}`);
  },

  forceDeleteSale(id) {
    return axios.delete(`/sales/delete/${id}`);
  },
};
