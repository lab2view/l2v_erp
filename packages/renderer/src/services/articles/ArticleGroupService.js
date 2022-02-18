import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/articles/groups/list?page=${page}`, field);
  },

  add(articleGroup) {
    return axios.post(`/articles/groups`, articleGroup);
  },

  get(id) {
    return axios.get(`/articles/groups/${id}`);
  },

  update(articleGroup, id) {
    return axios.put(`/articles/groups/${id}`, articleGroup);
  },

  delete(id) {
    return axios.delete(`/articles/groups/${id}`);
  },

  restore(id) {
    return axios.post(`/articles/groups/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/articles/groups/delete/${id}`);
  },

  addArticles(articles, group_id) {
    return axios.post(`/articles/groups/${group_id}/lines/add`, articles);
  },

  removeArticles(articleGroupLineIds, group_id) {
    return axios.post(
      `/articles/groups/${group_id}/lines/remove`,
      articleGroupLineIds
    );
  },

  updateArticleQuantity(quantity, article_group_line_id) {
    return axios.put(`/articles/groups/lines/${article_group_line_id}/update`, {
      quantity,
    });
  },
};
