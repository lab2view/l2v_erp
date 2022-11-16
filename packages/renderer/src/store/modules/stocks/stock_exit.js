import stockExitService from '/@/services/stocks/StockExitService';
import { stockStateCode } from '/@/helpers/codes';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n/index';

const state = {
  stock_exits: [],
  hash: null,
  stock_exit: null,
  multiple_stock_exits: [],
  request_field: {
    enterprise_id: null,
    stock_type_id: null,
    stock_state_id: null,
    created_at: null,
    keyword: null,
  },
};

// getters
const getters = {
  stock_exits: (state) => state.stock_exits,
  requestField: (state) => state.request_field,
  getMultipleStockExits: (state) => state.multiple_stock_exits ?? [],
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
  stockExit: (state) => state.stock_exit,
  haveStockExit: (state, getters) => !!getters.stockExit,
  stockExitLines: (state, getters) =>
    getters.haveStockExit ? getters.stockExit.stock_exit_lines : [],
  stockExitReference: (state, getters) => getters.stockExit?.reference,
  stockExitTitleName: (state, getters) =>
    getters.stockExit?.stock_type?.label ??
    i18n.global.t('stocks.exitLine.list'),
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
    const stockExit = getters.stock_exits.find((se) => se.id.toString() === id);
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
    const totalAvailable =
      parseInt(stockExitLine.old_quantity) +
      parseInt(stockExitLine.article.stock.available);
    if (totalAvailable >= stockExitLine.quantity)
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
    state.stock_exits =
      current_page === 1 ? data : [...state.stock_exits, ...data];
  },
  SET_CURRENT_STOCK_EXIT(state, stockExit) {
    state.stock_exit = stockExit;
  },
  ADD_STOCK_EXIT(state, stockExit) {
    state.stock_exits.push(stockExit);
  },
  UPDATE_STOCK_EXIT(state, stockExit) {
    const index = state.stock_exits.findIndex((se) => se.id === stockExit.id);
    if (index !== -1) {
      state.stock_exits.splice(index, 1, stockExit);
    }
  },
  DELETE_STOCK_EXIT(state, stockExitId) {
    state.stock_exits = state.stock_exits.filter(
      (se) => se.id.toString() !== stockExitId.toString()
    );
  },

  ADD_STOCK_EXIT_LINES(state, stock_exit_lines) {
    const index = state.stock_exits.findIndex(
      (se) => se.id === state.stock_exit.id
    );
    if (index !== -1) {
      state.stock_exit.stock_exit_lines = [
        ...state.stock_exit.stock_exit_lines,
        ...stock_exit_lines,
      ];
      state.stock_exits.splice(index, 1, state.stock_exit);
    }
  },
  UPDATE_STOCK_EXIT_LINE(state, stockExitLine) {
    const index = state.stock_exits.findIndex(
      (se) => se.id === state.stock_exit.id
    );
    if (index !== -1) {
      let art = state.stock_exit.stock_exit_lines.findIndex(
        (sel) => sel.id === stockExitLine.id
      );
      if (art !== -1) {
        state.stock_exit.stock_exit_lines.splice(art, 1, stockExitLine);
        state.stock_exits.splice(index, 1, state.stock_exit);
      }
    }
  },
  REMOVE_STOCK_EXIT_LINES(state, stock_exit_lines_ids) {
    const index = state.stock_exits.findIndex(
      (se) => se.id === state.stock_exit.id
    );
    if (index !== -1) {
      state.stock_exit.stock_exit_lines =
        state.stock_exit.stock_exit_lines.filter((cp) => {
          return stock_exit_lines_ids.find((id) => id === cp.id) === undefined;
        });
      state.stock_exits.splice(index, 1, state.stock_exit);
    }
  },

  ADD_STOCK_EXIT_STATE(state, stockState) {
    const index = state.stock_exits.findIndex(
      (se) => se.id === state.stock_exit.id
    );
    if (index !== -1) {
      let oldActInd = state.stock_exit.stock_exit_states.findIndex(
        (st) => st.is_active
      );
      if (oldActInd !== -1) {
        state.stock_exit.stock_exit_states.splice(oldActInd, 1, {
          ...state.stock_exit.stock_exit_states[oldActInd],
          is_active: false,
        });
      }
      state.stock_exit.stock_exit_states.push(stockState);
      state.stock_exit.current_state = stockState;
      state.stock_exits.splice(index, 1, state.stock_exit);
    }
  },

  ADD_MULTIPLE_STOCK_EXIT(state, stockExit) {
    state.multiple_stock_exits.push(stockExit);
  },

  RESET_MULTIPLE_STOCK_EXIT(state) {
    state.multiple_stock_exits = [];
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
