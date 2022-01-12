import { createStore } from 'vuex';
import auth from './modules/auth';
import workspace from './modules/workspace';
import packageConfig from './modules/packageConfig';
import priceTypeConfig from './modules/priceTypeConfig';
import {
  Auth,
  PackageConfig,
  PriceTypeConfig,
} from './helpers/ModuleLocalForage';

export default createStore({
  state: {
    globalLoading: true,
    landlordDomain: 'kitbussiness.test',
  },
  actions: {
    setGlobalLoading({ commit }, loading) {
      commit('SET_GLOBAL_LOADING', loading);
    },
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading;
    },
    SET_LANDLORD_DOMAIN(state, domain) {
      state.landlordDomain = domain;
    },
  },
  modules: {
    auth,
    workspace,
    packageConfig,
    priceTypeConfig,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [Auth.plugin, PackageConfig.plugin, PriceTypeConfig.plugin],
});
