import axios from '/@/config/axios';

export default {
  getPaymentTransactionTypesList(page, field) {
    return axios.post(`/payments/transactions/types/list?page=${page}`, field);
  },

  addPaymentTransactionType(paymentTransactionType) {
    return axios.post(`/payments/transactions/types`, paymentTransactionType);
  },

  getPaymentTransactionType(id) {
    return axios.get(`/payments/transactions/types/${id}`);
  },

  updatePaymentTransactionType(paymentTransactionType, id) {
    return axios.put(
      `/payments/transactions/types/${id}`,
      paymentTransactionType
    );
  },

  deletePaymentTransactionType(id) {
    return axios.delete(`/payments/transactions/types/${id}`);
  },

  restorePaymentTransactionType(id) {
    return axios.post(`/payments/transactions/types/restore/${id}`);
  },

  forceDeletePaymentTransactionType(id) {
    return axios.delete(`/payments/transactions/types/delete/${id}`);
  },
};
