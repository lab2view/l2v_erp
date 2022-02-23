import stockEntryProvisionService from '../../../services/stocks/StockEntryProvisionService';
import stockEntryService from '../../../services/stocks/StockEntryService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  stock_provisions: null,
  hash: null,
  stockProvision: null,
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
  getStockProvisionsList({ commit, getters }, { page, field }) {
    if (getters.stock_provisions.length > 0) {
      return getters.stock_provisions;
    } else
      return stockEntryService.getStockEntriesList(page, field).then(({ data }) => {
        commit('SET_STOCK_PROVISIONS', data);
        return data;
      });
  },

  getStockProvision({ getters, commit }, id) {
    const stockProvision = getters.stock_provisions.find(
      (p) => p.id.toString() === id
    );
    if (stockProvision !== undefined) {
      commit('SET_CURRENT_STOCK_PROVISION', stockProvision);
      return stockProvision;
    } else
      return stockEntryProvisionService.getStockEntryProvision(id).then(({ data }) => {
        commit('SET_CURRENT_STOCK_PROVISION', data);
        return data;
      });
  },

  addStockProvision({ commit }, stockProvisionField) {
    return stockEntryProvisionService.addStockEntryProvision(stockProvisionField).then(({ data }) => {
      commit('ADD_STOCK_PROVISION', data);
      notify(
        i18n.global.t('stock.provision.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateStockProvision({ commit }, stockProvisionField) {
    return stockEntryProvisionService
      .updateStockEntryProvision(stockProvisionField, stockProvisionField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_PROVISION', data);
        notify(
          i18n.global.t('stock.provision.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteStockProvision({ commit }, stockProvisionId) {
    return stockEntryProvisionService.deleteStockEntryProvision(stockProvisionId).then(({ data }) => {
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
  SET_CURRENT_STOCK_PROVISION(state, stockProvision) {
    state.stockProvision = JSON.stringify(stockProvision);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
