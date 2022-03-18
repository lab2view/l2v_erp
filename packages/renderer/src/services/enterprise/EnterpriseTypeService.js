import axios from '/@/config/axios';

export default {
  getEnterpriseTypesList(page, field) {
    return axios.post(`/enterprises/types/list?page=${page}`, field);
  },

  addEnterpriseType(enterpriseType) {
    return axios.post(`/enterprises/types`, enterpriseType);
  },

  getEnterpriseType(id) {
    return axios.get(`/enterprises/types/${id}`);
  },

  updateEnterpriseType(enterpriseType, id) {
    return axios.put(`/enterprises/types/${id}`, enterpriseType);
  },

  deleteEnterpriseType(id) {
    return axios.delete(`/enterprises/types/${id}`);
  },

  restoreEnterpriseType(id) {
    return axios.post(`/enterprises/types/restore/${id}`);
  },

  forceDeleteEnterpriseType(id) {
    return axios.delete(`/enterprises/types/delete/${id}`);
  },
};
