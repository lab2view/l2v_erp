import axios from '/@/config/axios';

export default {
  getStockTypesList(page, field) {
    return axios.post(`/stocks/types/list?page=${page}`, field);
  },

  addStockType(stockType) {
    return axios.post(`/stocks/types`, stockType);
  },

  getStockType(id) {
    return axios.get(`/stocks/types/${id}`);
  },

  updateStockType(stockType, id) {
    return axios.put(`/stocks/types/${id}`, stockType);
  },

  deleteStockType(id) {
    return axios.delete(`/stocks/types/${id}`);
  },

  restoreStockType(id) {
    return axios.post(`/stocks/types/restore/${id}`);
  },

  forceDeleteStockType(id) {
    return axios.delete(`/stocks/types/delete/${id}`);
  },
};
