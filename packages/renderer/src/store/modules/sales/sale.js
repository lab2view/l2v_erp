import saleService from '/@/services/sales/SaleService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  sales: [],
  sale: null,
};

// getters
const getters = {
  sales: (state) => state.sales,
  getSaleById: (state) => (id) => state.sales.find((s) => s.id === id) ?? null,
  getSaleBySessionId: (state) => (id) =>
    state.sales.find((s) => s.cashier_session_id === id),
};

// privileges
const actions = {
  getSalesList({ commit, getters }, { page, field }) {
    if (getters.sales.length > 0) {
      return getters.sales;
    }
    return saleService.getSalesList(page, field).then(({ data }) => {
      commit('SET_SALES', data);
      return data;
    });
  },

  getSale({ commit, getters }, id) {
    const sale = getters.getSaleById(id);
    if (sale !== undefined) {
      commit('SET_CURRENT_SALE', sale);
      return sale;
    }
    return saleService.getSale(id).then(({ data }) => {
      commit('SET_CURRENT_SALE', data);
      return data;
    });
  },

  updateSale({ commit }, saleField) {
    return saleService.updateSale(saleField, saleField.id).then(({ data }) => {
      commit('UPDATE_SALE', data);
      notify(i18n.global.t('sales.sale.update'), 'Ok', 'theme', 'fa fa-check');
      return data;
    });
  },

  deleteSale({ commit }, saleId) {
    return saleService.deleteSale(saleId).then(({ data }) => {
      commit('DELETE_SALE', saleId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_SALES(state, sales) {
    state.sales = sales;
  },
  SET_CURRENT_SALE(state, sale) {
    state.sale = sale;
  },
  ADD_SALE(state, sale) {
    state.sales.push(sale);
  },
  UPDATE_SALE(state, sale) {
    const index = state.sales.findIndex((p) => p.id === sale.id);
    if (index !== -1) {
      state.sales.splice(index, 1, sale);
    }
  },
  DELETE_SALE(state, saleId) {
    state.sales = state.sales.filter((p) => p.id !== saleId);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
