import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/taxes/list?page=${page}`, field);
  },

  add(tax) {
    return axios.post(`/taxes`, tax);
  },

  get(id) {
    return axios.get(`/taxes/${id}`);
  },

  update(tax, id) {
    return axios.put(`/taxes/${id}`, tax);
  },

  delete(id) {
    return axios.delete(`/taxes/${id}`);
  },

  restore(id) {
    return axios.post(`/taxes/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/taxes/delete/${id}`);
  },
};
