import saleService from '/@/services/sales/SaleService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';
import _ from 'lodash';
import { priceTypeCode } from '/@/helpers/codes';

const state = {
  sales: [],
  sale: null,
  cashier_sales: [],
  cashier_sale: null,
  request_field: {
    enterprise_id: null,
    cashier_id: null,
    sale_type_id: null,
    customer_id: null,
    created_at: null,
    keyword: null,
  },
};

// getters
const getters = {
  sales: (state) => state.sales,
  sale: (state) => state.sale,
  cashier_sales: (state) => state.cashier_sales,
  getCashierSaleById: (state) => (id) =>
    state.cashier_sales.find((s) => s.id === id) ?? null,
  getSaleByCashierId: (state) => (id) =>
    state.sales.filter((s) => s.cashier_session.cashier_id === id),
  cashierSale: (state) => state.cashier_sale,
  requestField: (state) => state.request_field,
  getSelectedSaleList: (state, getters) => {
    return getters.sales.map((sale) => {
      const totalSupPrice = _.sumBy(sale.stock_exit_lines, 'sup_price');
      const totalArticleBuyPrice = _.sumBy(
        sale.stock_exit_lines.map((sel) => {
          const price = sel.article?.prices?.find(
            (p) => p.price_type.code === priceTypeCode.buy
          );
          return { buy_price: price?.value ?? 0 };
        }),
        'buy_price'
      );
      const sale_amount =
        totalSupPrice - (sale.discount ? parseFloat(sale.discount) : 0);
      const sale_win_amount = (sale_amount - totalArticleBuyPrice).toFixed(2);

      const quantities = _(sale.stock_exit_lines)
        .groupBy((sel) => sel.article.product.product_unit.label)
        .map((objs, key) => {
          return {
            unit: key,
            total: _.sumBy(objs, 'quantity'),
          };
        })
        .value();

      return {
        id: sale.id,
        enterprise: {
          id: sale.enterprise_id,
          name: sale.enterprise?.name ?? $t('common.parent'),
        },
        reference: sale.reference,
        code: sale.code,
        sup_amount: totalSupPrice,
        discount: sale.discount ?? 0,
        sale_amount,
        created_at: sale.created_at,
        sale_win_amount: parseFloat(sale_win_amount),
        sale_win_amount_percent: parseFloat(
          ((sale_win_amount * 100) / totalArticleBuyPrice).toFixed(2)
        ),
        quantities,
      };
    });
  },
  getSelectedSaleById: (state, getters) => (id) =>
    getters.getSelectedSaleList.find((sl) => sl.id === id) ?? null,
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
    const sale = getters.sales.find((p) => p.id.toString() === id.toString());
    if (sale !== undefined) {
      commit('SET_CURRENT_SALE', sale);
      return sale;
    } else
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
  ADD_SALE(state, sale) {
    if (state.sales.find((s) => s.id === sale.id) === undefined)
      state.sales.push(sale);
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
  SET_REQUEST_FIELD_VALUE(state, { field, value }) {
    state.request_field[field] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
