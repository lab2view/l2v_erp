import articleService from '../../../services/articles/ArticleService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  articles: null,
  hash: null,
  article: null,
};

// getters
const getters = {
  articles: (state) => (state.articles ? JSON.parse(state.articles) : []),
  article: (state) => (state.article ? JSON.parse(state.article) : null),
  getArticleByProductId: (state, getters) => (product_id) =>
    getters.articles.filter((a) => a.product_id === product_id),
};

// privileges
const actions = {
  getArticlesList({ commit, getters }, { page, field }) {
    if (getters.articles.length > 0) {
      return getters.articles;
    } else
      return articleService.getList(page, field).then(({ data }) => {
        commit('SET_ARTICLES', data);
        return data;
      });
  },

  getArticle({ getters, commit }, id) {
    const article = getters.articles.find((p) => p.id.toString() === id);
    if (article !== undefined) {
      commit('SET_CURRENT_ARTICLE', article);
      return article;
    } else
      return articleService.get(id).then(({ data }) => {
        commit('SET_CURRENT_ARTICLE', data);
        return data;
      });
  },

  addArticle({ commit }, articleField) {
    return articleService.add(articleField).then(({ data }) => {
      commit('ADD_ARTICLE', data);
      notify(i18n.global.t('article.form.store'), 'Ok', 'theme', 'fa fa-check');
      return data;
    });
  },

  updateArticle({ commit }, articleField) {
    return articleService
      .update(articleField, articleField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('article.form.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ARTICLE', data);
        commit('SET_CURRENT_ARTICLE', data);
        return data;
      });
  },

  deleteArticle({ commit }, articleId) {
    return articleService.delete(articleId).then(({ data }) => {
      commit('DELETE_ARTICLE', articleId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_ARTICLES(state, articles) {
    state.articles = JSON.stringify(articles);
  },
  SET_CURRENT_ARTICLE(state, article) {
    state.article = article === null ? null : JSON.stringify(article);
  },
  ADD_ARTICLE(state, article) {
    let articles = JSON.parse(state.articles);
    articles.push(article);
    state.articles = JSON.stringify(articles);
  },
  UPDATE_ARTICLE(state, article) {
    let articles = JSON.parse(state.articles);
    const index = articles.findIndex((p) => p.id === article.id);
    if (index !== -1) {
      articles.splice(index, 1, article);
      state.articles = JSON.stringify(articles);
    }
  },
  DELETE_ARTICLE(state, articleId) {
    state.articles = JSON.stringify(
      JSON.parse(state.articles).filter((p) => p.id !== articleId)
    );
  },
  DELETE_ARTICLE_BY_PRODUCT(state, productId) {
    state.articles = JSON.stringify(
      JSON.parse(state.articles).filter((p) => p.product_id !== productId)
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
