import axios from '/@/config/axios';

export default {
  getCustomerGroupDiscountsList(page, field) {
    return axios.post(`/customers/groups/discounts/list?page=${page}`, field);
  },

  addCustomerGroupDiscount(customerGroupDiscount) {
    return axios.post(`/customers/groups/discounts`, customerGroupDiscount);
  },

  getCustomerGroupDiscount(id) {
    return axios.get(`/customers/groups/discounts/${id}`);
  },

  updateCustomerGroupDiscount(customerGroupDiscount, id) {
    return axios.put(
      `/customers/groups/discounts/${id}`,
      customerGroupDiscount
    );
  },

  deleteCustomerGroupDiscount(id) {
    return axios.delete(`/customers/groups/discounts/${id}`);
  },

  restoreCustomerGroupDiscount(id) {
    return axios.post(`/customers/groups/discounts/restore/${id}`);
  },

  forceDeleteCustomerGroupDiscount(id) {
    return axios.delete(`/customers/groups/discounts/delete/${id}`);
  },
};
