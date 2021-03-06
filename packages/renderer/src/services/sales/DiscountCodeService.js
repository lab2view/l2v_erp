import axios from '/@/config/axios';

export default {
  getDiscountCodesList(page, field) {
    return axios.post(`/discounts/codes/list?page=${page}`, field);
  },

  generateCode(fields) {
    return axios.post('/discounts/codes/generate', fields);
  },

  removeDiscountCode(id) {
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
