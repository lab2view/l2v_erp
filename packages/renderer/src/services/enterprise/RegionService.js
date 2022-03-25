import axios from '/@/config/axios';

export default {
  getRegionsList(page, field) {
    return axios.post(`/regions/list?page=${page}`, field);
  },

  addRegion(region) {
    return axios.post(`/regions`, region);
  },

  getRegion(id) {
    return axios.get(`/regions/${id}`);
  },

  updateRegion(region, id) {
    return axios.put(`/regions/${id}`, region);
  },

  deleteRegion(id) {
    return axios.delete(`/regions/${id}`);
  },

  restoreRegion(id) {
    return axios.post(`/regions/restore/${id}`);
  },

  forceDeleteRegion(id) {
    return axios.delete(`/regions/delete/${id}`);
  },
};
