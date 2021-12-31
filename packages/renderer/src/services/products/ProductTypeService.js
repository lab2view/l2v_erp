import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/products/types/list?page=${page}`, field);
  },

  add(productType) {
    return axios.post(`/products/types`, productType);
  },

  get(id) {
    return axios.get(`/products/types/${id}`);
  },

  update(productType, id) {
    return axios.put(`/products/types/${id}`, productType);
  },

  delete(id) {
    return axios.delete(`/products/types/${id}`);
  },

  restore(id) {
    return axios.post(`/products/types/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/products/types/delete/${id}`);
  },
};
