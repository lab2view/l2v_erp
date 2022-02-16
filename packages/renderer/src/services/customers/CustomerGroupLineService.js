import axios from '/@/config/axios';

export default {
  getCustomerGroupLinesList(page, field) {
    return axios.post(`/customers/groups/lines/list?page=${page}`, field);
  },

  addCustomerGroupLine(customerGroupLine) {
    return axios.post(`/customers/groups/lines`, customerGroupLine);
  },

  getCustomerGroupLine(id) {
    return axios.get(`/customers/groups/lines/${id}`);
  },

  updateCustomerGroupLine(customerGroupLine, id) {
    return axios.put(`/customers/groups/lines/${id}`, customerGroupLine);
  },

  deleteCustomerGroupLine(id) {
    return axios.delete(`/customers/groups/lines/${id}`);
  },

  restoreCustomerGroupLine(id) {
    return axios.post(`/customers/groups/lines/restore/${id}`);
  },

  forceDeleteCustomerGroupLine(id) {
    return axios.delete(`/customers/groups/lines/delete/${id}`);
  },
};
