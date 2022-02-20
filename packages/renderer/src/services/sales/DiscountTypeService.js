import axios from '/@/config/axios';

export default {
  getDiscountTypesList(page, field) {
    return axios.post(`/discounts/types/list?page=${page}`, field);
  },

  addDiscountType(sale) {
    return axios.post(`/discounts/types`, sale);
  },

  getDiscountType(id) {
    return axios.get(`/discounts/types/${id}`);
  },

  updateDiscountType(sale, id) {
    return axios.put(`/discounts/types/${id}`, sale);
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
