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
  discounts: (state) =>
    state.discounts
      ? JSON.parse(state.discounts)
      : [],
  discount: (state) =>
    state.discount
      ? JSON.parse(state.discount)
      : null,
};

// privileges
const actions = {
  getDiscountsList({ commit, getters }, { page, field }) {
    if (getters.discounts.length > 0) {
      return getters.discounts;
    } else
      return discountService
        .getDiscountsList(page, field)
        .then(({ data }) => {
          commit('SET_DISCOUNTS', data);
          return data;
        });
  },

  getDiscount({ getters }, id) {
    const discount = getters.discounts.find(
      (p) => p.id.toString() === id
    );
    if (discount !== undefined) {
      return discount;
    } else
      return discountService
        .getDiscount(id)
        .then(({ data }) => {
          return data;
        });
  },

  addDiscount({ commit }, discountField) {
    return discountService
      .addDiscount(discountField)
      .then(({ data }) => {
        commit('ADD_DISCOUNT', data);
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
      .updateDiscount(
        discountField,
        discountField.id
      )
      .then(({ data }) => {
        commit('UPDATE_DISCOUNT', data);
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
    return discountService
      .deleteDiscount(discountId)
      .then(({ data }) => {
        commit('DELETE_DISCOUNT', discountId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_DISCOUNTS(state, discounts) {
    state.discounts = JSON.stringify(discounts);
  },
  ADD_DISCOUNT(state, discount) {
    let discounts = JSON.parse(state.discounts);
    discounts.push(discount);
    state.discounts = JSON.stringify(discounts);
  },
  UPDATE_DISCOUNT(state, discount) {
    let discounts = JSON.parse(state.discounts);
    const index = discounts.findIndex(
      (p) => p.id === discount.id
    );
    if (index !== -1) {
      discounts.splice(index, 1, discount);
      state.discounts = JSON.stringify(discounts);
    }
  },
  DELETE_DISCOUNT(state, discountId) {
    state.discounts = JSON.stringify(
      JSON.parse(state.discounts).filter(
        (p) => p.id !== discountId
      )
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
