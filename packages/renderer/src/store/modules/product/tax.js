import taxService from '../../../services/products/TaxService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  taxes: null,
  hash: null,
  tax: null,
};

// getters
const getters = {
  taxes: (state) => (state.taxes ? JSON.parse(state.taxes) : []),
  tax: (state) => (state.tax ? JSON.parse(state.tax) : null),
};

// privileges
const actions = {
  getTaxesList({ commit, getters }, { page, field }) {
    if (getters.taxes.length > 0) {
      return getters.taxes;
    } else
      return taxService.getList(page, field).then(({ data }) => {
        commit('SET_TAXES', data);
        return data;
      });
  },

  getTax({ getters, commit }, id) {
    const tax = getters.taxes.find((p) => p.id.toString() === id);
    if (tax !== undefined) {
      commit('SET_CURRENT_TAX', tax);
      return tax;
    } else
      return taxService.get(id).then(({ data }) => {
        commit('SET_CURRENT_TAX', data);
        return data;
      });
  },

  addTax({ commit }, taxField) {
    return taxService.add(taxField).then(({ data }) => {
      commit('ADD_TAX', data);
      notify(i18n.global.t('product.tax.store'), 'Ok', 'theme', 'fa fa-check');
      return data;
    });
  },

  updateTax({ commit }, taxField) {
    return taxService.update(taxField, taxField.id).then(({ data }) => {
      notify(i18n.global.t('product.tax.update'), 'Ok', 'theme', 'fa fa-check');
      commit('UPDATE_TAX', data);
      return data;
    });
  },

  deleteTax({ commit }, taxId) {
    return taxService.delete(taxId).then(({ data }) => {
      commit('DELETE_TAX', taxId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_TAXES(state, taxes) {
    state.taxes = JSON.stringify(taxes);
  },
  SET_CURRENT_TAX(state, pack) {
    state.tax = JSON.stringify(pack);
  },
  ADD_TAX(state, pack) {
    let taxes = JSON.parse(state.taxes);
    taxes.push(pack);
    state.taxes = JSON.stringify(taxes);
  },
  UPDATE_TAX(state, pack) {
    let taxes = JSON.parse(state.taxes);
    const index = taxes.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      taxes.splice(index, 1, pack);
      state.taxes = JSON.stringify(taxes);
    }
  },
  DELETE_TAX(state, taxId) {
    state.taxes = JSON.stringify(
      JSON.parse(state.taxes).filter((p) => p.id !== taxId)
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
