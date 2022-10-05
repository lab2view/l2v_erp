import saleTypeService from '../../../services/sales/SaleTypeService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  saleTypes: null,
  hash: null,
  saleType: null,
};

// getters
const getters = {
  saleTypes: (state) => (state.saleTypes ? JSON.parse(state.saleTypes) : []),
  saleType: (state) => (state.saleType ? JSON.parse(state.saleType) : null),
};

// privileges
const actions = {
  getSaleTypesList({ commit, getters }, { page, field }) {
    if (getters.saleTypes.length > 0 && !field.next) {
      return getters.saleTypes;
    }
    return saleTypeService.getSaleTypesList(page, field).then(({ data }) => {
      commit('SET_SALE_TYPES', data);
      return data;
    });
  },

  getSaleType({ commit, getters }, id) {
    const saleType = getters.saleTypes.find((p) => p.id.toString() === id);
    if (saleType !== undefined) {
      commit('SET_CURRENT_SALE_TYPE', saleType);
      return saleType;
    }
    return saleTypeService.getSaleType(id).then(({ data }) => {
      commit('SET_CURRENT_SALE_TYPE', data);
      return data;
    });
  },

  addSaleType({ commit }, saleTypeField) {
    return saleTypeService.addSaleType(saleTypeField).then(({ data }) => {
      commit('ADD_SALE_TYPE', data);
      notify(
        i18n.global.t('sales.saleType.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateSaleType({ commit }, saleTypeField) {
    return saleTypeService
      .updateSaleType(saleTypeField, saleTypeField.id)
      .then(({ data }) => {
        commit('UPDATE_SALE_TYPE', data);
        notify(
          i18n.global.t('sales.saleType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteSaleType({ commit }, saleTypeId) {
    return saleTypeService.deleteSaleType(saleTypeId).then(({ data }) => {
      commit('DELETE_SALE_TYPE', saleTypeId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_SALE_TYPES(state, saleTypes) {
    state.saleTypes = JSON.stringify(saleTypes);
  },
  SET_CURRENT_SALE_TYPE(state, saleType) {
    state.saleType = JSON.stringify(saleType);
  },
  ADD_SALE_TYPE(state, saleType) {
    let saleTypes = JSON.parse(state.saleTypes);
    saleTypes.push(saleType);
    state.saleTypes = JSON.stringify(saleTypes);
  },
  UPDATE_SALE_TYPE(state, saleType) {
    let saleTypes = JSON.parse(state.saleTypes);
    const index = saleTypes.findIndex((p) => p.id === saleType.id);
    if (index !== -1) {
      saleTypes.splice(index, 1, saleType);
      state.saleTypes = JSON.stringify(saleTypes);
    }
  },
  DELETE_SALE_TYPE(state, saleTypeId) {
    state.saleTypes = JSON.stringify(
      JSON.parse(state.saleTypes).filter((p) => p.id !== saleTypeId)
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
