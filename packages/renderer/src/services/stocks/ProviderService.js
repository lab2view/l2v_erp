import axios from '/@/config/axios';

export default {
  getProvidersList(page, field) {
    return axios.post(`/stocks/providers/list?page=${page}`, field);
  },

  addProvider(provider) {
    return axios.post(`/stocks/providers`, provider);
  },

  getProvider(id) {
    return axios.get(`/stocks/providers/${id}`);
  },

  updateProvider(provider, id) {
    return axios.put(`/stocks/providers/${id}`, provider);
  },

  deleteProvider(id) {
    return axios.delete(`/stocks/providers/${id}`);
  },

  restoreProvider(id) {
    return axios.post(`/stocks/providers/restore/${id}`);
  },

  forceDeleteProvider(id) {
    return axios.delete(`/stocks/providers/delete/${id}`);
  },
};
