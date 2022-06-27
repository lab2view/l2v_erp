import cashierService from '../../../services/sales/CashierService';
import { sumBy } from 'lodash';
import SaleService from '/@/services/sales/SaleService.js';

const state = {
  cashier_sessions: null,
  current_session: null,
  localSales: null,
  saleRequests: [],
  price_type_id: null,
  currentSaleRequest: {
    sale_type_id: null,
    discount_code: null,
    discount: null,
    cashout: null,
    cashin: null,
    discount_id: null,
    customer_id: null,
    cashier_id: null,
    cashier_session_id: null,
    payment_method_id: null,
    created_at: null,
    stock_exit_lines: [],
    refund_voucher_amount: null,
    refund_voucher_code: null,
    refund_voucher_expired_at: null,
    refund_voucher_note: null,
  },
};

// getters
const getters = {
  cashierSessions: (state) => state.cashier_sessions,
  currentSession: (state) => state.current_session,
  currentSaleRequest: (state) => state.currentSaleRequest,
  stock_exit_lines: (state) => state.currentSaleRequest.stock_exit_lines,
  isCurrentSaleHaveArticle: (state, getters) => getters.stock_exit_lines.length,
  saleRequests: (state) => state.saleRequests,
  getCurrentSaleArticleCount: (state, getters) =>
    getters.stock_exit_lines?.length,
  getCurrentSaleSupAmount: (state, getters) => {
    return sumBy(getters.stock_exit_lines, 'sup_price');
  },
  getCurrentSaleDiscountAmount: (state, getters) => {
    return getters.currentSaleRequest.discount ?? 0;
  },
  getCurrentSaleTaxAmount: () => {
    return 0;
  },
  getCurrentSaleTotalAmount: (state, getters) => {
    return (
      getters.getCurrentSaleSupAmount - getters.currentSaleRequest.discount
    );
  },
  getCurrentSaleCashOutAmount: (state, getters) => {
    if (getters.currentSaleRequest.cashin) {
      const cashOut =
        parseFloat(getters.currentSaleRequest.cashin) -
        parseFloat(getters.getCurrentSaleTotalAmount);
      return cashOut > 0 ? cashOut : 0;
    } else return 0;
  },
};

// privileges
const actions = {
  openSession({ commit }, cashierSession) {
    return cashierService
      .openSession(cashierSession)
      .then(({ data }) => {
        commit('SET_CASHIER_SESSION', data);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },
  closeSession({ commit, getters }, cashierSessionId = null) {
    return cashierService
      .closeSession(cashierSessionId ?? getters.currentSession.id)
      .then(({ data }) => {
        commit('SET_CASHIER_SESSION', null);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },

  processToCurrentSaleRequest({ commit, getters }) {
    const payload = {
      ...getters.currentSaleRequest,
      cashier_session_id: getters.currentSession.id,
      cashier_id: getters.currentSession.cashier_id,
      cashout: getters.getCurrentSaleCashOutAmount,
      stock_exit_lines: [
        ...getters.currentSaleRequest.stock_exit_lines.map((sel) => {
          let obj = { ...sel };
          delete obj.label;
          delete obj.image;
          delete obj.stock;
          delete obj.barcode;
          return obj;
        }),
      ],
    };
    return SaleService.addSale(payload)
      .then(({ data }) => {
        commit('ADD_SALE_REQUESTS', data);
        console.log(payload);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },

  saveCurrentSaleInBackground({ getters, commit }) {
    commit('ADD_SALE_REQUESTS', {
      ...getters.currentSaleRequest,
      background_at: new Date(),
      amount: getters.getCurrentSaleTotalAmount,
    });
    commit('RESET_CURRENT_SALE_REQUEST_FIELDS');
    return true;
  },
};

// mutations
const mutations = {
  SET_CASHIER_SESSION(state, data) {
    state.current_session = data;
    setTimeout(() => {
      if (window?.ipcRenderer)
        window?.ipcRenderer?.send('reload', 'User open cashier session');
      else location.reload();
    }, 500);
  },
  ADD_CASHIER_SESSION(state, cashier_session) {
    state.cashier_sessions.push(cashier_session);
  },
  UPDATE_CASHIER_SESSION(state, cashier_session) {
    const index = state.cashier_sessions.findIndex(
      (p) => p.id === cashier_session.id
    );
    if (index !== -1) {
      state.cashier_sessions.splice(index, 1, cashier_session);
    }
  },
  DELETE_CASHIER_SESSION(state, cashier_session_id) {
    state.cashier_sessions = state.cashier_sessions.filter(
      (p) => p.id !== cashier_session_id
    );
  },

  ADD_SALE_REQUESTS(state, saleRequest) {
    state.saleRequests.push(saleRequest);
  },
  REMOVE_SALE_REQUEST(state, index) {
    state.saleRequests = state.saleRequests.filter((sr, ind) => ind !== index);
  },
  RESTORE_CURRENT_SALE_REQUEST(state, saleRequest) {
    delete saleRequest.amount;
    delete saleRequest.background_at;
    state.currentSaleRequest = saleRequest;
  },
  RESET_CURRENT_SALE_REQUEST(state) {
    state.currentSaleRequest.stock_exit_lines = [];
    state.currentSaleRequest.cashin = null;
    state.currentSaleRequest.customer_id = null;
    state.currentSaleRequest.discount = null;
    state.currentSaleRequest.discount_id = null;
  },
  SET_CURRENT_SALE_REQUEST_FIELD(state, { field, value }) {
    state.currentSaleRequest[field] = value;
  },
  SET_PRICE_TYPE_ID(state, value) {
    state.price_type_id = value;
  },
  SET_CURRENT_SALE_REQUEST_ARTICLE_LINES(state, articleLines) {
    state.currentSaleRequest.stock_exit_lines = articleLines;
  },
  RESET_CURRENT_SALE_REQUEST_FIELDS(state) {
    state.currentSaleRequest.stock_exit_lines = [];
    state.currentSaleRequest.customer_id = null;
    state.currentSaleRequest.cashin = null;
    state.currentSaleRequest.cashout = null;
    state.currentSaleRequest.discount_id = null;
    state.currentSaleRequest.discount = null;
    state.currentSaleRequest.discount_code = null;
  },
  ADD_ARTICLE_TO_CURRENT_SALE_REQUEST(state, articleLine) {
    let alIndex = state.currentSaleRequest.stock_exit_lines.findIndex(
      (al) => al.article_id === articleLine.article_id
    );
    if (alIndex !== -1) {
      let al = { ...state.currentSaleRequest.stock_exit_lines[alIndex] };
      al.quantity++;
      al.sup_price = al.quantity * al.price;
      state.currentSaleRequest.stock_exit_lines.splice(alIndex, 1, al);
    } else state.currentSaleRequest.stock_exit_lines.push(articleLine);
  },
  UPDATE_CURRENT_REQUEST_ARTICLE_QUANTITY(state, { articleId, quantity }) {
    let alIndex = state.currentSaleRequest.stock_exit_lines.findIndex(
      (al) => al.article_id === articleId
    );
    if (alIndex !== -1) {
      let al = { ...state.currentSaleRequest.stock_exit_lines[alIndex] };
      al.quantity = quantity;
      al.sup_price = al.quantity * al.price;
      state.currentSaleRequest.stock_exit_lines.splice(alIndex, 1, al);
    }
  },
  REMOVE_ARTICLE_TO_CURRENT_SALE_REQUEST(state, articleId) {
    state.currentSaleRequest.stock_exit_lines =
      state.currentSaleRequest.stock_exit_lines.filter(
        (a) => a.article_id !== articleId
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
