import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/prices/types/list?page=${page}`, field);
  },

  add(priceType) {
    return axios.post(`/prices/types`, priceType);
  },

  get(id) {
    return axios.get(`/prices/types/${id}`);
  },

  update(priceType, id) {
    return axios.put(`/prices/types/${id}`, priceType);
  },

  delete(id) {
    return axios.delete(`/prices/types/${id}`);
  },

  restore(id) {
    return axios.post(`/prices/types/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/prices/types/delete/${id}`);
  },
};
