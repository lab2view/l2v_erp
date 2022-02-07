import stockProvisionService from '../../../services/stocks/StockProvisionService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  stock_provisions: null,
  hash: null,
};

// getters
const getters = {
  stock_provisions: (state) =>
    state.stock_provisions ? JSON.parse(state.stock_provisions) : [],
  stockProvision: (state) =>
    state.stockProvision ? JSON.parse(state.stockProvision) : null,
  getStockProvisionByProductId: (state, getters) => (product_id) =>
    getters.stock_provisions.filter(
      (a) => a.article?.product_id === product_id
    ),
};

// privileges
const actions = {
  getStockProvisionList({ commit, getters }, { page, field }) {
    if (getters.stock_provisions.length > 0) {
      return getters.stock_provisions;
    } else
      return stockProvisionService.getList(page, field).then(({ data }) => {
        commit('SET_STOCK_PROVISIONS', data);
        return data;
      });
  },

  getStockProvision({ getters }, id) {
    const stockProvision = getters.stock_provisions.find(
      (p) => p.id.toString() === id
    );
    if (stockProvision !== undefined) {
      return stockProvision;
    } else
      return stockProvisionService.get(id).then(({ data }) => {
        return data;
      });
  },

  addStockProvision({ commit }, stockProvisionField) {
    return stockProvisionService.add(stockProvisionField).then(({ data }) => {
      commit('ADD_STOCK_PROVISION', data);
      notify(
        i18n.global.t('stockProvision.form.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateStockProvision({ commit }, stockProvisionField) {
    return stockProvisionService
      .update(stockProvisionField, stockProvisionField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('stockProvision.form.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_STOCK_PROVISION', data);
        return data;
      });
  },

  deleteStockProvision({ commit }, stockProvisionId) {
    return stockProvisionService.delete(stockProvisionId).then(({ data }) => {
      commit('DELETE_STOCK_PROVISION', stockProvisionId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_PROVISIONS(state, stock_provisions) {
    state.stock_provisions = JSON.stringify(stock_provisions);
  },
  ADD_STOCK_PROVISION(state, stockProvision) {
    let stock_provisions = JSON.parse(state.stock_provisions);
    stock_provisions.push(stockProvision);
    state.stock_provisions = JSON.stringify(stock_provisions);
  },
  UPDATE_STOCK_PROVISION(state, stockProvision) {
    let stock_provisions = JSON.parse(state.stock_provisions);
    const index = stock_provisions.findIndex((p) => p.id === stockProvision.id);
    if (index !== -1) {
      stock_provisions.splice(index, 1, stockProvision);
      state.stock_provisions = JSON.stringify(stock_provisions);
    }
  },
  DELETE_STOCK_PROVISION(state, stockProvisionId) {
    state.stock_provisions = JSON.stringify(
      JSON.parse(state.stock_provisions).filter(
        (p) => p.id !== stockProvisionId
      )
    );
  },
  DELETE_STOCK_PROVISION_BY_PRODUCT(state, productId) {
    state.stock_provisions = JSON.stringify(
      JSON.parse(state.stock_provisions).filter(
        (p) => p.product_id !== productId
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
