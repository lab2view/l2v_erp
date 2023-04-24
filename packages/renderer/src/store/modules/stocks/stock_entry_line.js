import stockEntryLineService from '../../../services/stocks/StockEntryLineService';

const state = {
  stock_entry_lines: null,
  hash: null,
  stockEntryLine: null,
  stock_expired_entry_lines: null,
};

// getters
const getters = {
  stock_entry_lines: (state) => {
    return state.stock_entry_lines ? JSON.parse(state.stock_entry_lines) : [];
  },
  stock_expired_entry_lines: (state) => {
    return state.stock_expired_entry_lines
      ? JSON.parse(state.stock_expired_entry_lines)
      : [];
  },
  stockEntryLine: (state) =>
    state.stockEntryLine ? JSON.parse(state.stockEntryLine) : null,
};

const actions = {
  getStockEntryLinesList({ commit, getters }, { page, field }) {
    if (getters.stock_entry_lines.length > 0) {
      return getters.stock_entry_lines;
    }
    return stockEntryLineService
      .getStockEntryLinesList(page, field)
      .then(({ data }) => {
        commit('SET_STOCK_ENTRY_LINES', data);
        return data;
      });
  },

  getStockExpiredEntryLinesList({ commit, getters }, { page, field }) {
    if (getters.stock_expired_entry_lines.length > 0) {
      return getters.stock_expired_entry_lines;
    }
    return stockEntryLineService
      .getStockExpiredEntryLinesList(page, field)
      .then(({ data }) => {
        commit('SET_STOCK_EXPIRED_ENTRY_LINES', data);
        return data;
      });
  },

  getStockEntryLine({ getters, commit }, id) {
    const stockEntryLine = getters.stock_entry_lines.find(
      (p) => p.id.toString() === id
    );
    if (stockEntryLine !== undefined) {
      commit('SET_CURRENT_STOCK_ENTRY_LINE', stockEntryLine);
      return stockEntryLine;
    }

    return stockEntryLineService.getStockEntryLine(id).then(({ data }) => {
      commit('SET_CURRENT_STOCK_ENTRY_LINE', data);
      return data;
    });
  },

  addStockEntryLine({ commit }, stockEntryLineField) {
    return stockEntryLineService
      .addStockEntryLine(stockEntryLineField)
      .then(({ data }) => {
        commit('ADD_STOCK_ENTRY_LINE', data);
        return data;
      });
  },

  updateStockEntryLine({ commit }, stockEntryLineField) {
    return stockEntryLineService
      .updateStockEntryLine(stockEntryLineField, stockEntryLineField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_ENTRY_LINE', data);
        return data;
      });
  },

  deleteStockEntryLine({ commit }, stockEntryLineId) {
    return stockEntryLineService
      .deleteStockEntryLine(stockEntryLineId)
      .then(({ data }) => {
        commit('DELETE_STOCK_ENTRY_LINE', stockEntryLineId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_STOCK_ENTRY_LINES(state, stock_entry_lines) {
    state.stock_entry_lines = JSON.stringify(stock_entry_lines);
  },
  SET_STOCK_EXPIRED_ENTRY_LINES(state, stock_expired_entry_lines) {
    state.stock_expired_entry_lines = JSON.stringify(stock_expired_entry_lines);
  },
  SET_CURRENT_STOCK_ENTRY_LINE(state, stockEntryLine) {
    state.stockEntryLine = JSON.stringify(stockEntryLine);
  },
  ADD_STOCK_ENTRY_LINE(state, stockEntryLine) {
    let stock_entry_lines = null;
    if (state.stock_entry_lines) {
      stock_entry_lines = JSON.parse(state.stock_entry_lines);
      stock_entry_lines.push(stockEntryLine);
    } else {
      stock_entry_lines = [stockEntryLine];
    }
    state.stock_entry_lines = JSON.stringify(stock_entry_lines);
  },
  UPDATE_STOCK_ENTRY_LINE(state, stockEntryLine) {
    let stock_entry_lines = JSON.parse(state.stock_entry_lines);
    const index = stock_entry_lines.findIndex(
      (p) => p.id === stockEntryLine.id
    );
    if (index !== -1) {
      stock_entry_lines.splice(index, 1, stockEntryLine);
    }
    state.stock_entry_lines = JSON.stringify(stock_entry_lines);
  },
  DELETE_STOCK_ENTRY_LINE(state, stockEntryLineId) {
    state.stock_entry_lines = JSON.stringify(
      JSON.parse(state.stock_entry_lines).filter(
        (p) => p.id !== stockEntryLineId
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
