import axios from '/@/config/axios';

export default {
  getSaleVouchersList(page, field) {
    return axios.post(`/sales/vouchers/list?page=${page}`, field);
  },

  addSaleVoucher(saleVoucher) {
    return axios.post(`/sales/vouchers`, saleVoucher);
  },

  getSaleVoucher(id) {
    return axios.get(`/sales/vouchers/${id}`);
  },

  updateSaleVoucher(saleVoucher, id) {
    return axios.put(`/sales/vouchers/${id}`, saleVoucher);
  },

  deleteSaleVoucher(id) {
    return axios.delete(`/sales/vouchers/${id}`);
  },

  restoreSaleVoucher(id) {
    return axios.post(`/sales/vouchers/restore/${id}`);
  },

  forceDeleteSaleVoucher(id) {
    return axios.delete(`/sales/vouchers/delete/${id}`);
  },

  getSaleVoucherRefundsList(page, field) {
    return axios.post(`/sales/vouchers/refund/list?page=${page}`, field);
  },

  addSaleVoucherRefund(saleVoucherRefund) {
    return axios.post(`/sales/vouchers/refund`, saleVoucherRefund);
  },

  restoreSaleVoucherRefund(id) {
    return axios.post(`/sales/vouchers/refund/restore/${id}`);
  },

  forceDeleteSaleVoucherRefund(id) {
    return axios.delete(`/sales/vouchers/refund/delete/${id}`);
  },
};
