import axios from '/@/config/axios';

export default {
  getCustomerGroupsList(page, field) {
    return axios.post(`/customers/groups/list?page=${page}`, field);
  },

  addCustomerGroup(customerGroup) {
    return axios.post(`/customers/groups`, customerGroup);
  },

  getCustomerGroup(id) {
    return axios.get(`/customers/groups/${id}`);
  },

  updateCustomerGroup(customerGroup, id) {
    return axios.put(`/customers/groups/${id}`, customerGroup);
  },

  deleteCustomerGroup(id) {
    return axios.delete(`/customers/groups/${id}`);
  },

  restoreCustomerGroup(id) {
    return axios.post(`/customers/groups/restore/${id}`);
  },

  forceDeleteCustomerGroup(id) {
    return axios.delete(`/customers/groups/delete/${id}`);
  },

  addCustomersToCustomerGroup(customerGroupId, customer_ids) {
    return axios.post(`/customers/addCustomers/${customerGroupId}`, {
      customer_ids,
    });
  },

  removeCustomersToCustomerGroup(customerGroupId, customer_group_line_ids) {
    return axios.post(`/customers/groups/removeCustomers/${customerGroupId}`, {
      _method: 'DELETE',
      customer_group_line_ids,
    });
  },

  restoreCustomersToCustomerGroup(id) {
    return axios.post(`/customers/groups/restoreCustomers/${id}`);
  },

  forceDeleteCustomersToCustomerGroup(id) {
    return axios.delete(`/customers/groups/deleteCustomers/${id}`);
  },
};
