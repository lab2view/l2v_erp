import stockEntryLineService from '../../../services/stocks/StockEntryLineService';

const state = {
  stock_entry_lines: null,
  hash: null,
  stock_entry_line: null,
  stock_expired_entry_lines: null,
  request_field: {
    expires_at: null,
  },
};

// getters
const getters = {
  stock_entry_lines: (state) => {
    return state.stock_entry_lines ? JSON.parse(state.stock_entry_lines) : [];
  },
  stockExpiredEntryLines: (state) => {
    return state.stock_expired_entry_lines
      ? JSON.parse(state.stock_expired_entry_lines)
      : [];
  },
  stockEntryLine: (state) =>
    state.stock_entry_line ? JSON.parse(state.stock_entry_line) : null,
  requestField: (state) => state.request_field,
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

  getStockExpiredEntryLinesList(
    { commit, getters, dispatch },
    { page, field }
  ) {
    if (getters.stockExpiredEntryLines.length > 0 && !field.next) {
      return getters.stockExpiredEntryLines;
    }
    return stockEntryLineService
      .getStockExpiredEntryLinesList(page, field)
      .then(({ data }) => {
        commit('SET_STOCK_EXPIRED_ENTRY_LINES', data);
        dispatch(
          'setGlobalProgress',
          {
            label: 'stock expired entry lines',
            min: 0,
            max: data.last_page,
            value: data.current_page,
          },
          { root: true }
        );

        if (data.next_page_url) {
          return dispatch('getProductsList', {
            page: page + 1,
            field: { ...field, next: true },
          });
        } else dispatch('setGlobalProgress', null, { root: true });
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
  SET_REQUEST_FIELD_VALUE(state, { field, value }) {
    state.request_field[field] = value;
  },
  SET_STOCK_ENTRY_LINES(state, stock_entry_lines) {
    state.stock_entry_lines = JSON.stringify(stock_entry_lines);
  },
  SET_STOCK_EXPIRED_ENTRY_LINES(state, stock_expired_entry_lines) {
    state.stock_expired_entry_lines = JSON.stringify(stock_expired_entry_lines);
  },
  SET_CURRENT_STOCK_ENTRY_LINE(state, stockEntryLine) {
    state.stock_entry_line = JSON.stringify(stockEntryLine);
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
