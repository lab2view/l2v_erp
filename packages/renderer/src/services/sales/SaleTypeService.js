import axios from '/@/config/axios';

export default {
  getSaleTypesList(page, field) {
    return axios.post(`/sales/types/list?page=${page}`, field);
  },

  addSaleType(saleType) {
    return axios.post(`/sales/types`, saleType);
  },

  getSaleType(id) {
    return axios.get(`/sales/types/${id}`);
  },

  updateSaleType(saleType, id) {
    return axios.put(`/sales/types/${id}`, saleType);
  },

  deleteSaleType(id) {
    return axios.delete(`/sales/types/${id}`);
  },

  restoreSaleType(id) {
    return axios.post(`/sales/types/restore/${id}`);
  },

  forceDeleteSaleType(id) {
    return axios.delete(`/sales/types/delete/${id}`);
  },
};
