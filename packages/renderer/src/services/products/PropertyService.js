import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/properties/list?page=${page}`, field);
  },

  add(property) {
    return axios.post(`/properties`, property);
  },

  get(id) {
    return axios.get(`/properties/${id}`);
  },

  update(property, id) {
    return axios.put(`/properties/${id}`, property);
  },

  delete(id) {
    return axios.delete(`/properties/${id}`);
  },

  restore(id) {
    return axios.post(`/properties/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/properties/delete/${id}`);
  },
};
