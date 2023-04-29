import axios from '/@/config/axios';

export default {
  getStockEntryLinesList(page, field) {
    return axios.post(`/stocks/entries/lines/list?page=${page}`, field);
  },

  getStockExpiredEntryLinesList(page, field) {
    return axios.post(`/stocks/entries/lines/expired?page=${page}`, field);
  },

  addStockEntryLine(stockEntryLine) {
    return axios.post(`/stocks/entries/lines`, stockEntryLine);
  },

  getStockEntryLine(id) {
    return axios.get(`/stocks/entries/lines/${id}`);
  },

  updateStockEntryLine(stockEntryLine, id) {
    return axios.put(`/stocks/entries/lines/${id}`, stockEntryLine);
  },

  deleteStockEntryLine(id) {
    return axios.delete(`/stocks/entries/lines/${id}`);
  },

  restoreStockEntryLine(id) {
    return axios.post(`/stocks/entries/lines/restore/${id}`);
  },

  forceDeleteStockEntryLine(id) {
    return axios.delete(`/stocks/entries/lines/delete/${id}`);
  },
};
