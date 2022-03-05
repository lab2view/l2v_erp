import stockStateService from '../../../services/stocks/StockStateService';

const state = {
  stock_states: null,
  hash: null,
  stockState: null,
};

// getters
const getters = {
  stock_states: (state) => {
    return state.stock_states ? JSON.parse(state.stock_states) : [];
  },
  stockState: (state) =>
    state.stockState ? JSON.parse(state.stockState) : null,
  getStockStateByCode: (state, getters) => (code) =>
    getters.stock_states.find((ss) => ss.code === code),
};

const actions = {
  getStockStatesList({ commit, getters }, { page, field }) {
    if (getters.stock_states.length > 0) {
      return getters.stock_states;
    }
    return stockStateService
      .getStockStatesList(page, field)
      .then(({ data }) => {
        commit('SET_STOCK_STATES', data);
        return data;
      });
  },

  getStockState({ getters, commit }, id) {
    const stockState = getters.stock_states.find((p) => p.id.toString() === id);
    if (stockState !== undefined) {
      commit('SET_CURRENT_STOCK_STATE', stockState);
      return stockState;
    }

    return stockStateService.getStockState(id).then(({ data }) => {
      commit('SET_CURRENT_STOCK_STATE', data);
      return data;
    });
  },

  addStockState({ commit }, stockStateField) {
    return stockStateService.addStockState(stockStateField).then(({ data }) => {
      commit('ADD_STOCK_STATE', data);
      return data;
    });
  },

  updateStockState({ commit }, stockStateField) {
    return stockStateService
      .updateStockState(stockStateField, stockStateField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_STATE', data);
        return data;
      });
  },

  deleteStockState({ commit }, stockStateId) {
    return stockStateService.deleteStockState(stockStateId).then(({ data }) => {
      commit('DELETE_STOCK_STATE', stockStateId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_STATES(state, stock_states) {
    state.stock_states = JSON.stringify(stock_states);
  },
  SET_CURRENT_STOCK_STATE(state, stockState = null) {
    state.stockState = stockState ? JSON.stringify(stockState) : null;
  },
  ADD_STOCK_STATE(state, stockState) {
    let stock_states = null;
    if (state.stock_states) {
      stock_states = JSON.parse(state.stock_states);
      stock_states.push(stockState);
    } else {
      stock_states = [stockState];
    }
    state.stock_states = JSON.stringify(stock_states);
  },
  UPDATE_STOCK_STATE(state, stockState) {
    let stock_states = JSON.parse(state.stock_states);
    const index = stock_states.findIndex((p) => p.id === stockState.id);
    if (index !== -1) {
      stock_states.splice(index, 1, stockState);
    }
    state.stock_states = JSON.stringify(stock_states);
  },
  DELETE_STOCK_STATE(state, stockStateId) {
    state.stock_states = JSON.stringify(
      JSON.parse(state.stock_states).filter((p) => p.id !== stockStateId)
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
