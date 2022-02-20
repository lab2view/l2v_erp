import axios from '/@/config/axios';

export default {
  getSaleStatsList(page, field) {
    return axios.post(`/sales/stats/list?page=${page}`, field);
  },

  getSaleStatDailyReports() {
    return axios.post(`/sales/stats/reports-daily`);
  },

  restoreSaleStat(id) {
    return axios.post(`/sales/stats/restore/${id}`);
  },

  forceDeleteSaleStat(id) {
    return axios.delete(`/sales/stats/delete/${id}`);
  },
};
