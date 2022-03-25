import axios from '/@/config/axios';

export default {
  getStockEntryProvisionsList(page, field) {
    return axios.post(`/stocks/entries/provisions/list?page=${page}`, field);
  },

  addStockEntryProvision(provision) {
    return axios.post(`/stocks/entries/provisions`, provision);
  },

  getStockEntryProvision(id) {
    return axios.get(`/stocks/entries/provisions/${id}`);
  },

  updateStockEntryProvision(provision, id) {
    return axios.put(`/stocks/entries/provisions/${id}`, provision);
  },

  deleteStockEntryProvision(id) {
    return axios.delete(`/stocks/entries/provisions/${id}`);
  },

  restoreStockEntryProvision(id) {
    return axios.post(`/stocks/entries/provisions/restore/${id}`);
  },

  forceDeleteStockEntryProvision(id) {
    return axios.delete(`/stocks/entries/provisions/delete/${id}`);
  },
};
