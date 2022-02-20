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

  addCustomers(customerGroupId, customers) {
    return axios.post(`/customers/groups/${customerGroupId}/lines/add`, {
      customers,
    });
  },

  removeCustomers(customerGroupId, customerGroupLineIds) {
    return axios.post(
      `/customers/groups/${customerGroupId}/lines/remove`,
      customerGroupLineIds
    );
  },
};
