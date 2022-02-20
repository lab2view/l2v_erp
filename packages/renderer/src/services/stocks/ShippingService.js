import axios from '/@/config/axios';

export default {
  getShippingsList(page, field) {
    return axios.post(`/shippings/list?page=${page}`, field);
  },

  addShipping(shipping) {
    return axios.post(`/shippings`, shipping);
  },

  getShipping(id) {
    return axios.get(`/shippings/${id}`);
  },

  updateShipping(shipping, id) {
    return axios.put(`/shippings/${id}`, shipping);
  },

  deleteShipping(id) {
    return axios.delete(`/shippings/${id}`);
  },

  restoreShipping(id) {
    return axios.post(`/shippings/restore/${id}`);
  },

  forceDeleteShipping(id) {
    return axios.delete(`/shippings/delete/${id}`);
  },
};
