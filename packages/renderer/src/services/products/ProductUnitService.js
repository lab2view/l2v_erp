import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/products/units/list?page=${page}`, field);
  },

  add(productUnit) {
    return axios.post(`/products/units`, productUnit);
  },

  get(id) {
    return axios.get(`/products/units/${id}`);
  },

  update(productUnit, id) {
    return axios.put(`/products/units/${id}`, productUnit);
  },

  delete(id) {
    return axios.delete(`/products/units/${id}`);
  },

  restore(id) {
    return axios.post(`/products/units/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/products/units/delete/${id}`);
  },
};
