import stockProvisionService from '../../../services/stocks/StockProvisionService';

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
};

// privileges
const actions = {
  getStockProvisionsList({ commit, getters }, { page, field }) {
    if (getters.stock_provisions.length > 0) {
      return getters.stock_provisions;
    } else
      return stockProvisionService.getStockProvisionsList(page, field).then(({ data }) => {
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
      return stockProvisionService.getStockProvision(id).then(({ data }) => {
        return data;
      });
  },

  addStockProvision({ commit }, stockProvisionField) {
    return stockProvisionService.addStockProvision(stockProvisionField).then(({ data }) => {
      commit('ADD_STOCK_PROVISION', data);
      return data;
    });
  },

  updateStockProvision({ commit }, stockProvisionField) {
    return stockProvisionService
      .updateStockProvision(stockProvisionField, stockProvisionField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_PROVISION', data);
        return data;
      });
  },

  deleteStockProvision({ commit }, stockProvisionId) {
    return stockProvisionService.deleteStockProvision(stockProvisionId).then(({ data }) => {
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
