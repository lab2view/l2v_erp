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
    state.discountCodes ? JSON.parse(state.discountCodes) : [],
  getDiscountCodeByDiscountId: (state, getters) => (id) =>
    getters.discountCodes.filter((dc) => dc.discount_id === id),
  discountCode: (state) =>
    state.discountCode ? JSON.parse(state.discountCode) : null,
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
    return discountCodeService.generateCode(fields).then(({ data }) => {
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

  deleteDiscountCodes({ commit }, discountCodeId) {
    return discountCodeService
      .removeDiscountCode(discountCodeId)
      .then(({ data }) => {
        commit('DELETE_DISCOUNT_CODE', discountCodeId);
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
    state.discountCodes = JSON.stringify([...discountCodes, ...discount_codes]);
  },
  DELETE_DISCOUNT_CODE(state, discountCodeId) {
    state.discountCodes = JSON.stringify(
      JSON.parse(state.discountCodes).filter((d) => d.id !== discountCodeId)
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
