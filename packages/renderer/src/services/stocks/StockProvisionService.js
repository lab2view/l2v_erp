import axios from '/@/config/axios';

export default {
  getStockProvisionsList(page, field) {
    return axios.post(`/stocks/provisions/list?page=${page}`, field);
  },

  addStockProvision(stockProvision) {
    return axios.post(`/stocks/provisions`, stockProvision);
  },

  getStockProvision(id) {
    return axios.get(`/stocks/provisions/${id}`);
  },

  updateStockProvision(stockProvision, id) {
    return axios.put(`/stocks/provisions/${id}`, stockProvision);
  },

  deleteStockProvision(id) {
    return axios.delete(`/stocks/provisions/${id}`);
  },

  restoreStockProvision(id) {
    return axios.post(`/stocks/provisions/restore/${id}`);
  },

  forceDeleteStockProvision(id) {
    return axios.delete(`/stocks/provisions/delete/${id}`);
  },
};
