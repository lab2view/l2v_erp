import axios from '/@/config/axios';

export default {
  getCustomersList(page, field) {
    return axios.post(`/customers/list?page=${page}`, field);
  },

  addCustomer(customer) {
    return axios.post(`/customers`, customer);
  },

  getCustomer(id) {
    return axios.get(`/customers/${id}`);
  },

  updateCustomer(customer, id) {
    return axios.put(`/customers/${id}`, customer);
  },

  deleteCustomer(id) {
    return axios.delete(`/customers/${id}`);
  },

  restoreCustomer(id) {
    return axios.post(`/customers/restore/${id}`);
  },

  forceDeleteCustomer(id) {
    return axios.delete(`/customers/delete/${id}`);
  },
};
