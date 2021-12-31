import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/products/families/list?page=${page}`, field);
  },

  add(productFamily) {
    return axios.post(`/products/families`, productFamily);
  },

  get(id) {
    return axios.get(`/products/families/${id}`);
  },

  update(productFamily, id) {
    return axios.put(`/products/families/${id}`, productFamily);
  },

  delete(id) {
    return axios.delete(`/products/families/${id}`);
  },

  restore(id) {
    return axios.post(`/products/families/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/products/families/delete/${id}`);
  },
};
