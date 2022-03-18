import stockExitService from '../../../services/stocks/StockExitService';

const state = {
  stock_exits: null,
  hash: null,
  stockExit: null,
};

// getters
const getters = {
  stock_exits: (state) =>
    state.stock_exits ? JSON.parse(state.stock_exits) : [],
  stockExit: (state) => (state.stockExit ? JSON.parse(state.stockExit) : null),
};

// privileges
const actions = {
  getStockExitsList({ commit, getters }, { page, field }) {
    if (getters.stock_exits.length > 0) {
      return getters.stock_exits;
    } else
      return stockExitService.getList(page, field).then(({ data }) => {
        commit('SET_STOCK_EXITS', data);
        return data;
      });
  },

  getStockExit({ getters, commit }, id) {
    const stockExit = getters.stock_exits.find((p) => p.id.toString() === id);
    if (stockExit !== undefined) {
      commit('SET_CURRENT_STOCK_EXIT', stockExit);
      return stockExit;
    } else
      return stockExitService.get(id).then(({ data }) => {
        commit('SET_CURRENT_STOCK_EXIT', data);
        return data;
      });
  },

  addStockExit({ commit }, stockExitField) {
    return stockExitService.add(stockExitField).then(({ data }) => {
      commit('ADD_STOCK_EXIT', data);
      return data;
    });
  },

  updateStockExit({ commit }, stockExitField) {
    return stockExitService
      .update(stockExitField, stockExitField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_EXIT', data);
        return data;
      });
  },

  deleteStockExit({ commit }, stockExitId) {
    return stockExitService.delete(stockExitId).then(({ data }) => {
      commit('DELETE_STOCK_EXIT', stockExitId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_EXITS(state, stock_exits) {
    state.stock_exits = JSON.stringify(stock_exits);
  },
  SET_CURRENT_STOCK_EXIT(state, stockExit) {
    state.stockExit = JSON.stringify(stockExit);
  },
  ADD_STOCK_EXIT(state, stockExit) {
    let stock_exits = JSON.parse(state.stock_exits);
    stock_exits.push(stockExit);
    state.stock_exits = JSON.stringify(stock_exits);
  },
  UPDATE_STOCK_EXIT(state, stockExit) {
    let stock_exits = JSON.parse(state.stock_exits);
    const index = stock_exits.findIndex((p) => p.id === stockExit.id);
    if (index !== -1) {
      stock_exits.splice(index, 1, stockExit);
      state.stock_exits = JSON.stringify(stock_exits);
    }
  },
  DELETE_STOCK_EXIT(state, stockExitId) {
    state.stock_exits = JSON.stringify(
      JSON.parse(state.stock_exits).filter((p) => p.id !== stockExitId)
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
