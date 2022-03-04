import stockEntryService from '../../../services/stocks/StockEntryService';
import { notify } from '/@/helpers/notify.js';
import i18n from '/@/i18n/index.js';

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
  stockEntry: (state) =>
    state.stockEntry ? JSON.parse(state.stockEntry) : null,
  haveStockEntry: (state, getters) => !!getters.stockEntry,
};

const actions = {
  getStockEntriesList({ commit, getters }, { page, field }) {
    if (getters.stock_entries.length > 0) {
      return getters.stock_entries;
    }
    return stockEntryService
      .getStockEntriesList(page, field)
      .then(({ data }) => {
        commit('SET_STOCK_ENTRIES', data);
        return data;
      });
  },

  getStockEntry({ getters, commit }, id) {
    const stockEntry = getters.stock_entries.find(
      (p) => p.id.toString() === id
    );
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
      commit('SET_CURRENT_STOCK_ENTRY', data);
      return data;
    });
  },

  updateStockEntry({ commit }, stockEntryField) {
    return stockEntryService
      .updateStockEntry(stockEntryField)
      .then(({ data }) => {
        commit('UPDATE_STOCK_ENTRY', data);
        commit('SET_CURRENT_STOCK_ENTRY', data);
        return data;
      });
  },

  deleteStockEntry({ commit }, stockEntryId) {
    return stockEntryService.deleteStockEntry(stockEntryId).then(({ data }) => {
      commit('DELETE_STOCK_ENTRY', stockEntryId);
      return data;
    });
  },

  addStockEntryLines({ commit, getters }, stockEntryLines) {
    return stockEntryService
      .addStockEntryLines(getters.stockEntry.id, stockEntryLines)
      .then(({ data }) => {
        commit('ADD_STOCK_ENTRY_LINES', data.stock_entry_lines);
      });
  },
  updateStockEntryLine({ commit }, stockEntryLine) {
    return stockEntryService
      .updateStockEntryLine(stockEntryLine)
      .then(({ data }) => {
        commit('UPDATE_STOCK_ENTRY_LINE', data);
        notify(
          i18n.global.t('stock.entryLine.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
  removeStockEntryLines({ getters, commit }, stockEntryLineIds) {
    return stockEntryService
      .removeStockEntryLines(
        {
          stock_entry_line_ids: [...stockEntryLineIds],
        },
        getters.stockEntry.id
      )
      .then(() => {
        commit('REMOVE_STOCK_ENTRY_LINES', stockEntryLineIds);
      });
  },

  addStockProvisions({ commit, getters }, stockProvisions) {
    return stockEntryService
      .addStockProvisions(getters.stockEntry.id, stockProvisions)
      .then(({ data }) => {
        commit('ADD_STOCK_PROVISIONS', data.stock_provisions);
      });
  },
  updateStockProvision({ commit }, stockProvision) {
    return stockEntryService
      .updateStockProvision(stockProvision)
      .then(({ data }) => {
        commit('UPDATE_STOCK_PROVISION', data);
        notify(
          i18n.global.t('stock.provision.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
  removeStockProvisions({ getters, commit }, stockProvisionIds) {
    return stockEntryService
      .removeStockProvisions(
        {
          stock_provision_ids: [...stockProvisionIds],
        },
        getters.stockEntry.id
      )
      .then(() => {
        commit('REMOVE_STOCK_PROVISIONS', stockProvisionIds);
      });
  },

  setStockEntryState({ getters, commit }, stock_state_id) {
    return stockEntryService
      .setStockEntryState(getters.stockEntry.id, stock_state_id)
      .then(({ data }) => {
        commit('ADD_STOCK_ENTRY_STATE', data);
        notify(
          i18n.global.t('stock.stockEntry.updateStock'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
};

// mutations
const mutations = {
  SET_STOCK_ENTRIES(state, stock_entries) {
    state.stock_entries = JSON.stringify(stock_entries);
  },
  SET_CURRENT_STOCK_ENTRY(state, stockEntry) {
    state.stockEntry = stockEntry ? JSON.stringify(stockEntry) : null;
  },
  ADD_STOCK_ENTRY(state, stockEntry) {
    let stock_entries = state.stock_entries
      ? JSON.parse(state.stock_entries)
      : [];
    stock_entries.push(stockEntry);
    state.stock_entries = JSON.stringify(stock_entries);
  },
  UPDATE_STOCK_ENTRY(state, stockEntry) {
    let stock_entries = JSON.parse(state.stock_entries);
    const index = stock_entries.findIndex((se) => se.id === stockEntry.id);
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

  ADD_STOCK_ENTRY_LINES(state, stock_entry_lines) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      stockEntry.stock_entry_lines = [
        ...stockEntry.stock_entry_lines,
        ...stock_entry_lines,
      ];
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },
  UPDATE_STOCK_ENTRY_LINE(state, compositionPreset) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      let art = stockEntry.stock_entry_lines.findIndex(
        (p) => p.id === compositionPreset.id
      );
      if (art !== -1) {
        stockEntry.stock_entry_lines.splice(art, 1, compositionPreset);
        stock_entries.splice(index, 1, stockEntry);
        state.stockEntry = JSON.stringify(stockEntry);
        state.stock_entries = JSON.stringify(stock_entries);
      }
    }
  },
  REMOVE_STOCK_ENTRY_LINES(state, stock_entry_lines_ids) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      stockEntry.stock_entry_lines = stockEntry.stock_entry_lines.filter(
        (cp) => {
          return stock_entry_lines_ids.find((p) => p === cp.id) === undefined;
        }
      );
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },

  ADD_STOCK_PROVISIONS(state, stock_provisions) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      stockEntry.stock_provisions = [
        ...stockEntry.stock_provisions,
        ...stock_provisions,
      ];
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },
  UPDATE_STOCK_PROVISION(state, stockPrevision) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      let art = stockEntry.stock_provisions.findIndex(
        (p) => p.id === stockPrevision.id
      );
      if (art !== -1) {
        stockEntry.stock_provisions.splice(art, 1, stockPrevision);
        stock_entries.splice(index, 1, stockEntry);
        state.stockEntry = JSON.stringify(stockEntry);
        state.stock_entries = JSON.stringify(stock_entries);
      }
    }
  },
  REMOVE_STOCK_PROVISIONS(state, stock_provisions_ids) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      stockEntry.stock_provisions = stockEntry.stock_provisions.filter((cp) => {
        return stock_provisions_ids.find((p) => p === cp.id) === undefined;
      });
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },

  ADD_STOCK_ENTRY_STATE(state, stockState) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      let oldActInd = stockEntry.stock_states.findIndex((st) => st.is_active);
      if (oldActInd !== -1) {
        stockEntry.stock_states.splice(oldActInd, 1, {
          ...stockEntry.stock_states[oldActInd],
          is_active: false,
        });
      }
      stockEntry.stock_states.push(stockState);
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
