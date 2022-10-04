import paymentChargeService from '../../../services/payments/PaymentChargeService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  paymentCharges: null,
  hash: null,
  paymentCharge: null,
};

// getters
const getters = {
  paymentCharges: (state) =>
    state.paymentCharges ? JSON.parse(state.paymentCharges) : [],
  paymentCharge: (state) =>
    state.paymentCharge ? JSON.parse(state.paymentCharge) : null,
};

const actions = {
  getPaymentChargesList({ commit, getters }, { page, field }) {
    if (getters.paymentCharges.length > 0 && !field.next) {
      return getters.paymentCharges;
    } else
      return paymentChargeService
        .getPaymentChargesList(page, field)
        .then(({ data }) => {
          commit('SET_PAYMENT_CHARGES', data);
          return data;
        });
  },

  getPaymentCharge({ getters, commit }, id) {
    const paymentCharge = getters.paymentCharges.find(
      (p) => p.id.toString() === id
    );
    if (paymentCharge !== undefined) {
      commit('SET_CURRENT_PAYMENT_CHARGE', paymentCharge);
      return paymentCharge;
    } else
      return paymentChargeService.getPaymentCharge(id).then(({ data }) => {
        commit('SET_CURRENT_PAYMENT_CHARGE', data);
        return data;
      });
  },

  addPaymentCharge({ commit }, paymentChargeField) {
    return paymentChargeService
      .addPaymentCharge(paymentChargeField)
      .then(({ data }) => {
        commit('ADD_PAYMENT_CHARGE', data);
        notify(
          i18n.global.t('payments.paymentCharge.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updatePaymentCharge({ commit }, paymentChargeField) {
    return paymentChargeService
      .updatePaymentCharge(paymentChargeField, paymentChargeField.id)
      .then(({ data }) => {
        commit('UPDATE_PAYMENT_CHARGE', data);
        notify(
          i18n.global.t('payments.paymentCharge.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deletePaymentCharge({ commit }, paymentChargeId) {
    return paymentChargeService
      .deletePaymentCharge(paymentChargeId)
      .then(({ data }) => {
        commit('DELETE_PAYMENT_CHARGE', paymentChargeId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_PAYMENT_CHARGES(state, paymentCharges) {
    state.paymentCharges = JSON.stringify(paymentCharges);
  },
  SET_CURRENT_PAYMENT_CHARGE(state, paymentCharge) {
    state.paymentCharge = JSON.stringify(paymentCharge);
  },
  ADD_PAYMENT_CHARGE(state, paymentCharge) {
    let paymentCharges = JSON.parse(state.paymentCharges);
    paymentCharges.push(paymentCharge);
    state.paymentCharges = JSON.stringify(paymentCharges);
  },
  UPDATE_PAYMENT_CHARGE(state, paymentCharge) {
    let paymentCharges = JSON.parse(state.paymentCharges);
    const index = paymentCharges.findIndex((p) => p.id === paymentCharge.id);
    if (index !== -1) {
      paymentCharges.splice(index, 1, paymentCharge);
      state.paymentCharges = JSON.stringify(paymentCharges);
    }
  },
  DELETE_PAYMENT_CHARGE(state, paymentChargeId) {
    state.paymentCharges = JSON.stringify(
      JSON.parse(state.paymentCharges).filter((p) => p.id !== paymentChargeId)
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
