import cashierService from '../../../services/sales/CashierService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  cashier_sessions: null,
  current_session: null,
};

// getters
const getters = {
  cashierSessions: (state) =>
    state.cashier_sessions ? JSON.parse(state.cashier_sessions) : [],
  currentSession: (state) =>
    state.current_session ? JSON.parse(state.current_session) : null,
};

// privileges
const actions = {
  addCashier({ commit }, cashierField) {
    return cashierService.addCashier(cashierField).then(({ data }) => {
      commit('ADD_CASHIER', data);
      notify(
        i18n.global.t('sales.cashier.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_CASHIERS(state, cashiers) {
    state.cashiers = JSON.stringify(cashiers);
  },
  SET_CURRENT_CASHIER(state, cashier) {
    state.cashier = JSON.stringify(cashier);
  },
  ADD_CASHIER(state, cashier) {
    let cashiers = JSON.parse(state.cashiers);
    cashiers.push(cashier);
    state.cashiers = JSON.stringify(cashiers);
  },
  UPDATE_CASHIER(state, cashier) {
    let cashiers = JSON.parse(state.cashiers);
    const index = cashiers.findIndex((p) => p.id === cashier.id);
    if (index !== -1) {
      cashiers.splice(index, 1, cashier);
      state.cashiers = JSON.stringify(cashiers);
    }
  },
  DELETE_CASHIER(state, cashierId) {
    state.cashiers = JSON.stringify(
      JSON.parse(state.cashiers).filter((p) => p.id !== cashierId)
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
