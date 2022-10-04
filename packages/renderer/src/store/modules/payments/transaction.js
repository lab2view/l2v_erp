import transactionService from '../../../services/payments/PaymentTransactionService';

const state = {
  transactions: null,
  hash: null,
  transaction: null,
};

// getters
const getters = {
  transactions: (state) =>
    state.transactions ? JSON.parse(state.transactions) : [],
  transaction: (state) =>
    state.transaction ? JSON.parse(state.transaction) : null,
  getPaymentsHash: (state) => state.hash ?? null,
};

const actions = {
  getTransactionsList({ commit, getters }, { page, field }) {
    if (getters.transactions.length > 0 && !field.next) {
      return getters.transactions;
    } else
      return transactionService
        .getPaymentTransactionsList(page, field)
        .then(({ data }) => {
          commit('SET_TRANSACTIONS', data);
          return data;
        });
  },

  getTransaction({ getters, commit }, id) {
    const transaction = getters.transactions.find(
      (p) => p.id.toString() === id
    );
    if (transaction !== undefined) {
      commit('SET_CURRENT_TRANSACTION', transaction);
      return transaction;
    } else
      return transactionService.getPaymentTransaction(id).then(({ data }) => {
        commit('SET_CURRENT_TRANSACTION', data);
        return data;
      });
  },

  addTransaction({ commit }, transactionField) {
    return transactionService
      .addPaymentTransaction(transactionField)
      .then(({ data }) => {
        commit('ADD_TRANSACTION', data);
        return data;
      });
  },

  updateTransaction({ commit }, transactionField) {
    return transactionService
      .updatePaymentTransaction(transactionField, transactionField.id)
      .then(({ data }) => {
        commit('UPDATE_TRANSACTION', data);
        return data;
      });
  },

  deleteTransaction({ commit }, transactionId) {
    return transactionService
      .deletePaymentTransaction(transactionId)
      .then(({ data }) => {
        commit('DELETE_TRANSACTION', transactionId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_PAYMENTS_HASH(state, hash) {
    state.hash = hash;
  },
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = JSON.stringify(transactions);
  },
  SET_CURRENT_TRANSACTION(state, transaction) {
    state.transaction = JSON.stringify(transaction);
  },
  ADD_TRANSACTION(state, transaction) {
    let transactions = JSON.parse(state.transactions);
    transactions.push(transaction);
    state.transactions = JSON.stringify(transactions);
  },
  UPDATE_TRANSACTION(state, transaction) {
    let transactions = JSON.parse(state.transactions);
    const index = transactions.findIndex((p) => p.id === transaction.id);
    if (index !== -1) {
      transactions.splice(index, 1, transaction);
      state.transactions = JSON.stringify(transactions);
    }
  },
  DELETE_TRANSACTION(state, transactionId) {
    state.transactions = JSON.stringify(
      JSON.parse(state.transactions).filter((p) => p.id !== transactionId)
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
