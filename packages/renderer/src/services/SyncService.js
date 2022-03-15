import axios from '/@/config/axios';

export default {
  getSynchronizationList(page, field) {
    return axios.post(`/synchronisations?page=${page}`, field);
  },
  getLastHash(module) {
    return axios.get(`/synchronisations/${module}/hash`);
  },
};
