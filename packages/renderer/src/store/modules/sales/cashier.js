import cashierService from '../../../services/sales/CashierService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  cashiers: null,
  hash: null,
  cashier: null,
};

// getters
const getters = {
  cashiers: (state) => (state.cashiers ? JSON.parse(state.cashiers) : []),
  cashier: (state) => (state.cashier ? JSON.parse(state.cashier) : null),
};

// privileges
const actions = {
  getCashiersList({ commit, getters }, { page, field }) {
    if (getters.cashiers.length > 0 && !field.next) {
      return getters.cashiers;
    }
    return cashierService.getCashiersList(page, field).then(({ data }) => {
      commit('SET_CASHIERS', data);
      return data;
    });
  },

  getCashier({ commit, getters }, id) {
    const cashier = getters.cashiers.find((p) => p.id.toString() === id);
    if (cashier !== undefined) {
      commit('SET_CURRENT_CASHIER', cashier);
      return cashier;
    }
    return cashierService.getCashier(id).then(({ data }) => {
      commit('SET_CURRENT_CASHIER', data);
      return data;
    });
  },

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

  updateCashier({ commit }, cashierField) {
    return cashierService
      .updateCashier(cashierField, cashierField.id)
      .then(({ data }) => {
        commit('UPDATE_CASHIER', data);
        notify(
          i18n.global.t('sales.cashier.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteCashier({ commit }, cashierId) {
    return cashierService.deleteCashier(cashierId).then(({ data }) => {
      commit('DELETE_CASHIER', cashierId);
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
