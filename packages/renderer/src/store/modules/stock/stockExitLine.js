import stockExitLineService from '../../../services/stocks/StockExitLineService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  stock_exit_lines: null,
  hash: null,
  stockExitLine: null,
};

// getters
const getters = {
  stock_exit_lines: (state) =>
    state.stock_exit_lines ? JSON.parse(state.stock_exit_lines) : [],
  stockExitLine: (state) =>
    state.stockExitLine ? JSON.parse(state.stockExitLine) : null,
  getStockExitLineByProductId: (state, getters) => (product_id) =>
    getters.stock_exit_lines.filter(
      (a) => a.article?.product_id === product_id
    ),
};

// privileges
const actions = {
  getStockExitLineList({ commit, getters }, { page, field }) {
    if (getters.stock_exit_lines.length > 0) {
      return getters.stock_exit_lines;
    } else
      return stockExitLineService.getList(page, field).then(({ data }) => {
        commit('SET_STOCK_EXIT_LINES', data);
        return data;
      });
  },

  getStockExitLine({ getters }, id) {
    const stockExitLine = getters.stock_exit_lines.find(
      (p) => p.id.toString() === id
    );
    if (stockExitLine !== undefined) {
      return stockExitLine;
    } else
      return stockExitLineService.get(id).then(({ data }) => {
        return data;
      });
  },

  addStockExitLine({ commit }, stockExitLineField) {
    return stockExitLineService.add(stockExitLineField).then(({ data }) => {
      commit('ADD_STOCK_EXIT_LINE', data);
      notify(
        i18n.global.t('stockExitLine.form.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateStockExitLine({ commit }, stockExitLineField) {
    return stockExitLineService
      .update(stockExitLineField, stockExitLineField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('stockExitLine.form.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_STOCK_EXIT_LINE', data);
        return data;
      });
  },

  deleteStockExitLine({ commit }, stockExitLineId) {
    return stockExitLineService.delete(stockExitLineId).then(({ data }) => {
      commit('DELETE_STOCK_EXIT_LINE', stockExitLineId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_EXIT_LINES(state, stock_exit_lines) {
    state.stock_exit_lines = JSON.stringify(stock_exit_lines);
  },
  ADD_STOCK_EXIT_LINE(state, stockExitLine) {
    let stock_exit_lines = JSON.parse(state.stock_exit_lines);
    stock_exit_lines.push(stockExitLine);
    state.stock_exit_lines = JSON.stringify(stock_exit_lines);
  },
  UPDATE_STOCK_EXIT_LINE(state, stockExitLine) {
    let stock_exit_lines = JSON.parse(state.stock_exit_lines);
    const index = stock_exit_lines.findIndex((p) => p.id === stockExitLine.id);
    if (index !== -1) {
      stock_exit_lines.splice(index, 1, stockExitLine);
      state.stock_exit_lines = JSON.stringify(stock_exit_lines);
    }
  },
  DELETE_STOCK_EXIT_LINE(state, stockExitLineId) {
    state.stock_exit_lines = JSON.stringify(
      JSON.parse(state.stock_exit_lines).filter((p) => p.id !== stockExitLineId)
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
