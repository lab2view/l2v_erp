import axios from '/@/config/axios';

export default {
  getEnterprisesList(page, field) {
    return axios.post(`/enterprises/list?page=${page}`, field);
  },

  addEnterprise(enterprise) {
    return axios.post(`/enterprises`, enterprise);
  },

  getEnterprise(id) {
    return axios.get(`/enterprises/${id}`);
  },

  updateEnterprise(enterprise, id) {
    return axios.put(`/enterprises/${id}`, enterprise);
  },

  deleteEnterprise(id) {
    return axios.delete(`/enterprises/${id}`);
  },

  restoreEnterprise(id) {
    return axios.post(`/enterprises/restore/${id}`);
  },

  forceDeleteEnterprise(id) {
    return axios.delete(`/enterprises/delete/${id}`);
  },

  addEnterpriseModule(enterpriseModule) {
    return axios.post(`/enterprises/modules/add`, enterpriseModule);
  },

  updateEnterpriseModule(enterpriseModule, id) {
    return axios.put(`/enterprises/modules/update/${id}`, enterpriseModule);
  },

  deleteEnterpriseModule(id) {
    return axios.delete(`/enterprises/modules/remove/${id}`);
  },
};
