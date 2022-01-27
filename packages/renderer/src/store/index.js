import { createStore } from 'vuex';
import modulePlugins from './helpers/ModuleLocalForage';
import FileService from '../services/FileService';
import auth from './modules/auth';
import workspace from './modules/workspace';
import packageConfig from './modules/product/packageConfig';
import propertyConfig from './modules/product/propertyConfig';
import taxConfig from './modules/product/taxConfig';
import priceTypeConfig from './modules/product/priceTypeConfig';
import productFamilyConfig from './modules/product/productFamilyConfig';
import productTypeConfig from './modules/product/productTypeConfig';
import productUnitConfig from './modules/product/productUnitConfig';
import product from './modules/product/product';
import article from './modules/product/article';

export default createStore({
  state: {
    globalLoading: true,
    landlordDomain: 'kitbussiness.test',
    uploaded: null,
    initiateApp: true,
  },
  actions: {
    setGlobalLoading({ commit }, loading) {
      commit('SET_GLOBAL_LOADING', loading);
    },
    setInitiateApp({ commit }, value) {
      commit('SET_INITIATE_APP', value);
    },
    upload({ commit }, formData) {
      return FileService.upload(formData).then(({ data }) => {
        commit('SET_FRESH_UPLOADED', data);
        return data;
      });
    },
  },
  mutations: {
    SET_GLOBAL_LOADING(state, loading) {
      state.globalLoading = loading;
    },
    SET_LANDLORD_DOMAIN(state, domain) {
      state.landlordDomain = domain;
    },
    SET_FRESH_UPLOADED(state, data) {
      state.uploaded = data;
    },
    SET_INITIATE_APP(state, value) {
      state.initiateApp = value;
    },
  },
  modules: {
    auth,
    workspace,
    product,
    packageConfig,
    propertyConfig,
    taxConfig,
    priceTypeConfig,
    productFamilyConfig,
    productTypeConfig,
    productUnitConfig,
    article,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [...modulePlugins],
});
