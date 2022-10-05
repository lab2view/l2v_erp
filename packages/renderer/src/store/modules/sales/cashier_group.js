import cashierGroupService from '../../../services/sales/CashierGroupService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  cashierGroups: null,
  hash: null,
  cashierGroup: null,
};

// getters
const getters = {
  cashierGroups: (state) =>
    state.cashierGroups ? JSON.parse(state.cashierGroups) : [],
  cashierGroup: (state) =>
    state.cashierGroup ? JSON.parse(state.cashierGroup) : null,
};

// privileges
const actions = {
  getCashierGroupsList({ commit, getters }, { page, field }) {
    if (getters.cashierGroups.length > 0 && !field.next) {
      return getters.cashierGroups;
    }
    return cashierGroupService
      .getCashierGroupsList(page, field)
      .then(({ data }) => {
        commit('SET_CASHIER_GROUPS', data);
        return data;
      });
  },

  getCashierGroup({ commit, getters }, id) {
    const cashierGroup = getters.cashierGroups.find(
      (p) => p.id.toString() === id
    );
    if (cashierGroup !== undefined) {
      commit('SET_CURRENT_CASHIER_GROUP', cashierGroup);
      return cashierGroup;
    }
    return cashierGroupService.getCashierGroup(id).then(({ data }) => {
      commit('SET_CURRENT_CASHIER_GROUP', data);
      return data;
    });
  },

  addCashierGroup({ commit }, cashierGroupField) {
    return cashierGroupService
      .addCashierGroup(cashierGroupField)
      .then(({ data }) => {
        commit('ADD_CASHIER_GROUP', data);
        notify(
          i18n.global.t('sales.cashierGroup.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateCashierGroup({ commit }, cashierGroupField) {
    return cashierGroupService
      .updateCashierGroup(cashierGroupField, cashierGroupField.id)
      .then(({ data }) => {
        commit('UPDATE_CASHIER_GROUP', data);
        notify(
          i18n.global.t('sales.cashierGroup.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteCashierGroup({ commit }, cashierGroupId) {
    return cashierGroupService
      .deleteCashierGroup(cashierGroupId)
      .then(({ data }) => {
        commit('DELETE_CASHIER_GROUP', cashierGroupId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_CASHIER_GROUPS(state, cashierGroups) {
    state.cashierGroups = JSON.stringify(cashierGroups);
  },
  SET_CURRENT_CASHIER_GROUP(state, cashierGroup) {
    state.cashierGroup = JSON.stringify(cashierGroup);
  },
  ADD_CASHIER_GROUP(state, cashierGroup) {
    let cashierGroups = JSON.parse(state.cashierGroups);
    cashierGroups.push(cashierGroup);
    state.cashierGroups = JSON.stringify(cashierGroups);
  },
  UPDATE_CASHIER_GROUP(state, cashierGroup) {
    let cashierGroups = JSON.parse(state.cashierGroups);
    const index = cashierGroups.findIndex((p) => p.id === cashierGroup.id);
    if (index !== -1) {
      cashierGroups.splice(index, 1, cashierGroup);
      state.cashierGroups = JSON.stringify(cashierGroups);
    }
  },
  DELETE_CASHIER_GROUP(state, cashierGroupId) {
    state.cashierGroups = JSON.stringify(
      JSON.parse(state.cashierGroups).filter((p) => p.id !== cashierGroupId)
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
