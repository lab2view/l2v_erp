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
import stock_exit from './modules/stock/stockExit';
import stock_exit_line from './modules/stock/stockExitLine';
import article_group from './modules/product/articleGroup';
import module from './modules/structures/module';
import localization from './modules/structures/localization';
import region from './modules/structures/region';
import country from './modules/structures/country';
import enterpriseTypeConfig from './modules/structures/enterpriseTypeConfig';
import enterprise from './modules/structures/enterprise';
import customer_group from './modules/customers/customerGroup';
import customerType from './modules/customers/customerType';
import customer from './modules/customers/customer';
import inventory from './modules/stock/inventory';
import stock_provision from './modules/stock/provision';
import stock_provider from './modules/stock/provider';
import shipping from './modules/stock/shipping';
import stock_state from './modules/stock/stockState';
import stock_type from './modules/stock/stockType';
import stock_entry from './modules/stock/stockEntry';
import stock_entry_line from './modules/stock/stockEntryLine';
import transaction from './modules/payments/transaction';
import transactionType from './modules/payments/transactionType';
import paymentMethod from './modules/payments/paymentMethod';
import paymentCharge from './modules/payments/paymentCharge';
import discount from './modules/sales/discount';
import discountType from './modules/sales/discountType';
import discountCode from './modules/sales/discountCode';
import cashRegister from './modules/sales/cashRegister';
import cashier from './modules/sales/cashier';
import cashierGroup from './modules/sales/cashierGroup';
import saleType from './modules/sales/saleType';


export default createStore({
  state: {
    globalLoading: true,
    landlordDomain: 'kitbussiness.com',
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
    stock_exit,
    stock_exit_line,
    article_group,
    module,
    localization,
    region,
    country,
    enterpriseTypeConfig,
    enterprise,
    customerType,
    customer,
    customer_group,
    inventory,
    stock_provider,
    shipping,
    stock_provision,
    stock_state,
    stock_type,
    stock_entry,
    stock_entry_line,
    paymentMethod,
    paymentCharge,
    transaction,
    transactionType,
    discount,
    discountType,
    discountCode,
    saleType,
    cashRegister,
    cashier,
    cashierGroup,
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [...modulePlugins],
});
