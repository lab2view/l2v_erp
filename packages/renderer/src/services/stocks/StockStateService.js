import axios from '/@/config/axios';

export default {
  getStockStatesList(page, field) {
    return axios.post(`/stocks/states/list?page=${page}`, field);
  },

  addStockState(stockState) {
    return axios.post(`/stocks/states`, stockState);
  },

  getStockState(id) {
    return axios.get(`/stocks/states/${id}`);
  },

  updateStockState(stockState, id) {
    return axios.put(`/stocks/states/${id}`, stockState);
  },

  deleteStockState(id) {
    return axios.delete(`/stocks/states/${id}`);
  },

  restoreStockState(id) {
    return axios.post(`/stocks/states/restore/${id}`);
  },

  forceDeleteStockState(id) {
    return axios.delete(`/stocks/states/delete/${id}`);
  },
};
