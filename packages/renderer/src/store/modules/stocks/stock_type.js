import stockTypeService from '../../../services/stocks/StockTypeService';

const state = {
  stock_types: null,
  hash: null,
  stockType: null,
};

// getters
const getters = {
  stock_types: (state) => {
    return state.stock_types ? JSON.parse(state.stock_types) : [];
  },
  stockType: (state) => (state.stockType ? JSON.parse(state.stockType) : null),
  getListByTypeFor: (state, getters) => (typeFor) => {
    return getters.stock_types.filter(
      (st) => st.type_for === typeFor || st.type_for === null
    );
  },
};

const actions = {
  getStockTypesList({ commit, getters }, { page, field }) {
    if (getters.stock_types.length > 0 && !field.next) {
      return getters.stock_types;
    }
    return stockTypeService.getStockTypesList(page, field).then(({ data }) => {
      commit('SET_STOCK_TYPES', data);
      return data;
    });
  },

  getStockType({ getters, commit }, id) {
    const stockType = getters.stock_types.find((p) => p.id.toString() === id);
    if (stockType !== undefined) {
      commit('SET_CURRENT_STOCK_TYPE', stockType);
      return stockType;
    }

    return stockTypeService.getStockType(id).then(({ data }) => {
      commit('SET_CURRENT_STOCK_TYPE', data);
      return data;
    });
  },

  addStockType({ commit }, stockTypeField) {
    return stockTypeService.addStockType(stockTypeField).then(({ data }) => {
      commit('ADD_STOCK_TYPE', data);
      return data;
    });
  },

  updateStockType({ commit }, stockTypeField) {
    return stockTypeService
      .updateStockType(stockTypeField, stockTypeField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_TYPE', data);
        return data;
      });
  },

  deleteStockType({ commit }, stockTypeId) {
    return stockTypeService.deleteStockType(stockTypeId).then(({ data }) => {
      commit('DELETE_STOCK_TYPE', stockTypeId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_TYPES(state, stock_types) {
    state.stock_types = JSON.stringify(stock_types);
  },
  SET_CURRENT_STOCK_TYPE(state, stockType = null) {
    state.stockType = stockType ? JSON.stringify(stockType) : null;
  },
  ADD_STOCK_TYPE(state, stockType) {
    let stock_types = null;
    if (state.stock_types) {
      stock_types = JSON.parse(state.stock_types);
      stock_types.push(stockType);
    } else {
      stock_types = [stockType];
    }
    state.stock_types = JSON.stringify(stock_types);
  },
  UPDATE_STOCK_TYPE(state, stockType) {
    let stock_types = JSON.parse(state.stock_types);
    const index = stock_types.findIndex((p) => p.id === stockType.id);
    if (index !== -1) {
      stock_types.splice(index, 1, stockType);
    }
    state.stock_types = JSON.stringify(stock_types);
  },
  DELETE_STOCK_TYPE(state, stockTypeId) {
    state.stock_types = JSON.stringify(
      JSON.parse(state.stock_types).filter((p) => p.id !== stockTypeId)
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
