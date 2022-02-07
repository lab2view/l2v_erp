import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/stocks/exits/lines/list?page=${page}`, field);
  },

  add(stockExitLine) {
    return axios.post(`/stocks/exits/lines`, stockExitLine);
  },

  get(id) {
    return axios.get(`/stocks/exits/lines/${id}`);
  },

  update(stockExitLine, id) {
    return axios.put(`/stocks/exits/lines/${id}`, stockExitLine);
  },

  delete(id) {
    return axios.delete(`/stocks/exits/lines/${id}`);
  },

  restore(id) {
    return axios.post(`/stocks/exits/lines/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/stocks/exits/lines/delete/${id}`);
  },
};
