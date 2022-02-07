import axios from '/@/config/axios';

export default {
  getCountriesList(page, field) {
    return axios.post(`/countries/list?page=${page}`, field);
  },

  addCountry(country) {
    return axios.post(`/countries`, country);
  },

  getCountry(id) {
    return axios.get(`/countries/${id}`);
  },

  updateCountry(country, id) {
    return axios.put(`/countries/${id}`, country);
  },

  deleteCountry(id) {
    return axios.delete(`/countries/${id}`);
  },

  restoreCountry(id) {
    return axios.post(`/countries/restore/${id}`);
  },

  forceDeleteCountry(id) {
    return axios.delete(`/countries/delete/${id}`);
  },
};
