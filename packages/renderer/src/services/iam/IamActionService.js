import axios from '/@/config/axios';

export default {
  getActionsList(page, field) {
    return axios.post(`/actions/list?page=${page}`, field);
  },

  getAction(id) {
    return axios.get(`/actions/${id}`);
  },

  updateAction(action, id) {
    return axios.put(`/actions/${id}`, action);
  },

  deleteAction(id) {
    return axios.delete(`/actions/${id}`);
  },

  restoreAction(id) {
    return axios.post(`/actions/restore/${id}`);
  },

  forceDeleteAction(id) {
    return axios.delete(`/actions/delete/${id}`);
  },
};
