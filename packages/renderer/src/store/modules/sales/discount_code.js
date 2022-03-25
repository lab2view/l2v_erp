import discountCodeService from '../../../services/sales/DiscountCodeService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  discountCodes: null,
  hash: null,
  discountCode: null,
};

// getters
const getters = {
  discountCodes: (state) =>
    state.discountCodes
      ? JSON.parse(state.discountCodes)
      : [],
  discountCode: (state) =>
    state.discountCode
      ? JSON.parse(state.discountCode)
      : null,
};

// privileges
const actions = {
  getDiscountCodesList({ commit, getters }, { page, field }) {
    if (getters.discountCodes.length > 0) {
      return getters.discountCodes;
    }
    return discountCodeService
      .getDiscountCodesList(page, field)
      .then(({ data }) => {
        commit('SET_DISCOUNT_CODES', data);
        return data;
      });
  },

  generateCodes({ commit }, fields) {
    return discountCodeService
      .generateCode(fields)
      .then(({ data }) => {
        commit('ADD_DISCOUNT_CODES', data);
        notify(
          i18n.global.t('sales.discountCode.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteDiscountCodes({ commit }, discountCodeIds) {
    return discountCodeService
      .deleteDiscountCodes(discountCodeIds)
      .then(({ data }) => {
        commit('DELETE_DISCOUNT_CODES', discountCodeIds);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_DISCOUNT_CODES(state, discountCodes) {
    state.discountCodes = JSON.stringify(discountCodes);
  },
  ADD_DISCOUNT_CODES(state, discount_codes) {
    let discountCodes = JSON.parse(state.discountCodes);
    const discountCodesLength = discount_codes?.length ?? 0;
    for (let i = 0; i < discountCodesLength; i++) {
      discountCodes.push(discount_codes[i]);
    }
    state.discountCodes = JSON.stringify(discountCodes);
  },
  DELETE_DISCOUNT_CODES(state, discountCodeIds) {
    state.discountCodes = JSON.stringify(
      JSON.parse(state.discountCodes).filter(
        (p) => ! discountCodeIds.includes(p.id)
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
