import stockEntryService from '../../../services/stocks/StockEntryService';

const state = {
  stock_entries: null,
  hash: null,
  stockEntry: null,
};

// getters
const getters = {
  stock_entries: (state) => {
    return state.stock_entries ? JSON.parse(state.stock_entries) : [];
  },
  stockEntry: (state) => (state.stockEntry ? JSON.parse(state.stockEntry) : null),
};

const actions = {
  getStockEntriesList({ commit, getters }, { page, field }) {
    if (getters.stock_entries.length > 0) {
      return getters.stock_entries;
    }
    return stockEntryService.getStockEntriesList(page, field).then(({ data }) => {
      commit('SET_STOCK_ENTRIES', data);
      return data;
    });
  },

  getStockEntry({ getters, commit }, id) {
    const stockEntry = getters.stock_entries.find((p) => p.id.toString() === id);
    if (stockEntry !== undefined) {
      commit('SET_CURRENT_STOCK_ENTRY', stockEntry);
      return stockEntry;
    }

    return stockEntryService.getStockEntry(id).then(({ data }) => {
      commit('SET_CURRENT_STOCK_ENTRY', data);
      return data;
    });
  },

  addStockEntry({ commit }, stockEntryField) {
    return stockEntryService.addStockEntry(stockEntryField).then(({ data }) => {
      commit('ADD_STOCK_ENTRY', data);
      return data;
    });
  },

  updateStockEntry({ commit }, stockEntryField) {
    return stockEntryService
      .updateStockEntry(stockEntryField, stockEntryField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_ENTRY', data);
        return data;
      });
  },

  deleteStockEntry({ commit }, stockEntryId) {
    return stockEntryService.deleteStockEntry(stockEntryId).then(({ data }) => {
      commit('DELETE_STOCK_ENTRY', stockEntryId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_ENTRIES(state, stock_entries) {
    state.stock_entries = JSON.stringify(stock_entries);
  },
  SET_CURRENT_STOCK_ENTRY(state, stockEntry) {
    state.stockEntry = JSON.stringify(stockEntry);
  },
  ADD_STOCK_ENTRY(state, stockEntry) {
    let stock_entries = null;
    if (state.stock_entries) {
      stock_entries = JSON.parse(state.stock_entries);
      stock_entries.push(stockEntry);
    } else {
      stock_entries = [stockEntry];
    }
    state.stock_entries = JSON.stringify(stock_entries);
  },
  UPDATE_STOCK_ENTRY(state, stockEntry) {
    let stock_entries = JSON.parse(state.stock_entries);
    const index = stock_entries.findIndex((p) => p.id === stockEntry.id);
    if (index !== -1) {
      stock_entries.splice(index, 1, stockEntry);
    }
    state.stock_entries = JSON.stringify(stock_entries);
  },
  DELETE_STOCK_ENTRY(state, stockEntryId) {
    state.stock_entries = JSON.stringify(
      JSON.parse(state.stock_entries).filter((p) => p.id !== stockEntryId)
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
