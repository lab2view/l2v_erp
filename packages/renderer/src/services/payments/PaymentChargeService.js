import axios from '/@/config/axios';

export default {
  getPaymentChargesList(page, field) {
    return axios.post(`/payments/charges/list?page=${page}`, field);
  },

  addPaymentCharge(paymentCharge) {
    return axios.post(`/payments/charges`, paymentCharge);
  },

  getPaymentCharge(id) {
    return axios.get(`/payments/charges/${id}`);
  },

  updatePaymentCharge(paymentCharge, id) {
    return axios.put(`/payments/charges/${id}`, paymentCharge);
  },

  deletePaymentCharge(id) {
    return axios.delete(`/payments/charges/${id}`);
  },

  restorePaymentCharge(id) {
    return axios.post(`/payments/charges/restore/${id}`);
  },

  forceDeletePaymentCharge(id) {
    return axios.delete(`/payments/charges/delete/${id}`);
  },
};
