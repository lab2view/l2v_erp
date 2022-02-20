import stockProviderService from '../../../services/stocks/ProviderService';

const state = {
  stock_providers: null,
  hash: null,
  stockProvider: null,
};

// getters
const getters = {
  stock_providers: (state) =>
    state.stock_providers ? JSON.parse(state.stock_providers) : [],
  stockProvider: (state) =>
    state.stockProvider ? JSON.parse(state.stockProvider) : null,
};

// privileges
const actions = {
  getStockProvidersList({ commit, getters }, { page, field }) {
    if (getters.stock_providers.length > 0) {
      return getters.stock_providers;
    } else
      return stockProviderService.getList(page, field).then(({ data }) => {
        commit('SET_STOCK_PROVIDERS', data);
        return data;
      });
  },

  getStockProvider({ getters }, id) {
    const stockProvider = getters.stock_providers.find(
      (p) => p.id.toString() === id
    );
    if (stockProvider !== undefined) {
      return stockProvider;
    } else
      return stockProviderService.get(id).then(({ data }) => {
        return data;
      });
  },

  addStockProvider({ commit }, stockProviderField) {
    return stockProviderService.add(stockProviderField).then(({ data }) => {
      commit('ADD_STOCK_PROVIDER', data);
      return data;
    });
  },

  updateStockProvider({ commit }, stockProviderField) {
    return stockProviderService
      .update(stockProviderField, stockProviderField.id)
      .then(({ data }) => {
        commit('UPDATE_STOCK_PROVIDER', data);
        return data;
      });
  },

  deleteStockProvider({ commit }, stockProviderId) {
    return stockProviderService.delete(stockProviderId).then(({ data }) => {
      commit('DELETE_STOCK_PROVIDER', stockProviderId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_STOCK_PROVIDERS(state, stock_providers) {
    state.stock_providers = JSON.stringify(stock_providers);
  },
  ADD_STOCK_PROVIDER(state, stockProvider) {
    let stock_providers = JSON.parse(state.stock_providers);
    stock_providers.push(stockProvider);
    state.stock_providers = JSON.stringify(stock_providers);
  },
  UPDATE_STOCK_PROVIDER(state, stockProvider) {
    let stock_providers = JSON.parse(state.stock_providers);
    const index = stock_providers.findIndex((p) => p.id === stockProvider.id);
    if (index !== -1) {
      stock_providers.splice(index, 1, stockProvider);
      state.stock_providers = JSON.stringify(stock_providers);
    }
  },
  DELETE_STOCK_PROVIDER(state, stockProviderId) {
    state.stock_providers = JSON.stringify(
      JSON.parse(state.stock_providers).filter(
        (p) => p.id !== stockProviderId
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
