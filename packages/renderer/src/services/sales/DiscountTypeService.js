import axios from '/@/config/axios';

export default {
  getDiscountTypesList(page, field) {
    return axios.post(`/discounts/types/list?page=${page}`, field);
  },

  addDiscountType(discountType) {
    return axios.post(`/discounts/types`, discountType);
  },

  getDiscountType(id) {
    return axios.get(`/discounts/types/${id}`);
  },

  updateDiscountType(discountType, id) {
    return axios.put(`/discounts/types/${id}`, discountType);
  },

  deleteDiscountType(id) {
    return axios.delete(`/discounts/types/${id}`);
  },

  restoreDiscountType(id) {
    return axios.post(`/discounts/types/restore/${id}`);
  },

  forceDeleteDiscountType(id) {
    return axios.delete(`/discounts/types/delete/${id}`);
  },
};
