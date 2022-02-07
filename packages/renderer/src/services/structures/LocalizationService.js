import axios from '/@/config/axios';

export default {
  getLocalizationsList(page, field) {
    return axios.post(`/localizations/list?page=${page}`, field);
  },

  addLocalization(localization) {
    return axios.post(`/localizations`, localization);
  },

  getLocalization(id) {
    return axios.get(`/localizations/${id}`);
  },

  updateLocalization(localization, id) {
    return axios.put(`/localizations/${id}`, localization);
  },

  deleteLocalization(id) {
    return axios.delete(`/localizations/${id}`);
  },

  restoreLocalization(id) {
    return axios.post(`/localizations/restore/${id}`);
  },

  forceDeleteLocalization(id) {
    return axios.delete(`/localizations/delete/${id}`);
  },
};
