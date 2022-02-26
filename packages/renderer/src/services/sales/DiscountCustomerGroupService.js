import axios from '/@/config/axios';

export default {
  getDiscountCustomerGroupsList(page, field) {
    return axios.post(`/discounts/customer-groups/list?page=${page}`, field);
  },

  addDiscountCustomerGroup(discountCustomerGroup) {
    return axios.post(`/discounts/customer-groups`, discountCustomerGroup);
  },

  restoreDiscountCustomerGroup(id) {
    return axios.post(`/discounts/customer-groups/restore/${id}`);
  },

  forceDeleteDiscountCustomerGroup(id) {
    return axios.delete(`/discounts/customer-groups/delete/${id}`);
  },
};
