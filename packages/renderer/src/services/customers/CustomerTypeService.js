import axios from '/@/config/axios';

export default {
  getCustomerTypesList(page, field) {
    return axios.post(`/customers/types/list?page=${page}`, field);
  },

  addCustomerType(customerType) {
    return axios.post(`/customers/types`, customerType);
  },

  getCustomerType(id) {
    return axios.get(`/customers/types/${id}`);
  },

  updateCustomerType(customerType, id) {
    return axios.put(`/customers/types/${id}`, customerType);
  },

  deleteCustomerType(id) {
    return axios.delete(`/customers/types/${id}`);
  },

  restoreCustomerType(id) {
    return axios.post(`/customers/types/restore/${id}`);
  },

  forceDeleteCustomerType(id) {
    return axios.delete(`/customers/types/delete/${id}`);
  },
};
