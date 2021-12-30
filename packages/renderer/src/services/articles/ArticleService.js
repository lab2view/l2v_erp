import axios from '/@/config/axios';

export default {
  getArticleList(page, field) {
    return axios.post(`/articles/list?page=${page}`, field);
  },
};
