import axios from '/@/config/axios';

export default {
  getList(page, field) {
    return axios.post(`/articles/list?page=${page}`, field);
  },

  add(article) {
    return axios.post(`/articles`, article);
  },

  get(id) {
    return axios.get(`/articles/${id}`);
  },

  update(article, id) {
    return axios.put(`/articles/${id}`, article);
  },

  delete(id) {
    return axios.delete(`/articles/${id}`);
  },

  restore(id) {
    return axios.post(`/articles/restore/${id}`);
  },

  forceDelete(id) {
    return axios.delete(`/articles/delete/${id}`);
  },

  savePrices(prices, article_id) {
    return axios.post(`/articles/${article_id}/prices/save`, prices);
  },

  removePrices(pricesIds, article_id) {
    return axios.post(`/articles/${article_id}/prices/remove`, pricesIds);
  },

  saveCompositionPresets(childArticles, article_id) {
    return axios.post(
      `/articles/${article_id}/compositions/presets/save`,
      childArticles
    );
  },

  removeCompositionPresets(compositionPresetIds, article_id) {
    return axios.post(
      `/articles/${article_id}/compositions/presets/remove`,
      compositionPresetIds
    );
  },

  makeComposition(article_id) {
    return axios.get(`/articles/${article_id}/compositions/make`);
  },

  makeDecomposition(article_id) {
    return axios.delete(`/articles/${article_id}/compositions/decompose`);
  },
};
