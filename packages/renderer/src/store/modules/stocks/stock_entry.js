import stockEntryService from '../../../services/stocks/StockEntryService';
import { notify } from '/@/helpers/notify.js';
import i18n from '/@/i18n/index.js';
import { stockStateCode, stockTypeCode } from '/@/helpers/codes.js';

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
  stockEntryReference: (state, getters) => getters.stockEntry?.reference,
  haveStockEntry: (state, getters) => !!getters.stockEntry,
  getStocksHash: (state) => state.hash ?? null,
  stockEntryLines: (state, getters) =>
    getters.haveStockEntry ? getters.stockEntry.stock_entry_lines : [],
  stockEntryIsCommand: (state, getters) => {
    return getters.stockEntry?.stock_type.code === stockTypeCode.command;
  },
  stockEntryIsConfirm: (state, getters) => {
    return (
      getters.stockEntry?.current_state?.stock_state.code ===
        stockStateCode.success ||
      getters.stockEntry?.current_state?.stock_state.code ===
        stockStateCode.delivered
    );
  },
  currentStockEntryStateDate: (state, getters) =>
    getters.stockEntry?.current_state?.updated_at,
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

  changeStockEntryState({ commit, getters }, stock_state_id) {
    return stockEntryService
      .setStockEntryState(getters.stockEntry.id, stock_state_id)
      .then(({ data }) => {
        commit('ADD_STOCK_ENTRY_STATE', data);
        if (
          state.code === stockStateCode.success ||
          state.code === stockStateCode.delivered
        )
          getters.stockEntry?.provisions.forEach((sp) =>
            commit('article/UPDATE_ARTICLE_STOCK', sp.article, {
              root: true,
            })
          );
        notify(
          i18n.global.t('stocks.stockEntry.updateStock'),
          'Ok',
          'theme',
          'fa fa-check'
        );
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
          i18n.global.t('stocks.entryLine.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
  removeStockEntryLines({ getters, commit }, stockEntryLineIds) {
    return stockEntryService
      .removeStockEntryLines(getters.stockEntry.id, {
        stock_entry_line_ids: [...stockEntryLineIds],
      })
      .then(() => {
        commit('REMOVE_STOCK_ENTRY_LINES', stockEntryLineIds);
      });
  },

  addProvisions({ commit, getters }, provisions) {
    return stockEntryService
      .addProvisions(getters.stockEntry.id, provisions)
      .then(({ data }) => {
        commit('ADD_PROVISIONS', data.provisions);
      });
  },
  updateProvision({ commit }, provision) {
    return stockEntryService
      .updateProvision(provision)
      .then(({ data }) => {
        commit('UPDATE_PROVISION', data);
        notify(
          i18n.global.t('stocks.provision.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
  removeProvisions({ getters, commit }, provisionIds) {
    return stockEntryService
      .removeProvisions(
        {
          stock_provision_ids: [...provisionIds],
        },
        getters.stockEntry.id
      )
      .then(() => {
        commit('REMOVE_PROVISIONS', provisionIds);
      });
  },

  setStockEntryState({ getters, commit }, stock_state_id) {
    return stockEntryService
      .setStockEntryState(getters.stockEntry.id, stock_state_id)
      .then(({ data }) => {
        commit('ADD_STOCK_ENTRY_STATE', data);
        notify(
          i18n.global.t('stocks.stockEntry.updateStock'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
};

// mutations
const mutations = {
  SET_STOCKS_HASH(state, hash) {
    state.hash = hash;
  },
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
          return stock_entry_lines_ids.find((id) => id === cp.id) === undefined;
        }
      );
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },

  ADD_PROVISIONS(state, provisions) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      stockEntry.provisions = [
        ...stockEntry.provisions,
        ...provisions,
      ];
      stock_entries.splice(index, 1, stockEntry);
      state.stockEntry = JSON.stringify(stockEntry);
      state.stock_entries = JSON.stringify(stock_entries);
    }
  },
  UPDATE_PROVISION(state, stockPrevision) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      let art = stockEntry.provisions.findIndex(
        (p) => p.id === stockPrevision.id
      );
      if (art !== -1) {
        stockEntry.provisions.splice(art, 1, stockPrevision);
        stock_entries.splice(index, 1, stockEntry);
        state.stockEntry = JSON.stringify(stockEntry);
        state.stock_entries = JSON.stringify(stock_entries);
      }
    }
  },
  REMOVE_PROVISIONS(state, provision_ids) {
    let stock_entries = JSON.parse(state.stock_entries);
    let stockEntry = JSON.parse(state.stockEntry);
    let index = stock_entries.findIndex((se) => se.id === stockEntry.id);
    if (index !== -1) {
      stockEntry.provisions = stockEntry.provisions.filter((cp) => {
        return provision_ids.find((p) => p === cp.id) === undefined;
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
      let oldActInd = stockEntry.stock_entry_states.findIndex(
        (st) => st.is_active
      );
      if (oldActInd !== -1) {
        stockEntry.stock_entry_states.splice(oldActInd, 1, {
          ...stockEntry.stock_entry_states[oldActInd],
          is_active: false,
        });
      }
      stockEntry.stock_entry_states.push(stockState);
      stockEntry.current_state = stockState;
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
