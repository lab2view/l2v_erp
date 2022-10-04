import discountTypeService from '../../../services/sales/DiscountTypeService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  discountTypes: null,
  hash: null,
  discountType: null,
};

// getters
const getters = {
  discountTypes: (state) =>
    state.discountTypes ? JSON.parse(state.discountTypes) : [],
  discountType: (state) =>
    state.discountType ? JSON.parse(state.discountType) : null,
};

// privileges
const actions = {
  getDiscountTypesList({ commit, getters }, { page, field }) {
    if (getters.discountTypes.length > 0 && !field.next) {
      return getters.discountTypes;
    }
    return discountTypeService
      .getDiscountTypesList(page, field)
      .then(({ data }) => {
        commit('SET_DISCOUNT_TYPES', data);
        return data;
      });
  },

  getDiscountType({ commit, getters }, id) {
    const discountType = getters.discountTypes.find(
      (p) => p.id.toString() === id
    );
    if (discountType !== undefined) {
      commit('SET_CURRENT_DISCOUNT_TYPE', discountType);
      return discountType;
    }
    return discountTypeService.getDiscountType(id).then(({ data }) => {
      commit('SET_CURRENT_DISCOUNT_TYPE', data);
      return data;
    });
  },

  addDiscountType({ commit }, discountTypeField) {
    return discountTypeService
      .addDiscountType(discountTypeField)
      .then(({ data }) => {
        commit('ADD_DISCOUNT_TYPE', data);
        notify(
          i18n.global.t('sales.discountType.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateDiscountType({ commit }, discountTypeField) {
    return discountTypeService
      .updateDiscountType(discountTypeField, discountTypeField.id)
      .then(({ data }) => {
        commit('UPDATE_DISCOUNT_TYPE', data);
        notify(
          i18n.global.t('sales.discountType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteDiscountType({ commit }, discountTypeId) {
    return discountTypeService
      .deleteDiscountType(discountTypeId)
      .then(({ data }) => {
        commit('DELETE_DISCOUNT_TYPE', discountTypeId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_DISCOUNT_TYPES(state, discountTypes) {
    state.discountTypes = JSON.stringify(discountTypes);
  },
  SET_CURRENT_DISCOUNT_TYPE(state, discountType) {
    state.discountType = JSON.stringify(discountType);
  },
  ADD_DISCOUNT_TYPE(state, discountType) {
    let discountTypes = JSON.parse(state.discountTypes);
    discountTypes.push(discountType);
    state.discountTypes = JSON.stringify(discountTypes);
  },
  UPDATE_DISCOUNT_TYPE(state, discountType) {
    let discountTypes = JSON.parse(state.discountTypes);
    const index = discountTypes.findIndex((p) => p.id === discountType.id);
    if (index !== -1) {
      discountTypes.splice(index, 1, discountType);
      state.discountTypes = JSON.stringify(discountTypes);
    }
  },
  DELETE_DISCOUNT_TYPE(state, discountTypeId) {
    state.discountTypes = JSON.stringify(
      JSON.parse(state.discountTypes).filter((p) => p.id !== discountTypeId)
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
