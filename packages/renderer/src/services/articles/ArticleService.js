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

  addPrices(prices, article_id) {
    return axios.post(`/articles/${article_id}/prices/add`, prices);
  },

  updatePrice(price) {
    return axios.put(`/articles/prices/${price.id}/update`, price);
  },

  removePrices(pricesIds, article_id) {
    return axios.post(`/articles/${article_id}/prices/remove`, pricesIds);
  },

  addCompositionPresets(childArticles, article_id) {
    return axios.post(
      `/articles/${article_id}/compositions/presets/add`,
      childArticles
    );
  },

  updateCompositionPreset(compositionPreset) {
    return axios.put(
      `/articles/compositions/presets/${compositionPreset.id}/update`,
      compositionPreset
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
