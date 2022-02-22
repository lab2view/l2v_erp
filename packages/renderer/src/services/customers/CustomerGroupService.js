import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/customers/groups/list?page=${page}`, field);
  },

  add(customerGroup) {
    return axios.post(`/customers/groups`, customerGroup);
  },

  get(id) {
    return axios.get(`/customers/groups/${id}`);
  },

  update(customerGroup, id) {
    return axios.put(`/customers/groups/${id}`, customerGroup);
  },

  delete(id) {
    return axios.delete(`/customers/groups/${id}`);
  },

  restore(id) {
    return axios.post(`/customers/groups/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/customers/groups/delete/${id}`);
  },

  addCustomers(customerGroupId, customers) {
    return axios.post(
      `/customers/groups/${customerGroupId}/lines/add`,
      customers
    );
  },

  removeCustomers(customerGroupId, customerGroupLineIds) {
    return axios.post(
      `/customers/groups/${customerGroupId}/lines/remove`,
      customerGroupLineIds
    );
  },
};
