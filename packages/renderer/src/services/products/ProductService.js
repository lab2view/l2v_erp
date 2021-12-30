import axios from '/@/config/axios';

export default {
  getProductList(page, field) {
    return axios.post(`/products/list?page=${page}`, field);
  },
};
