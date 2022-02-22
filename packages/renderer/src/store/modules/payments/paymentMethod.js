import paymentMethodService from '../../../services/payments/PaymentMethodService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  paymentMethods: null,
  hash: null,
  paymentMethod: null,
};

// getters
const getters = {
  paymentMethods: (state) =>
    state.paymentMethods ? JSON.parse(state.paymentMethods) : [],
  paymentMethod: (state) =>
    state.paymentMethod ? JSON.parse(state.paymentMethod) : null,
};

const actions = {
  getPaymentMethodsList({ commit, getters }, { page, field }) {
    if (getters.paymentMethods.length > 0) {
      return getters.paymentMethods;
    } else
      return paymentMethodService
        .getPaymentMethodsList(page, field)
        .then(({ data }) => {
          commit('SET_PAYMENT_METHODS', data);
          return data;
        });
  },

  getPaymentMethod({ getters, commit }, id) {
    const paymentMethod = getters.paymentMethods.find(
      (p) => p.id.toString() === id
    );
    if (paymentMethod !== undefined) {
      commit('SET_CURRENT_PAYMENT_METHOD', paymentMethod);
      return paymentMethod;
    } else
      return paymentMethodService.getPaymentMethod(id).then(({ data }) => {
        commit('SET_CURRENT_PAYMENT_METHOD', data);
        return data;
      });
  },

  addPaymentMethod({ commit }, paymentMethodField) {
    return paymentMethodService
      .addPaymentMethod(paymentMethodField)
      .then(({ data }) => {
        commit('ADD_PAYMENT_METHOD', data);
        notify(
          i18n.global.t('payments.paymentMethod.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updatePaymentMethod({ commit }, paymentMethodField) {
    return paymentMethodService
      .updatePaymentMethod(paymentMethodField, paymentMethodField.id)
      .then(({ data }) => {
        commit('UPDATE_PAYMENT_METHOD', data);
        notify(
          i18n.global.t('payments.paymentMethod.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deletePaymentMethod({ commit }, paymentMethodId) {
    return paymentMethodService
      .deletePaymentMethod(paymentMethodId)
      .then(({ data }) => {
        commit('DELETE_PAYMENT_METHOD', paymentMethodId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_PAYMENT_METHODS(state, paymentMethods) {
    state.paymentMethods = JSON.stringify(paymentMethods);
  },
  SET_CURRENT_PAYMENT_METHOD(state, paymentMethod) {
    state.paymentMethod = JSON.stringify(paymentMethod);
  },
  ADD_PAYMENT_METHOD(state, paymentMethod) {
    let paymentMethods = JSON.parse(state.paymentMethods);
    paymentMethods.push(paymentMethod);
    state.paymentMethods = JSON.stringify(paymentMethods);
  },
  UPDATE_PAYMENT_METHOD(state, paymentMethod) {
    let paymentMethods = JSON.parse(state.paymentMethods);
    const index = paymentMethods.findIndex((p) => p.id === paymentMethod.id);
    if (index !== -1) {
      paymentMethods.splice(index, 1, paymentMethod);
      state.paymentMethods = JSON.stringify(paymentMethods);
    }
  },
  DELETE_PAYMENT_METHOD(state, paymentMethodId) {
    state.paymentMethods = JSON.stringify(
      JSON.parse(state.paymentMethods).filter((p) => p.id !== paymentMethodId)
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
