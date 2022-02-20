import axios from '/@/config/axios';

export default {
  getProvidersList(page, field) {
    return axios.post(`/providers/list?page=${page}`, field);
  },

  addProvider(provider) {
    return axios.post(`/providers`, provider);
  },

  getProvider(id) {
    return axios.get(`/providers/${id}`);
  },

  updateProvider(provider, id) {
    return axios.put(`/providers/${id}`, provider);
  },

  deleteProvider(id) {
    return axios.delete(`/providers/${id}`);
  },

  restoreProvider(id) {
    return axios.post(`/providers/restore/${id}`);
  },

  forceDeleteProvider(id) {
    return axios.delete(`/providers/delete/${id}`);
  },
};
