import stockExitService from '../../../services/stocks/StockExitService';
import { stockStateCode } from '/@/helpers/codes.js';
import { notify } from '/@/helpers/notify.js';
import i18n from '/@/i18n/index.js';

const state = {
  stock_exits: null,
  hash: null,
  stockExit: null,
  multiple_stock_exits: null,
};

// getters
const getters = {
  stock_exits: (state) =>
    state.stock_exits ? JSON.parse(state.stock_exits) : [],
  getMultipleStockExits: (state) =>
    state.multiple_stock_exits ? JSON.parse(state.multiple_stock_exits) : [],
  haveMultipleStockExit: (state, getters) =>
    getters.getMultipleStockExits.length > 0,
  getStockExitsByProductId: (state, getters) => (product_id) => {
    return getters.stock_exits.filter(
      (se) =>
        se.stock_exit_lines.find(
          (sel) => sel.article.product_id === product_id
        ) !== undefined
    );
  },
  stockExit: (state) => (state.stockExit ? JSON.parse(state.stockExit) : null),
  haveStockExit: (state, getters) => !!getters.stockExit,
  stockExitLines: (state, getters) =>
    getters.haveStockExit ? getters.stockExit.stock_exit_lines : [],
  stockExitReference: (state, getters) => getters.stockExit?.reference,
  stockExitIsConfirm: (state, getters) => {
    return (
      getters.stockExit?.current_state?.stock_state.code ===
        stockStateCode.success ||
      getters.stockExit?.current_state?.stock_state.code ===
        stockStateCode.delivered
    );
  },
  currentStockExitStateDate: (state, getters) =>
    getters.stockExit?.current_state?.updated_at,
  manage_price: () => false,
};

// privileges
const actions = {
  getStockExitsList({ commit, getters, dispatch }, { page, field }) {
    if (getters.stock_exits.length > 0 && !field.next) {
      return getters.stock_exits;
    } else
      return stockExitService
        .getList(page, { ...field, paginate: 20 })
        .then(({ data }) => {
          commit('SET_STOCK_EXITS', data);

          dispatch(
            'setGlobalProgress',
            {
              label: 'Exit stocks',
              min: 0,
              max: data.last_page,
              value: data.current_page,
            },
            { root: true }
          );

          if (data.next_page_url) {
            return dispatch('getStockExitsList', {
              page: page + 1,
              field: { ...field, next: true },
            });
          } else dispatch('setGlobalProgress', null, { root: true });

          return data;
        })
        .catch((error) => {
          commit('SET_STOCK_EXITS', []);
          return Promise.reject(error);
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
      commit('SET_CURRENT_STOCK_EXIT', data);
      return data;
    });
  },

  async addStockExitToMultipleStructures(
    { commit },
    { stockExitField, receiverEnterprises }
  ) {
    return Promise.all(
      receiverEnterprises.map(async (receiver) => {
        await stockExitService
          .add({
            ...stockExitField,
            enterprise_receiver_id: receiver.id,
            reference: `${stockExitField.reference}-${receiver.id}`,
          })
          .then(({ data }) => {
            commit('ADD_STOCK_EXIT', data);
            commit('ADD_MULTIPLE_STOCK_EXIT', data);
          });
      })
    );
  },

  updateStockExit({ commit }, stockExitField) {
    return stockExitService
      .update(stockExitField, stockExitField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_EXIT', data);
        commit('SET_CURRENT_STOCK_EXIT', data);
        return data;
      });
  },

  deleteStockExit({ commit }, stockExitId) {
    return stockExitService.delete(stockExitId).then(({ data }) => {
      commit('DELETE_STOCK_EXIT', stockExitId);
      return data;
    });
  },

  changeStockExitState({ commit, getters }, stock_state_id) {
    return stockExitService
      .setStockExitState(getters.stockExit.id, stock_state_id)
      .then(({ data }) => {
        commit('ADD_STOCK_EXIT_STATE', data);
        notify(
          i18n.global.t('stocks.stockExit.updateStock'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },

  addStockExitLines({ commit, getters }, stockExitLines) {
    return stockExitService
      .addStockExitLines(getters.stockExit.id, stockExitLines)
      .then(({ data }) => {
        commit('ADD_STOCK_EXIT_LINES', data.stock_exit_lines);
      });
  },
  updateStockExitLine({ commit }, stockExitLine) {
    return stockExitService
      .updateStockExitLine(stockExitLine)
      .then(({ data }) => {
        commit('UPDATE_STOCK_EXIT_LINE', data);
        notify(
          i18n.global.t('stocks.exitLine.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
  removeStockExitLines({ getters, commit }, stockExitLineIds) {
    return stockExitService
      .removeStockExitLines(getters.stockExit.id, {
        stock_exit_line_ids: [...stockExitLineIds],
      })
      .then(() => {
        commit('REMOVE_STOCK_EXIT_LINES', stockExitLineIds);
      });
  },
};

// mutations
const mutations = {
  SET_STOCK_EXITS(state, { current_page, data }) {
    if (current_page === 1) state.stock_exits = JSON.stringify(data);
    else {
      let oldItems = state.stock_exits ? JSON.parse(state.stock_exits) : [];
      state.stock_exits = JSON.stringify([...oldItems, ...data]);
    }
  },
  SET_CURRENT_STOCK_EXIT(state, stockExit) {
    state.stockExit = stockExit ? JSON.stringify(stockExit) : null;
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
      JSON.parse(state.stock_exits).filter(
        (p) => p.id.toString() !== stockExitId.toString()
      )
    );
  },

  ADD_STOCK_EXIT_LINES(state, stock_exit_lines) {
    let stock_exits = state.stock_exits ? JSON.parse(state.stock_exits) : [];
    let stockExit = state.stockExit ? JSON.parse(state.stockExit) : null;
    let index = stock_exits.findIndex((se) => se.id === stockExit.id);
    if (index !== -1) {
      stockExit.stock_exit_lines = [
        ...stockExit.stock_exit_lines,
        ...stock_exit_lines,
      ];
      stock_exits.splice(index, 1, stockExit);
      state.stockExit = JSON.stringify(stockExit);
      state.stock_exits = JSON.stringify(stock_exits);
    }
  },
  UPDATE_STOCK_EXIT_LINE(state, stockExitLine) {
    let stock_exits = state.stock_exits ? JSON.parse(state.stock_exits) : [];
    let stockExit = state.stockExit ? JSON.parse(state.stockExit) : null;
    let index = stock_exits.findIndex((se) => se.id === stockExit.id);
    if (index !== -1) {
      let art = stockExit.stock_exit_lines.findIndex(
        (p) => p.id === stockExitLine.id
      );
      if (art !== -1) {
        stockExit.stock_exit_lines.splice(art, 1, stockExitLine);
        stock_exits.splice(index, 1, stockExit);
        state.stockExit = JSON.stringify(stockExit);
        state.stock_exits = JSON.stringify(stock_exits);
      }
    }
  },
  REMOVE_STOCK_EXIT_LINES(state, stock_exit_lines_ids) {
    let stock_exits = state.stock_exits ? JSON.parse(state.stock_exits) : [];
    let stockExit = state.stockExit ? JSON.parse(state.stockExit) : null;
    let index = stock_exits.findIndex((se) => se.id === stockExit.id);
    if (index !== -1) {
      stockExit.stock_exit_lines = stockExit.stock_exit_lines.filter((cp) => {
        return stock_exit_lines_ids.find((id) => id === cp.id) === undefined;
      });
      stock_exits.splice(index, 1, stockExit);
      state.stockExit = JSON.stringify(stockExit);
      state.stock_exits = JSON.stringify(stock_exits);
    }
  },

  ADD_STOCK_EXIT_STATE(state, stockState) {
    let stock_exits = state.stock_exits ? JSON.parse(state.stock_exits) : [];
    let stockExit = state.stockExit ? JSON.parse(state.stockExit) : null;
    let index = stock_exits.findIndex((se) => se.id === stockExit.id);
    if (index !== -1) {
      let oldActInd = stockExit.stock_exit_states.findIndex(
        (st) => st.is_active
      );
      if (oldActInd !== -1) {
        stockExit.stock_exit_states.splice(oldActInd, 1, {
          ...stockExit.stock_exit_states[oldActInd],
          is_active: false,
        });
      }
      stockExit.stock_exit_states.push(stockState);
      stockExit.current_state = stockState;
      stock_exits.splice(index, 1, stockExit);
      state.stockExit = JSON.stringify(stockExit);
      state.stock_exits = JSON.stringify(stock_exits);
    }
  },

  ADD_MULTIPLE_STOCK_EXIT(state, stockExit) {
    let multiple_stock_exits = state.multiple_stock_exits
      ? JSON.parse(state.multiple_stock_exits)
      : [];
    multiple_stock_exits.push(stockExit);
    state.multiple_stock_exits = JSON.stringify(multiple_stock_exits);
  },

  RESET_MULTIPLE_STOCK_EXIT(state) {
    state.multiple_stock_exits = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
