import { createStore } from 'vuex';
import auth from './modules/auth';
import workspace from './modules/workspace';
import packageConfig from './modules/packageConfig';
import propertyConfig from './modules/propertyConfig';
import taxConfig from './modules/taxConfig';
import priceTypeConfig from './modules/priceTypeConfig';
import productConfig from './modules/productConfig';
import productFamilyConfig from './modules/productFamilyConfig';
import productTypeConfig from './modules/productTypeConfig';
import productUnitConfig from './modules/productUnitConfig';
import {
  Auth,
  PackageConfig,
  PropertyConfig,
  TaxConfig,
  PriceTypeConfig,
  ProductConfig,
  ProductFamilyConfig,
  ProductTypeConfig,
  ProductUnitConfig,
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
    propertyConfig,
    taxConfig,
    priceTypeConfig,
    productFamilyConfig,
    productConfig,
    productTypeConfig,
    productUnitConfig,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    Auth.plugin,
    PackageConfig.plugin,
    PropertyConfig.plugin,
    TaxConfig.plugin,
    PriceTypeConfig.plugin,
    ProductConfig.plugin,
    ProductFamilyConfig.plugin,
    ProductTypeConfig.plugin,
    ProductUnitConfig.plugin,
  ],
});
