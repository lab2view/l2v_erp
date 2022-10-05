import transactionTypeService from '../../../services/payments/PaymentTransactionTypeService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  transactionTypes: null,
  hash: null,
  transactionType: null,
};

// getters
const getters = {
  transactionTypes: (state) =>
    state.transactionTypes ? JSON.parse(state.transactionTypes) : [],
  transactionType: (state) =>
    state.transactionType ? JSON.parse(state.transactionType) : null,
};

const actions = {
  getTransactionTypesList({ commit, getters }, { page, field }) {
    if (getters.transactionTypes.length > 0 && !field.next) {
      return getters.transactionTypes;
    } else
      return transactionTypeService
        .getPaymentTransactionTypesList(page, field)
        .then(({ data }) => {
          commit('SET_TRANSACTION_TYPES', data);
          return data;
        });
  },

  getTransactionType({ getters, commit }, id) {
    const transactionType = getters.transactionTypes.find(
      (p) => p.id.toString() === id
    );
    if (transactionType !== undefined) {
      commit('SET_CURRENT_TRANSACTION_TYPE', transactionType);
      return transactionType;
    } else
      return transactionTypeService
        .getPaymentTransactionType(id)
        .then(({ data }) => {
          commit('SET_CURRENT_TRANSACTION_TYPE', data);
          return data;
        });
  },

  addTransactionType({ commit }, transactionTypeField) {
    return transactionTypeService
      .addPaymentTransactionType(transactionTypeField)
      .then(({ data }) => {
        commit('ADD_TRANSACTION_TYPE', data);
        notify(
          i18n.global.t('payments.transactionType.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateTransactionType({ commit }, transactionTypeField) {
    return transactionTypeService
      .updatePaymentTransactionType(
        transactionTypeField,
        transactionTypeField.id
      )
      .then(({ data }) => {
        notify(
          i18n.global.t('payments.transactionType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_TRANSACTION_TYPE', data);
        return data;
      });
  },

  deleteTransactionType({ commit }, transactionTypeId) {
    return transactionTypeService
      .deletePaymentTransactionType(transactionTypeId)
      .then(({ data }) => {
        commit('DELETE_TRANSACTION_TYPE', transactionTypeId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_TRANSACTION_TYPES(state, transactionTypes) {
    state.transactionTypes = JSON.stringify(transactionTypes);
  },
  SET_CURRENT_TRANSACTION_TYPE(state, transactionType) {
    state.transactionType = JSON.stringify(transactionType);
  },
  ADD_TRANSACTION_TYPE(state, transactionType) {
    let transactionTypes = JSON.parse(state.transactionTypes);
    transactionTypes.push(transactionType);
    state.transactionTypes = JSON.stringify(transactionTypes);
  },
  UPDATE_TRANSACTION_TYPE(state, transactionType) {
    let transactionTypes = JSON.parse(state.transactionTypes);
    const index = transactionTypes.findIndex(
      (p) => p.id === transactionType.id
    );
    if (index !== -1) {
      transactionTypes.splice(index, 1, transactionType);
      state.transactionTypes = JSON.stringify(transactionTypes);
    }
  },
  DELETE_TRANSACTION_TYPE(state, transactionTypeId) {
    state.transactionTypes = JSON.stringify(
      JSON.parse(state.transactionTypes).filter(
        (p) => p.id !== transactionTypeId
      )
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
