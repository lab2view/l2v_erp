import saleService from '/@/services/sales/SaleService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  sales: [],
  sale: null,
  cashier_sales: [],
  cashier_sale: null,
};

// getters
const getters = {
  sales: (state) => state.sales,
  cashier_sales: (state) => state.cashier_sales,
  getSaleById: (state) => (id) => state.sales.find((s) => s.id === id) ?? null,
  getCashierSaleById: (state) => (id) =>
    state.cashier_sales.find((s) => s.id === id) ?? null,
  getSaleByCashierId: (state) => (id) =>
    state.sales.filter((s) => s.cashier_session.cashier_id === id),
  cashierSale: (state) => state.cashier_sale,
};

// privileges
const actions = {
  getCashierSaleList({ commit, getters }, { keyword, cashier_id, search }) {
    if (getters.cashier_sales.length && !search) return getters.cashier_sales;
    else
      return saleService
        .getSalesList(1, { keyword, cashier_id, limit: 5 })
        .then(({ data }) => {
          commit('SET_CASHIER_SALES', data);
          return data;
        });
  },
  getSalesList({ commit, getters, dispatch }, { page, field }) {
    if (getters.sales.length > 0 && !field.next) {
      return getters.sales;
    }
    return saleService
      .getSalesList(page, { ...field, paginate: 50 })
      .then(({ data }) => {
        commit('SET_SALES', data);
        dispatch(
          'setGlobalProgress',
          {
            label: 'sales',
            min: 0,
            max: data.last_page,
            value: data.current_page,
          },
          { root: true }
        );

        if (data.next_page_url) {
          return dispatch('getSalesList', {
            page: page + 1,
            field: { ...field, next: true },
          });
        } else dispatch('setGlobalProgress', null, { root: true });

        return data;
      });
  },

  getSale({ commit, getters }, id) {
    const sale = getters.getSaleById(id);
    if (sale) {
      commit('SET_CURRENT_SALE', sale);
      return sale;
    }
    return saleService.getSale(id).then(({ data }) => {
      commit('SET_CURRENT_SALE', data);
      return data;
    });
  },

  getCashierSale({ commit, getters }, id) {
    const sale = getters.getCashierSaleById(id);
    if (sale) {
      commit('SET_CURRENT_CASHIER_SALE', sale);
      return sale;
    }
    return saleService.getSale(id).then(({ data }) => {
      commit('SET_CURRENT_CASHIER_SALE', data);
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
  SET_SALES(state, { current_page, data }) {
    state.sales = current_page === 1 ? data : [...state.sales, ...data];
  },
  SET_CASHIER_SALES(state, cashier_sales) {
    state.cashier_sales = cashier_sales;
  },
  SET_CURRENT_SALE(state, sale) {
    state.sale = sale;
  },
  SET_CURRENT_CASHIER_SALE(state, cashier_sale) {
    state.cashier_sale = cashier_sale;
  },
  ADD_CASHIER_SALE(state, sale) {
    state.cashier_sales.push(sale);
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
