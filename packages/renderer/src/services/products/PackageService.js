import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/packages/list?page=${page}`, field);
  },

  add(packageObject) {
    return axios.post(`/packages`, packageObject);
  },

  get(id) {
    return axios.get(`/packages/${id}`);
  },

  update(packageObject, id) {
    return axios.put(`/packages/${id}`, packageObject);
  },

  delete(id) {
    return axios.delete(`/packages/${id}`);
  },

  restore(id) {
    return axios.post(`/packages/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/packages/delete/${id}`);
  },
};
