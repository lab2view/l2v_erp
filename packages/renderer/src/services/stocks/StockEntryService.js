import axios from '/@/config/axios';

export default {
  getStockEntriesList(page, field) {
    return axios.post(`/stocks/entries/list?page=${page}`, field);
  },

  addStockEntry(stockEntry) {
    return axios.post(`/stocks/entries`, stockEntry);
  },

  getStockEntry(id) {
    return axios.get(`/stocks/entries/${id}`);
  },

  updateStockEntry(stockEntry, id) {
    return axios.put(`/stocks/entries/${id}`, stockEntry);
  },

  deleteStockEntry(id) {
    return axios.delete(`/stocks/entries/${id}`);
  },

  restoreStockEntry(id) {
    return axios.post(`/stocks/entries/restore/${id}`);
  },

  forceDeleteStockEntry(id) {
    return axios.delete(`/stocks/entries/delete/${id}`);
  },

  addStockEntryProvision(id, stockProvisions) {
    return axios.post(`/stocks/entries/${id}/provisions/add`, stockProvisions);
  },
};
