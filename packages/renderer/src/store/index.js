import { createStore } from 'vuex';
import modulePlugins from './helpers/ModuleLocalForage';
import FileService from '../services/FileService';
import auth from './modules/auth';
import workspace from './modules/workspace';
import product_package from './modules/product/product_package';
import property from './modules/product/property';
import tax from './modules/product/tax';
import price_type from './modules/product/price_type';
import product_family from './modules/product/product_family';
import product_type from './modules/product/product_type';
import product_unit from './modules/product/product_unit';
import product from './modules/product/product';
import article from './modules/product/article';
import stock_exit from './modules/stock/stock_exit';
import article_group from './modules/product/article_group';
import module from './modules/structures/module';
import localization from './modules/structures/localization';
import region from './modules/structures/region';
import country from './modules/structures/country';
import enterprise_type from './modules/structures/enterprise_type';
import enterprise from './modules/structures/enterprise';
import customer_group from './modules/customers/customer_group';
import customer_type from './modules/customers/customer_type';
import customer from './modules/customers/customer';
import inventory from './modules/stock/inventory';
import stock_provision from './modules/stock/provision';
import stock_provider from './modules/stock/provider';
import shipping from './modules/stock/shipping';
import stock_state from './modules/stock/stock_state';
import stock_type from './modules/stock/stock_type';
import stock_entry from './modules/stock/stock_entry';
import transaction from './modules/payments/transaction';
import transaction_type from './modules/payments/transaction_type';
import payment_method from './modules/payments/payment_method';
import payment_charge from './modules/payments/payment_charge';
import discount from './modules/sales/discount';
import discount_type from './modules/sales/discount_type';
import discount_code from './modules/sales/discount_code';
import cash_register from './modules/sales/cash_register';
import cashier from './modules/sales/cashier';
import cashier_group from './modules/sales/cashier_group';
import sale_type from './modules/sales/sale_type';
import SyncService from '/@/services/SyncService.js';
import { getMutationPathName } from '/@/helpers/utils.js';

export default createStore({
  state: {
    globalLoading: true,
    landlordDomain: import.meta.env.VITE_DOMAIN ?? 'kitbussiness.com',
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

    getLastHash(context, module) {
      return SyncService.getLastHash(module).then(({ data }) => data);
    },

    initModuleSynchronisation({ dispatch }, field) {
      return dispatch('fetchSynchronisationChanges', {
        page: 1,
        field: { ...field, paginate: 2 },
      });
    },

    fetchSynchronisationChanges({ commit, dispatch }, { page, field }) {
      return SyncService.getSynchronizationList(page, field).then(
        ({ data }) => {
          let hash = null;
          const changes = data.data ?? [];
          if (changes.length) {
            changes.forEach((change) => {
              const mutation = getMutationPathName(change);
              if (mutation) {
                commit(mutation, change.model, { root: true });
                hash = change.hash;
              }
            });
            commit(`${field.mutation}/SET_${field.module}_HASH`, hash, {
              root: true,
            });
          }
          if (data.next_page_url)
            return dispatch('fetchSynchronisationChanges', {
              page: page + 1,
              field,
            });
          return data;
        }
      );
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
    product_package,
    property,
    tax,
    price_type,
    product_family,
    product_type,
    product_unit,
    article,
    article_group,
    module,
    localization,
    region,
    country,
    enterprise_type,
    enterprise,
    customer_type,
    customer,
    customer_group,
    inventory,
    stock_provider,
    shipping,
    stock_provision,
    stock_state,
    stock_type,
    stock_entry,
    stock_exit,
    payment_method,
    payment_charge,
    transaction,
    transaction_type,
    discount,
    discount_type,
    discount_code,
    sale_type,
    cash_register,
    cashier,
    cashier_group,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [...modulePlugins],
});
