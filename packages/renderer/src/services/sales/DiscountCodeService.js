import axios from '/@/config/axios';

export default {
  getDiscountCodesList(page, field) {
    return axios.post(`/discounts/codes/list?page=${page}`, field);
  },

  generateCode() {
    return axios.post('/discounts/codes/generate');
  },

  addDiscountCode(discountCode) {
    return axios.post(`/discounts/codes`, discountCode);
  },

  restoreDiscountCode(id) {
    return axios.post(`/discounts/codes/restore/${id}`);
  },

  forceDeleteDiscountCode(id) {
    return axios.delete(`/discounts/codes/delete/${id}`);
  },

  getDiscountCodeUsagesList(page, field) {
    return axios.post(`/discounts/codes/usages/list?page=${page}`, field);
  },

  addDiscountCodeUsage(discountCodeUsage) {
    return axios.post(`/discounts/codes/usages`, discountCodeUsage);
  },

  restoreDiscountCodeUsage(id) {
    return axios.post(`/discounts/codes/usages/restore/${id}`);
  },

  forceDeleteDiscountCodeUsage(id) {
    return axios.delete(`/discounts/codes/usages/delete/${id}`);
  },
};
