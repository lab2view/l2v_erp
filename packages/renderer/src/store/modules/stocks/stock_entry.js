import stockEntryService from '../../../services/stocks/StockEntryService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n/index';
import { stockStateCode, stockTypeCode } from '/@/helpers/codes';

const state = {
  stock_entries: [],
  hash: null,
  stock_entry: null,
  request_field: {
    enterprise_id: null,
    stock_type_id: null,
    enterprise_sender_id: null,
    stock_state_id: null,
    created_at: null,
    keyword: null,
  },
};

// getters
const getters = {
  stock_entries: (state) => state.stock_entries,
  getStockEntriesByProductId: (state, getters) => (product_id) => {
    return getters.stock_entries.filter(
      (s) =>
        s.stock_provisions.find(
          (sp) => sp.article.product_id === product_id
        ) !== undefined
    );
  },
  requestField: (state) => state.request_field,
  stockEntry: (state) => state.stock_entry,
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
  canEditStockEntry: (state, getters) => {
    return getters.stockEntryIsConfirm
      ? false
      : getters.stockEntry?.stock_exit_id === null;
  },
  currentStockEntryStateDate: (state, getters) =>
    getters.stockEntry?.current_state?.updated_at,
};

const actions = {
  getStockEntriesList({ commit, getters, dispatch }, { page, field }) {
    if (getters.stock_entries.length > 0 && !field.next) {
      return getters.stock_entries;
    }
    return stockEntryService
      .getStockEntriesList(page, { ...field, paginate: 20 })
      .then(({ data }) => {
        commit('SET_STOCK_ENTRIES', data);

        dispatch(
          'setGlobalProgress',
          {
            label: 'Entry stocks',
            min: 0,
            max: data.last_page,
            value: data.current_page,
          },
          { root: true }
        );

        if (data.next_page_url) {
          return dispatch('getStockEntriesList', {
            page: page + 1,
            field: { ...field, next: true },
          });
        } else dispatch('setGlobalProgress', null, { root: true });

        return data;
      })
      .catch((error) => {
        commit('SET_STOCK_ENTRIES', []);
        return Promise.reject(error);
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
          data.code === stockStateCode.success ||
          data.code === stockStateCode.delivered ||
          data.code === stockStateCode.partial_delivered
        ) {
          commit('UPDATE_STOCK_ENTRY', {
            ...getters.stockEntry,
            not_deletable: true,
            availability: true,
          });
          getters.stockEntry?.stock_provisions.forEach((sp) =>
            commit('article/UPDATE_ARTICLE_STOCK', sp.article, {
              root: true,
            })
          );
        }
        notify(
          i18n.global.t('stocks.stockEntry.updateStock'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  addStockEntryLines({ commit, getters }, stockEntryLines) {
    return stockEntryService
      .addStockEntryLines(getters.stockEntry.id, stockEntryLines)
      .then(({ data }) => {
        commit('ADD_STOCK_ENTRY_LINES', data.stock_entry_lines);
        return data;
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
        return data;
      });
  },
  removeStockEntryLines({ getters, commit }, stockEntryLineIds) {
    return stockEntryService
      .removeStockEntryLines(getters.stockEntry.id, {
        stock_entry_line_ids: [...stockEntryLineIds],
      })
      .then(() => {
        commit('REMOVE_STOCK_ENTRY_LINES', stockEntryLineIds);
        return true;
      });
  },

  addProvisions({ commit }, { stock_provisions, stock_entry_id }) {
    return stockEntryService
      .addProvisions(stock_entry_id, { stock_provisions: stock_provisions })
      .then(({ data }) => {
        commit('ADD_PROVISIONS', data.provisions);
        return data;
      });
  },
  updateProvision({ commit }, provision) {
    return stockEntryService.updateProvision(provision).then(({ data }) => {
      commit('UPDATE_PROVISION', data);
      notify(
        i18n.global.t('stocks.provision.update'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
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
        return true;
      });
  },
};

// mutations
const mutations = {
  SET_STOCKS_HASH(state, hash) {
    state.hash = hash;
  },
  SET_STOCK_ENTRIES(state, { current_page, data }) {
    state.stock_entries =
      current_page === 1 ? data : [...state.stock_entries, ...data];
  },
  SET_CURRENT_STOCK_ENTRY(state, stockEntry) {
    state.stock_entry = stockEntry;
  },
  ADD_STOCK_ENTRY(state, stockEntry) {
    state.stock_entries.unshift(stockEntry);
  },
  UPDATE_STOCK_ENTRY(state, stockEntry) {
    const index = state.stock_entries.findIndex(
      (se) => se.id === stockEntry.id
    );
    if (index !== -1) {
      state.stock_entries.splice(index, 1, stockEntry);
    }
  },
  DELETE_STOCK_ENTRY(state, stockEntryId) {
    state.stock_entries = state.stock_entries.filter(
      (p) => p.id.toString() !== stockEntryId.toString()
    );
  },

  ADD_STOCK_ENTRY_LINES(state, stock_entry_lines) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      state.stock_entry.stock_entry_lines = [
        ...state.stock_entry.stock_entry_lines,
        ...stock_entry_lines,
      ];
      state.stock_entries.splice(index, 1, state.stock_entry);
    }
  },
  UPDATE_STOCK_ENTRY_LINE(state, stockEntryLine) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      let art = state.stock_entry.stock_entry_lines.findIndex(
        (p) => p.id === stockEntryLine.id
      );
      if (art !== -1) {
        state.stock_entry.stock_entry_lines.splice(art, 1, stockEntryLine);
        state.stock_entries.splice(index, 1, state.stock_entry);
      }
    }
  },
  REMOVE_STOCK_ENTRY_LINES(state, stock_entry_lines_ids) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      state.stock_entry.stock_entry_lines =
        state.stock_entry.stock_entry_lines.filter((cp) => {
          return stock_entry_lines_ids.find((id) => id === cp.id) === undefined;
        });
      state.stock_entries.splice(index, 1, state.stock_entry);
    }
  },

  ADD_PROVISIONS(state, provisions) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      state.stock_entry.provisions = state.stock_entry.provisions
        ? [...state.stock_entry.provisions, ...provisions]
        : provisions;
      state.stock_entries.splice(index, 1, state.stock_entry);
    }
  },
  UPDATE_PROVISION(state, stockPrevision) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      let art = state.stock_entry.provisions.findIndex(
        (p) => p.id === stockPrevision.id
      );
      if (art !== -1) {
        state.stock_entry.provisions.splice(art, 1, stockPrevision);
        state.stock_entries.splice(index, 1, state.stock_entry);
      }
    }
  },
  REMOVE_PROVISIONS(state, provision_ids) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      state.stock_entry.provisions = state.stock_entry.provisions.filter(
        (cp) => {
          return provision_ids.find((p) => p === cp.id) === undefined;
        }
      );
      state.stock_entries.splice(index, 1, state.stock_entry);
    }
  },

  ADD_STOCK_ENTRY_STATE(state, stockState) {
    let index = state.stock_entries.findIndex(
      (se) => se.id === state.stock_entry.id
    );
    if (index !== -1) {
      state.stock_entry.current_state = stockState;
      state.stock_entries.splice(index, 1, state.stock_entry);
    }
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
