import discountService from '../../../services/sales/DiscountService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  discounts: null,
  hash: null,
  discount: null,
};

// getters
const getters = {
  discounts: (state) => (state.discounts ? JSON.parse(state.discounts) : []),
  discount: (state) => (state.discount ? JSON.parse(state.discount) : null),
  haveDiscount: (state, getters) => !!getters.discount,
  getSalesHash: (state) => state.hash ?? null,
  getDiscountByCustomerId: (state, getters) => (customer_id) =>
    getters.discounts.filter(
      (d) =>
        d.discount_customers.find((dc) => dc.customer_id === customer_id) !==
        undefined
    ),
  getDiscountByCode: (state, getters) => (code) =>
    getters.discounts.find(
      (d) =>
        d.discount_codes.find(
          (dc) =>
            dc.code.toString().toLowerCase() === code.toString().toLowerCase()
        ) !== undefined
    ),
};

// privileges
const actions = {
  getDiscountsList({ commit, getters }, { page, field }) {
    if (getters.discounts.length > 0) {
      return getters.discounts;
    }
    return discountService.getDiscountsList(page, field).then(({ data }) => {
      commit('SET_DISCOUNTS', data);
      return data;
    });
  },

  getDiscount({ commit, getters }, id) {
    const discount = getters.discounts.find((p) => p.id.toString() === id);
    if (discount !== undefined) {
      commit('SET_CURRENT_DISCOUNT', discount);
      return discount;
    }

    return discountService.getDiscount(id).then(({ data }) => {
      commit('SET_CURRENT_DISCOUNT', data);
      return data;
    });
  },

  addDiscount({ commit }, discountField) {
    return discountService.addDiscount(discountField).then(({ data }) => {
      commit('ADD_DISCOUNT', data);
      commit('SET_CURRENT_DISCOUNT', data);
      notify(
        i18n.global.t('sales.discount.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateDiscount({ commit }, discountField) {
    return discountService
      .updateDiscount(discountField, discountField.id)
      .then(({ data }) => {
        commit('UPDATE_DISCOUNT', data);
        commit('SET_CURRENT_DISCOUNT', data);
        notify(
          i18n.global.t('sales.discount.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteDiscount({ commit }, discountId) {
    return discountService.deleteDiscount(discountId).then(({ data }) => {
      commit('DELETE_DISCOUNT', discountId);
      return data;
    });
  },

  addArticles({ commit }, { articles, discount }) {
    return discountService
      .addArticles(articles, discount.id)
      .then(({ data }) => {
        commit('ADD_DISCOUNT_ARTICLES', data.discountArticles);
        return data;
      });
  },

  addCustomers({ commit }, { customers, discount }) {
    return discountService
      .addCustomers(customers, discount.id)
      .then(({ data }) => {
        commit('ADD_DISCOUNT_CUSTOMERS', data.discount_customers);
        return data;
      });
  },

  removeArticleDiscounts({ state, commit }, discountArticleIds) {
    let discount = JSON.parse(state.discount);
    return discountService
      .removeArticleDiscounts(discountArticleIds, discount.id)
      .then(({ data }) => {
        commit('DELETE_DISCOUNT_ARTICLES', { discount, discountArticleIds });
        return data;
      });
  },

  removeDiscountCustomers({ state, commit }, discountCustomerIds) {
    let discount = JSON.parse(state.discount);
    return discountService
      .removeDiscountCustomers(discountCustomerIds, discount.id)
      .then(({ data }) => {
        commit('DELETE_DISCOUNT_CUSTOMERS', { discount, discountCustomerIds });
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_SALES_HASH(state, hash) {
    state.hash = hash;
  },
  SET_DISCOUNTS(state, discounts) {
    state.discounts = JSON.stringify(discounts);
  },
  SET_CURRENT_DISCOUNT(state, discount) {
    state.discount = JSON.stringify(discount);
  },
  ADD_DISCOUNT(state, discount) {
    let discounts = JSON.parse(state.discounts);
    discounts.push(discount);
    state.discounts = JSON.stringify(discounts);
  },
  UPDATE_DISCOUNT(state, discount) {
    let discounts = JSON.parse(state.discounts);
    const index = discounts.findIndex((p) => p.id === discount.id);
    if (index !== -1) {
      discounts.splice(index, 1, discount);
      state.discounts = JSON.stringify(discounts);
    }
    state.discount = JSON.stringify(discount);
  },
  ADD_DISCOUNT_CUSTOMERS(state, discountCustomers) {
    let discount = JSON.parse(state.discount);
    let discount_customers = discount.discount_customers ?? [];
    if (discount_customers.length) {
      let articles = discount_customers.map((ad) => ad.article_id);
      let discountCustomersLength = discountCustomers.length;
      for (let i = 0; i < discountCustomersLength; i++) {
        if (!articles.includes(discountCustomers[i].article_id)) {
          discount_customers.push(discountCustomers[i]);
        }
      }
    } else {
      discount_customers = discountCustomers;
    }

    let discounts = JSON.parse(state.discounts);
    const index = discounts.findIndex((p) => p.id === discount.id);
    discount.discount_customers = discount_customers;
    if (index !== -1) {
      discounts.splice(index, 1, discount);
      state.discounts = JSON.stringify(discounts);
    }
    state.discount = JSON.stringify(discount);
  },
  ADD_DISCOUNT_ARTICLES(state, discountArticles) {
    let discount = JSON.parse(state.discount);
    let discount_articles = discount.discount_articles ?? [];
    if (discount_articles.length) {
      let articles = discount_articles.map((ad) => ad.article_id);
      let discountArticlesLength = discountArticles.length;
      for (let i = 0; i < discountArticlesLength; i++) {
        if (!articles.includes(discountArticles[i].article_id)) {
          discount_articles.push(discountArticles[i]);
        }
      }
    } else {
      discount_articles = discountArticles;
    }

    let discounts = JSON.parse(state.discounts);
    const index = discounts.findIndex((p) => p.id === discount.id);
    discount.discount_articles = discount_articles;
    if (index !== -1) {
      discounts.splice(index, 1, discount);
      state.discounts = JSON.stringify(discounts);
    }
    state.discount = JSON.stringify(discount);
  },
  DELETE_DISCOUNT_ARTICLES(state, { discount, discountArticleIds }) {
    let discounts = JSON.parse(state.discounts);
    const index = discounts.findIndex((p) => p.id === discount.id);

    if (discount && discount.id) {
      discount.discount_articles =
        discount.discount_articles?.filter(
          (ad) => !discountArticleIds.includes(ad.id)
        ) ?? [];

      if (index !== -1) {
        discounts.splice(index, 1, discount);
        state.discounts = JSON.stringify(discounts);
      }
      state.discount = JSON.stringify(discount);
    }
  },
  DELETE_DISCOUNT_CUSTOMERS(state, { discount, discountCustomerIds }) {
    let discounts = JSON.parse(state.discounts);
    const index = discounts.findIndex((p) => p.id === discount.id);

    if (discount && discount.id) {
      discount.discount_customers =
        discount.discount_customers?.filter(
          (ad) => !discountCustomerIds.includes(ad.id)
        ) ?? [];

      if (index !== -1) {
        discounts.splice(index, 1, discount);
        state.discounts = JSON.stringify(discounts);
      }
      state.discount = JSON.stringify(discount);
    }
  },
  DELETE_DISCOUNT(state, discountId) {
    state.discounts = JSON.stringify(
      JSON.parse(state.discounts).filter((p) => p.id !== discountId)
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
