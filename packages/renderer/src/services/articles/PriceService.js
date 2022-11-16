import axios from '/@/config/axios';

export default {
  updateOrCreate(prices) {
    return axios.post(`/prices/articles/inserts`, prices);
  },
};
