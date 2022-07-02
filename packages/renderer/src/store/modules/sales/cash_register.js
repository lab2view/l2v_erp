import cashRegisterService from '../../../services/sales/CashRegisterService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  cashRegisters: null,
  hash: null,
  cashRegister: null,
};

// getters
const getters = {
  cashRegisters: (state) =>
    state.cashRegisters ? JSON.parse(state.cashRegisters) : [],
  cashRegister: (state) =>
    state.cashRegister ? JSON.parse(state.cashRegister) : null,
};

// privileges
const actions = {
  getCashRegistersList({ commit, getters }, { page, field }) {
    if (getters.cashRegisters.length > 0) {
      return getters.cashRegisters;
    }
    return cashRegisterService
      .getCashRegistersList(page, field)
      .then(({ data }) => {
        commit('SET_CASH_REGISTERS', data);
        return data;
      });
  },

  getCashRegister({ commit, getters }, id) {
    const cashRegister = getters.cashRegisters.find(
      (p) => p.id.toString() === id
    );
    if (cashRegister !== undefined) {
      commit('SET_CURRENT_CASH_REGISTER', cashRegister);
      return cashRegister;
    }
    return cashRegisterService.getCashRegister(id).then(({ data }) => {
      commit('SET_CURRENT_CASH_REGISTER', data);
      return data;
    });
  },

  addCashRegister({ commit }, cashRegisterField) {
    return cashRegisterService
      .addCashRegister(cashRegisterField)
      .then(({ data }) => {
        commit('ADD_CASH_REGISTER', data);
        notify(
          i18n.global.t('sales.cashRegister.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateCashRegister({ commit }, cashRegisterField) {
    return cashRegisterService
      .updateCashRegister(cashRegisterField, cashRegisterField.id)
      .then(({ data }) => {
        commit('UPDATE_CASH_REGISTER', data);
        notify(
          i18n.global.t('sales.cashRegister.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateStatusCashRegister({ commit }, cashRegisterField) {
    return cashRegisterService
      .updateStatusCashRegister(cashRegisterField, cashRegisterField.id)
      .then(({ data }) => {
        commit('UPDATE_CASH_REGISTER', data);
        notify(
          i18n.global.t('sales.cashRegister.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteCashRegister({ commit }, cashRegisterId) {
    return cashRegisterService
      .deleteCashRegister(cashRegisterId)
      .then(({ data }) => {
        commit('DELETE_CASH_REGISTER', cashRegisterId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_CASH_REGISTERS(state, cashRegisters) {
    state.cashRegisters = JSON.stringify(cashRegisters);
  },
  SET_CURRENT_CASH_REGISTER(state, cashRegister) {
    state.cashRegister = JSON.stringify(cashRegister);
  },
  ADD_CASH_REGISTER(state, cashRegister) {
    let cashRegisters = JSON.parse(state.cashRegisters);
    cashRegisters.push(cashRegister);
    state.cashRegisters = JSON.stringify(cashRegisters);
  },
  UPDATE_CASH_REGISTER(state, cashRegister) {
    let cashRegisters = JSON.parse(state.cashRegisters);
    const index = cashRegisters.findIndex((p) => p.id === cashRegister.id);
    if (index !== -1) {
      cashRegisters.splice(index, 1, cashRegister);
      state.cashRegisters = JSON.stringify(cashRegisters);
    }
  },
  DELETE_CASH_REGISTER(state, cashRegisterId) {
    state.cashRegisters = JSON.stringify(
      JSON.parse(state.cashRegisters).filter((p) => p.id !== cashRegisterId)
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
