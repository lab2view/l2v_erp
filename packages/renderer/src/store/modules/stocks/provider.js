import providerService from '../../../services/stocks/ProviderService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';
// import shippingService from '/@/services/stocks/ShippingService';

const state = {
  providers: null,
  hash: null,
  provider: null,
};

// getters
const getters = {
  providers: (state) => (state.providers ? JSON.parse(state.providers) : []),
  provider: (state) => (state.provider ? JSON.parse(state.provider) : null),
  getProviderById: (state, getters) => (id) =>
    getters.providers.find((p) => p.id === id),
  getProvidersByFilter: (state, getters) => (filter) => {
    return getters.providers.filter((provider) => {
      let select = true;
      if (filter.country_id) select = provider.country_id === filter.country_id;
      return select;
    });
  },
};

// privileges
const actions = {
  getStockProvidersList({ commit, getters }, { page, field }) {
    if (getters.providers.length > 0 && !field.next) {
      return getters.providers;
    } else
      return providerService.getProvidersList(page, field).then(({ data }) => {
        commit('SET_PROVIDERS', data);
        return data;
      });
  },

  getStockProvider({ getters, commit }, id) {
    const provider = getters.providers.find((p) => p.id.toString() === id);
    if (provider !== undefined) {
      commit('SET_CURRENT_PROVIDER', provider);
      return provider;
    } else
      return providerService.getProvider(id).then(({ data }) => {
        commit('SET_CURRENT_PROVIDER', data);
        return data;
      });
  },

  addStockProvider({ commit }, providerField) {
    return providerService.addProvider(providerField).then(({ data }) => {
      commit('ADD_PROVIDER', data);
      notify(
        i18n.global.t('stocks.provider.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateStockProvider({ commit }, providerField) {
    return providerService
      .updateProvider(providerField, providerField.id)
      .then(({ data }) => {
        commit('UPDATE_PROVIDER', data);
        notify(
          i18n.global.t('stocks.provider.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteStockProvider({ commit }, providerId) {
    return providerService.deleteProvider(providerId).then(({ data }) => {
      commit('DELETE_PROVIDER', providerId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PROVIDERS(state, providers) {
    state.providers = JSON.stringify(providers);
  },
  SET_CURRENT_PROVIDER(state, provider) {
    state.provider = JSON.stringify(provider);
  },
  ADD_PROVIDER(state, provider) {
    let providers = JSON.parse(state.providers);
    providers.push(provider);
    state.providers = JSON.stringify(providers);
  },
  UPDATE_PROVIDER(state, provider) {
    let providers = JSON.parse(state.providers);
    const index = providers.findIndex((p) => p.id === provider.id);
    if (index !== -1) {
      providers.splice(index, 1, provider);
      state.providers = JSON.stringify(providers);
    }
  },
  DELETE_PROVIDER(state, providerId) {
    state.providers = JSON.stringify(
      JSON.parse(state.providers).filter((p) => p.id !== providerId)
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
