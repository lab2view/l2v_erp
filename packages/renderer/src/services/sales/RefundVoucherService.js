import axios from '/@/config/axios';

export default {
  getRefundVouchersList(page, field) {
    return axios.post(`/sales/vouchers/refund/list?page=${page}`, field);
  },

  addRefundVoucher(refundVoucher) {
    return axios.post(`/sales/vouchers/refund`, refundVoucher);
  },

  getRefundVoucher(id) {
    return axios.get(`/sales/vouchers/refund/${id}`);
  },

  updateRefundVoucher(refundVoucher, id) {
    return axios.put(`/sales/vouchers/refund/${id}`, refundVoucher);
  },

  deleteRefundVoucher(id) {
    return axios.delete(`/sales/vouchers/refund/${id}`);
  },

  restoreRefundVoucher(id) {
    return axios.post(`/sales/vouchers/refund/restore/${id}`);
  },

  forceDeleteRefundVoucher(id) {
    return axios.delete(`/sales/vouchers/refund/delete/${id}`);
  },
};
