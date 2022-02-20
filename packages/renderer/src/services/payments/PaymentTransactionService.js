import axios from '/@/config/axios';

export default {
  getPaymentTransactionsList(page, field) {
    return axios.post(`/payments/transactions/list?page=${page}`, field);
  },

  addPaymentTransaction(paymentTransaction) {
    return axios.post(`/payments/transactions`, paymentTransaction);
  },

  getPaymentTransaction(id) {
    return axios.get(`/payments/transactions/${id}`);
  },

  updatePaymentTransaction(paymentTransaction, id) {
    return axios.put(`/payments/transactions/${id}`, paymentTransaction);
  },

  deletePaymentTransaction(id) {
    return axios.delete(`/payments/transactions/${id}`);
  },

  restorePaymentTransaction(id) {
    return axios.post(`/payments/transactions/restore/${id}`);
  },

  forceDeletePaymentTransaction(id) {
    return axios.delete(`/payments/transactions/delete/${id}`);
  },
};
