import axios from '/@/config/axios';

export default {
  getModulesList(page, field) {
    return axios.post(`/modules/list?page=${page}`, field);
  },

  addModule(module) {
    return axios.post(`/modules`, module);
  },

  getModule(id) {
    return axios.get(`/modules/${id}`);
  },

  updateModule(module, id) {
    return axios.put(`/modules/${id}`, module);
  },

  deleteModule(id) {
    return axios.delete(`/modules/${id}`);
  },

  restoreModule(id) {
    return axios.post(`/modules/restore/${id}`);
  },

  forceDeleteModule(id) {
    return axios.delete(`/modules/delete/${id}`);
  },
};
