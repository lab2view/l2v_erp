import axios from '/@/config/axios';

export default {
  getCashierSessionCollectionsList(page, field) {
    return axios.post(
      `/cashiers/sessions/collections/list?page=${page}`,
      field
    );
  },

  addCashierSessionCollection(cashierSessionCollection) {
    return axios.post(
      `/cashiers/sessions/collections`,
      cashierSessionCollection
    );
  },

  getCashierSessionCollection(id) {
    return axios.get(`/cashiers/sessions/collections/${id}`);
  },

  updateCashierSessionCollection(cashierSessionCollection, id) {
    return axios.put(
      `/cashiers/sessions/collections/${id}`,
      cashierSessionCollection
    );
  },

  deleteCashierSessionCollection(id) {
    return axios.delete(`/cashiers/sessions/collections/${id}`);
  },

  restoreCashierSessionCollection(id) {
    return axios.post(`/cashiers/sessions/collections/restore/${id}`);
  },

  forceDeleteCashierSessionCollection(id) {
    return axios.delete(`/cashiers/sessions/collections/delete/${id}`);
  },
};
