import articleService from '/@/services/articles/ArticleService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';
import { priceTypeCode, unitPackageCode } from '/@/helpers/codes';
import {
  getDistributionCurrentStock,
  getStockByEnterpriseId,
  getStockExitLineArticleStock,
  getWorkspaceTotalArticleStock,
} from '/@/helpers/utils';
import fileService from '/@/services/FileService';
import _ from 'lodash';
import priceService from '/@/services/articles/PriceService';

const state = {
  articles: null,
  article: null,
  operator: null,
  filterStockLevel: 'critical',
  most_sale_articles: [],
};

// getters
const getters = {
  articles: (state) => (state.articles ? JSON.parse(state.articles) : []),
  mostSaleArticles: (state) =>
    state.most_sale_articles ? JSON.parse(state.most_sale_articles) : [],
  getFilterStockLevel: (state) => state.filterStockLevel,
  getArticlesByFilter: (state, getters) => (filter) => {
    return getters.articles.filter((article) => {
      let select = true;
      if (select && filter.product_type_id)
        select = article.product?.product_type_id === filter.product_type_id;
      if (select && filter.product_unit_id)
        select = article.product?.product_unit_id === filter.product_unit_id;
      if (select && filter.package_id)
        select = article.package_id === filter.package_id;
      if (select && filter.sell_price_not_set) {
        select =
          article.prices.find((p) =>
            filter.price_type_id
              ? p.price_type_id === filter.price_type_id
              : p.price_type.code === priceTypeCode.sell
          ) === undefined;
      }

      return select;
    });
  },
  sell_articles: (state, getters, rootState, rootGetters) =>
    getters.articles
      .filter((a) => a.package.code === unitPackageCode)
      .map((a) => {
        let name = `${a.product.reference} - ${a.name}`;
        if (a.product.code) name = `${a.product.code} / ${name}`;
        if (rootGetters['workspace/isWoodinWorkspace'])
          name = `(${(getStockExitLineArticleStock(a) / 6).toFixed(
            2
          )}) ${name}`;
        else name = `(${getStockExitLineArticleStock(a)}) ${name}`;
        return {
          ...a,
          name: name,
        };
      }),
  article: (state) => (state.article ? JSON.parse(state.article) : null),
  getArticleByProductId: (state, getters) => (product_id) =>
    getters.articles.filter((a) => a.product_id === product_id),
  getArticleById: (state, getters) => (id) =>
    getters.articles.find((a) => a.id === id),
  filterAvailableArticles: (state, getters) => (distribution_id) => {
    return getters.articles.filter((a) => {
      if (distribution_id) {
        const distribution = a.stats.distributions.find(
          (d) => d.id === distribution_id
        );
        return distribution !== undefined
          ? getDistributionCurrentStock(distribution) > 0
          : a.stock.available > 0;
      } else return a.stock.available > 0;
    });
  },
  searchArticleByCriteria:
    (state, getters) =>
    ({ product_type_id, product_id, keyword, haveStock, distribution_id }) =>
      (haveStock
        ? getters.filterAvailableArticles(distribution_id)
        : getters.articles
      ).filter((a) => {
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
  getTransformAvailableArticles: (state, getters) => (enterprise_id) => {
    return getters.filterAvailableArticles(enterprise_id).map((art) => {
      const distribution = art.stats.distributions.find(
        (d) => d.id === parseInt(enterprise_id)
      );
      const quantity = distribution
        ? getDistributionCurrentStock(distribution)
        : getStockExitLineArticleStock(art);
      const price = art.prices.find(
        (p) => p.price_type.code === priceTypeCode.sell
      );
      const amount =
        price !== undefined && quantity ? price.value * quantity : '0';
      const buyingPrice = art.prices.find(
        (p) => p.price_type.code === priceTypeCode.buy
      );
      const buyingAmount =
        buyingPrice !== undefined && quantity
          ? buyingPrice.value * quantity
          : '0';
      return {
        id: art.id,
        product_type: art.product?.product_type?.label,
        product_family:
          art.product?.product_type?.product_family?.label ?? null,
        quantity: quantity,
        total_price: parseFloat(amount),
        total_buying_price: parseFloat(buyingAmount),
      };
    });
  },
  getArticleFamilyStatsByEnterpriseId: (state, getters) => (enterprise_id) => {
    return _(getters.getTransformAvailableArticles(enterprise_id))
      .groupBy((sel) => sel.product_family)
      .map((objs, key) => {
        return {
          label: key,
          total: _.sumBy(objs, 'quantity'),
          total_price: _.sumBy(objs, 'total_price'),
          total_buying_price: _.sumBy(objs, 'total_buying_price'),
        };
      })
      .value();
  },
  getArticleTypeStatsByEnterpriseId: (state, getters) => (enterprise_id) => {
    return _(getters.getTransformAvailableArticles(enterprise_id))
      .groupBy((sel) => sel.product_type)
      .map((objs, key) => {
        return {
          label: key,
          total: _.sumBy(objs, 'quantity'),
          total_price: _.sumBy(objs, 'total_price'),
          total_buying_price: _.sumBy(objs, 'total_buying_price'),
        };
      })
      .value();
  },
  getArticleByBarcode: (state, getters) => (barcode) => {
    return getters.articles.find(
      (art) => art.product.code.toString() === barcode.toString()
    );
  },
  getArticleByReference: (state, getters) => (reference) => {
    return getters.articles.find(
      (art) => art.product.reference.toString() === reference.toString()
    );
  },
  filterSaleArticleByTotalAvailableStock: (state, getters) => (stock) => {
    return getters.sell_articles
      .map((article) => {
        return {
          ...article,
          workspace_stock: getWorkspaceTotalArticleStock(article),
        };
      })
      .filter((art) => art.workspace_stock >= stock);
  },
  filterArticleByDistributionStockLevel:
    (state, getters) => (distribution_id) => {
      return getters.articles
        .map((a) => {
          const distribution = a.stats.distributions.find(
            (d) => d.id === distribution_id
          );
          const buyingPrice = a.prices.find(
            (p) => p.price_type.code === priceTypeCode.buy
          );
          return {
            id: a.id,
            name: a.name,
            code: a.product.code,
            reference: a.product.reference,
            product: {
              critical_stock: a.product.critical_stock,
              alert_stock: a.product.alert_stock,
              min_stock: a.product.min_stock,
            },
            stock_quantity:
              distribution !== undefined
                ? getDistributionCurrentStock(distribution)
                : a.stock.available,
            buy_price: buyingPrice !== undefined ? buyingPrice.value : 0,
          };
        })
        .filter((a) => {
          let level = 0;
          let downLevel = 0;
          switch (getters.getFilterStockLevel) {
            case 'critical':
              level = a.product.critical_stock;
              break;
            case 'alert':
              level = a.product.alert_stock;
              downLevel = a.product.critical_stock;
              break;
            case 'min':
              level = a.product.min_stock;
              downLevel = a.product.alert_stock;
              break;
          }
          if (downLevel !== 0)
            return a.stock_quantity > downLevel && a.stock_quantity <= level;
          else return a.stock_quantity <= level;
        });
    },
  getStatsCountByArticleStockLevel: (state, getters) => (distribution_id) => {
    const articles = getters.articles.map((a) => {
      const distribution = a.stats.distributions.find(
        (d) => d.id === distribution_id
      );
      const stock =
        distribution !== undefined
          ? getDistributionCurrentStock(distribution)
          : a.stock.available;
      return {
        critical: stock <= a.product.critical_stock,
        alert:
          stock > a.product.critical_stock && stock <= a.product.alert_stock,
        min: stock > a.product.alert_stock && stock <= a.product.min_stock,
      };
    });
    return {
      min: _.sumBy(articles, 'min'),
      alert: _.sumBy(articles, 'alert'),
      critical: _.sumBy(articles, 'critical'),
    };
  },
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

          dispatch(
            'setGlobalProgress',
            {
              label: 'articles',
              min: 0,
              max: data.last_page,
              value: data.current_page,
            },
            { root: true }
          );

          if (data.next_page_url) {
            return dispatch('getArticlesList', {
              page: page + 1,
              field: { ...field, next: true },
            });
          } else dispatch('setGlobalProgress', null, { root: true });

          return data;
        })
        .catch((error) => {
          commit('SET_ARTICLES', []);
          return Promise.reject(error);
        });
    }
  },

  getMostSaleArticlesList({ commit, getters }, { page, field }) {
    if (getters.mostSaleArticles > 0 && !field.next) {
      return state.most_sale_articles;
    } else
      return articleService.getMostSales(page, field).then(({ data }) => {
        commit('SET_MOST_SALE_ARTICLES', data);
        return data;
      });
  },

  getArticleByStockCrossing(
    { getters },
    { source_enterprise_id, target_enterprise_id, quantity, is_existing }
  ) {
    return Promise.all(
      getters.articles
        .filter((article) => {
          const sourceStock = getStockByEnterpriseId(
            source_enterprise_id,
            article
          );
          const targetStock = getStockByEnterpriseId(
            target_enterprise_id,
            article
          );
          return (
            sourceStock >= parseInt(quantity) &&
            (is_existing ? targetStock === 0 : targetStock < quantity)
          );
        })
        .map((art) => {
          return {
            code: art.product.code,
            reference: art.product.reference,
            name: art.name,
            sourceStock: getStockByEnterpriseId(source_enterprise_id, art),
            targetStock: getStockByEnterpriseId(target_enterprise_id, art),
            unitName: art.product.product_unit.label,
          };
        })
    );
  },

  getSaleArticleByWorkspaceStock({ getters, state }, stock) {
    return getters.sell_articles
      .map((article) => {
        return {
          ...article,
          workspace_stock: getWorkspaceTotalArticleStock(article),
        };
      })
      .filter((art) =>
        state.operator === '<='
          ? art.workspace_stock <= stock
          : state.operator === '==='
          ? art.workspace_stock === stock
          : art.workspace_stock >= stock
      );
  },

  searchArticles(context, { page, field }) {
    return articleService.getList(page, field);
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
  updateOrCreatePrices(context, priceFields) {
    return priceService.updateOrCreate({ prices: priceFields });
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

  addImages({ commit }, { article_id, formData }) {
    return fileService
      .addArticleImages(article_id, formData)
      .then(({ data }) => {
        commit('UPDATE_ARTICLE', data);
      });
  },
  setArticleMediaAsCover({ commit }, { article_id, media_id }) {
    return fileService
      .setArticleImageAsCover(article_id, media_id)
      .then(({ data }) => {
        commit('UPDATE_ARTICLE', data);
      });
  },
  deleteImages({ commit }, { article_id, mediaIds }) {
    return fileService
      .removeArticleImages(article_id, {
        media_ids: [...mediaIds],
      })
      .then(({ data }) => {
        commit('UPDATE_ARTICLE', data);
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
  SET_MOST_SALE_ARTICLES(state, { data }) {
    state.most_sale_articles = JSON.stringify(data);
  },
  SET_SEARCH_ARTICLES(state, { data }) {
    state.search_results = data?.length ? JSON.stringify(data) : null;
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
  UPDATE_OPERATOR(state, operator) {
    state.operator = operator;
  },
  SET_FILTER_STOCK_LEVEL(state, filterStockLevel) {
    state.filterStockLevel = filterStockLevel;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
