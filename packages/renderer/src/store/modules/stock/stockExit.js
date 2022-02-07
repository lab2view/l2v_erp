import stockExitService from '../../../services/stocks/StockExitService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

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
  getStockExitList({ commit, getters }, { page, field }) {
    if (getters.stock_exits.length > 0) {
      return getters.stock_exits;
    } else
      return stockExitService.getList(page, field).then(({ data }) => {
        commit('SET_STOCK_EXITS', data);
        return data;
      });
  },

  getStockExit({ getters }, id) {
    const stockExit = getters.stock_exits.find((p) => p.id.toString() === id);
    if (stockExit !== undefined) {
      return stockExit;
    } else
      return stockExitService.get(id).then(({ data }) => {
        return data;
      });
  },

  addStockExit({ commit }, stockExitField) {
    return stockExitService.add(stockExitField).then(({ data }) => {
      commit('ADD_STOCK_EXIT', data);
      notify(
        i18n.global.t('stockExit.form.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateStockExit({ commit }, stockExitField) {
    return stockExitService
      .update(stockExitField, stockExitField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('stockExit.form.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
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
