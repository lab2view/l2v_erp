import axios from '/@/config/axios';

export default {
  getShippingsList(page, field) {
    return axios.post(`/stocks/shippings/list?page=${page}`, field);
  },

  addShipping(shipping) {
    return axios.post(`/stocks/shippings`, shipping);
  },

  getShipping(id) {
    return axios.get(`/stocks/shippings/${id}`);
  },

  updateShipping(shipping, id) {
    return axios.put(`/stocks/shippings/${id}`, shipping);
  },

  deleteShipping(id) {
    return axios.delete(`/stocks/shippings/${id}`);
  },

  restoreShipping(id) {
    return axios.post(`/stocks/shippings/restore/${id}`);
  },

  forceDeleteShipping(id) {
    return axios.delete(`/stocks/shippings/delete/${id}`);
  },
};
