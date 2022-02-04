import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/provisions/list?page=${page}`, field);
  },

  add(provision) {
    return axios.post(`/provisions`, provision);
  },

  get(id) {
    return axios.get(`/provisions/${id}`);
  },

  update(provision, id) {
    return axios.put(`/provisions/${id}`, provision);
  },

  delete(id) {
    return axios.delete(`/provisions/${id}`);
  },

  restore(id) {
    return axios.post(`/provisions/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/provisions/delete/${id}`);
  },
};
