import articleService from '../../../services/articles/ArticleService';
import { notify } from '/@/helpers/notify.js';
import i18n from '../../../i18n';
import { unitPackageCode } from '/@/helpers/codes.js';
import { getStockExitLineArticleStock } from '/@/helpers/utils.js';

const state = {
  articles: null,
  article: null,
};

// getters
const getters = {
  articles: (state) => (state.articles ? JSON.parse(state.articles) : []),
  sell_articles: (state, getters) =>
    getters.articles
      .filter((a) => a.package.code === unitPackageCode)
      .map((a) => {
        return {
          ...a,
          name: `(${(getStockExitLineArticleStock(a) / 6).toFixed(2)}) ${
            a.product.code
          } / ${a.product.reference} - ${a.name}`,
        };
      }),
  article: (state) => (state.article ? JSON.parse(state.article) : null),
  getArticleByProductId: (state, getters) => (product_id) =>
    getters.articles.filter((a) => a.product_id === product_id),
  getArticleById: (state, getters) => (id) =>
    getters.articles.find((a) => a.id === id),
  searchArticleByCriteria:
    (state, getters) =>
    ({ product_type_id, product_id, keyword }) =>
      getters.articles.filter((a) => {
        let result = true;
        if (getters.article?.id) result = a.id !== getters.article.id;
        if (product_type_id)
          result = a.product.product_type_id === product_type_id;
        if (product_id) result = a.product_id === product_id;
        if (keyword) {
          result = RegExp(`${keyword.toString().toUpperCase()}*`).test(
            `${a.name.toString().toUpperCase()} ${a.product.reference} ${
              a.product.code
            }`
          );
        }
        return result;
      }),
};
// privileges
const actions = {
  getArticlesList({ commit, getters, dispatch }, { page, field }) {
    if (getters.articles.length > 0 && !field.next) {
      return getters.articles;
    } else {
      return articleService
        .getList(page, { ...field, paginate: 50 })
        .then(({ data }) => {
          commit('SET_ARTICLES', data);
          if (data.next_page_url) {
            return dispatch('getArticlesList', {
              page: page + 1,
              field: { ...field, next: true },
            });
          }
          return data;
        })
        .catch((error) => {
          commit('SET_ARTICLES', []);
          Promise.reject(error);
        });
    }
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
      notify(
        i18n.global.t('articles.form.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateArticle({ commit }, articleField) {
    return articleService
      .update(articleField, articleField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('articles.form.update'),
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

  addPrices({ getters, commit }, prices) {
    return articleService
      .addPrices(prices, getters.article.id)
      .then(({ data }) => {
        commit('ADD_PRICES', data.prices);
      });
  },

  updatePrice({ commit }, price) {
    return articleService.updatePrice(price).then(({ data }) => {
      commit('UPDATE_PRICE', data);
      notify(
        i18n.global.t('articles.detail.price.update'),
        'Ok',
        'theme',
        'fa fa-check'
      );
    });
  },

  removePrices({ getters, commit }, pricesIds) {
    return articleService
      .removePrices(
        {
          price_ids: [...pricesIds],
        },
        getters.article.id
      )
      .then(() => {
        commit('REMOVE_PRICES', pricesIds);
      });
  },

  addCompositionPresets({ getters, commit }, articles) {
    return articleService
      .addCompositionPresets(articles, getters.article.id)
      .then(({ data }) => {
        commit('ADD_COMPOSITION_PRESETS', data.composition_presets);
      });
  },

  updateCompositionPreset({ commit }, compositionPreset) {
    return articleService
      .updateCompositionPreset(compositionPreset)
      .then(({ data }) => {
        commit('UPDATE_COMPOSITION_PRESET', data);
        notify(
          i18n.global.t('articles.detail.composition.config.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },

  removeCompositionPresets({ getters, commit }, compositionPresetIds) {
    return articleService
      .removeCompositionPresets(
        {
          composition_preset_ids: [...compositionPresetIds],
        },
        getters.article.id
      )
      .then(() => {
        commit('REMOVE_COMPOSITION_PRESETS', compositionPresetIds);
      });
  },

  makeComposition({ commit }, article) {
    return articleService.makeComposition(article.id).then(({ data }) => {
      commit('ADD_COMPOSITIONS', data.compositions);
    });
  },

  makeDecomposition({ commit }, article) {
    return articleService.makeDecomposition(article.id).then(({ data }) => {
      commit('MAKE_DECOMPOSITION', data.lot);
    });
  },
};

// mutations
const mutations = {
  SET_ARTICLES(state, { current_page, data }) {
    if (current_page === 1) state.articles = JSON.stringify(data);
    else {
      let oldArticles = state.articles ? JSON.parse(state.articles) : [];
      state.articles = JSON.stringify([...oldArticles, ...data]);
    }
  },
  SET_CURRENT_ARTICLE(state, article) {
    state.article = article === null ? null : JSON.stringify(article);
  },
  ADD_ARTICLE(state, article) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    articles.push(article);
    state.articles = JSON.stringify(articles);
  },
  UPDATE_ARTICLE(state, article) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    const index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      articles.splice(index, 1, article);
      state.articles = JSON.stringify(articles);
    }
  },
  UPDATE_ARTICLE_STOCK(state, article) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    const index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      articles.splice(index, 1, { ...articles[index], stock: article.stock });
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

  ADD_PRICES(state, prices) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      article.prices = [...article.prices, ...prices];
      articles.splice(index, 1, article);
      state.article = JSON.stringify(article);
      state.articles = JSON.stringify(articles);
    }
  },
  UPDATE_PRICE(state, price) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      let p = article.prices.findIndex((p) => p.id === price.id);
      if (p !== -1) {
        article.prices.splice(p, 1, price);
        articles.splice(index, 1, article);
        state.article = JSON.stringify(article);
        state.articles = JSON.stringify(articles);
      }
    }
  },
  REMOVE_PRICES(state, prices) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      article.prices = article.prices.filter((ap) => {
        return prices.find((p) => p === ap.id) === undefined;
      });
      articles.splice(index, 1, article);
      state.article = JSON.stringify(article);
      state.articles = JSON.stringify(articles);
    }
  },

  ADD_COMPOSITION_PRESETS(state, composition_presets) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      article.composition_presets = [
        ...article.composition_presets,
        ...composition_presets,
      ];
      articles.splice(index, 1, article);
      state.article = JSON.stringify(article);
      state.articles = JSON.stringify(articles);
    }
  },
  UPDATE_COMPOSITION_PRESET(state, compositionPreset) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      let art = article.composition_presets.findIndex(
        (p) => p.id === compositionPreset.id
      );
      if (art !== -1) {
        article.composition_presets.splice(art, 1, compositionPreset);
        articles.splice(index, 1, article);
        state.article = JSON.stringify(article);
        state.articles = JSON.stringify(articles);
      }
    }
  },
  REMOVE_COMPOSITION_PRESETS(state, composition_presets_ids) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      article.composition_presets = article.composition_presets.filter((cp) => {
        return composition_presets_ids.find((p) => p === cp.id) === undefined;
      });
      articles.splice(index, 1, article);
      state.article = JSON.stringify(article);
      state.articles = JSON.stringify(articles);
    }
  },

  ADD_COMPOSITIONS(state, compositions) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      article.compositions = [...article.compositions, ...compositions];
      article.stock.total_entry_composition++;
      compositions.forEach((cp) => {
        let ind = articles.findIndex((a) => a.id === cp.child_article_id);
        if (ind !== -1)
          articles[ind].stock.total_exit_composition =
            parseInt(articles[ind].stock.total_exit_composition) +
            parseInt(cp.quantity);
      });
      articles.splice(index, 1, article);
      state.article = JSON.stringify(article);
      state.articles = JSON.stringify(articles);
    }
  },

  MAKE_DECOMPOSITION(state, lot) {
    let articles = state.articles ? JSON.parse(state.articles) : [];
    let article = JSON.parse(state.article);
    let index = articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      const compositions = article.compositions.filter((c) => c.lot === lot);
      article.compositions = article.compositions.filter((c) => c.lot !== lot);
      article.stock.total_entry_composition--;
      if (compositions !== undefined) {
        compositions.forEach((cp) => {
          let ind = articles.findIndex((a) => a.id === cp.child_article_id);
          if (ind !== -1)
            articles[ind].stock.total_exit_composition =
              parseInt(articles[ind].stock.total_exit_composition) -
              parseInt(cp.quantity);
        });
      }
      articles.splice(index, 1, article);
      state.article = JSON.stringify(article);
      state.articles = JSON.stringify(articles);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
