import axios from '/@/config/axios';

export default {
  getPaymentMethodsList(page, field) {
    return axios.post(`/payments/methods/list?page=${page}`, field);
  },

  addPaymentMethod(paymentMethod) {
    return axios.post(`/payments/methods`, paymentMethod);
  },

  getPaymentMethod(id) {
    return axios.get(`/payments/methods/${id}`);
  },

  updatePaymentMethod(paymentMethod, id) {
    return axios.put(`/payments/methods/${id}`, paymentMethod);
  },

  deletePaymentMethod(id) {
    return axios.delete(`/payments/methods/${id}`);
  },

  restorePaymentMethod(id) {
    return axios.post(`/payments/methods/restore/${id}`);
  },

  forceDeletePaymentMethod(id) {
    return axios.delete(`/payments/methods/delete/${id}`);
  },
};
