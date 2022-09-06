import shippingService from '../../../services/stocks/ShippingService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';
import { stockStateCode } from '/@/helpers/codes';

const state = {
  shippings: null,
  hash: null,
  shipping: null,
};

// getters
const getters = {
  haveShipping: (state, getters) => !!getters.shipping,
  shippings: (state) => {
    return state.shippings ? JSON.parse(state.shippings) : [];
  },
  shipping: (state) => (state.shipping ? JSON.parse(state.shipping) : null),
  shippingIsConfirm: (state, getters) => {
    return (
      getters.shipping?.shipping?.shipping.code === stockStateCode.success ||
      getters.shipping?.shipping?.shipping.code === stockStateCode.delivered
    );
  },
  currentShippingStateDate: (state, getters) =>
    getters.shipping?.current_state?.updated_at,
  manage_price: () => false,
};

const actions = {
  getShippingsList({ commit, getters }, { page, field }) {
    if (getters.shippings.length > 0) {
      return getters.shippings;
    }
    return shippingService.getShippingsList(page, field).then(({ data }) => {
      commit('SET_SHIPPINGS', data);
      return data;
    });
  },

  getShipping({ getters, commit }, id) {
    const shipping = getters.shippings.find(
      (p) => p.id.toString() === id.toString()
    );
    if (shipping !== undefined) {
      commit('SET_CURRENT_SHIPPING', shipping);
      return shipping;
    }

    return shippingService.getShipping(id).then(({ data }) => {
      commit('SET_CURRENT_SHIPPING', data);
      return data;
    });
  },

  addShipping({ commit }, shippingField) {
    return shippingService.addShipping(shippingField).then(({ data }) => {
      commit('ADD_SHIPPING', data);
      commit('SET_CURRENT_SHIPPING', data);
      notify(
        i18n.global.t('stocks.shipping.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateShipping({ commit }, shippingField) {
    return shippingService
      .updateShipping(shippingField, shippingField.id)
      .then(({ data }) => {
        commit('UPDATE_SHIPPING', data);
        notify(
          i18n.global.t('stocks.shipping.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteShipping({ commit }, shippingId) {
    return shippingService.deleteShipping(shippingId).then(({ data }) => {
      commit('DELETE_SHIPPING', shippingId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_SHIPPINGS(state, shippings) {
    state.shippings = shippings.length ? JSON.stringify(shippings) : null;
  },
  SET_CURRENT_SHIPPING(state, shipping) {
    state.shipping = shipping === null ? null : JSON.stringify(shipping);
  },
  ADD_SHIPPING(state, shipping) {
    let shippings = state.shippings ? JSON.parse(state.shippings) : [];
    shippings.push(shipping);

    state.shippings = JSON.stringify(shippings);
  },
  UPDATE_SHIPPING(state, shipping) {
    let shippings = JSON.parse(state.shippings);
    const index = shippings.findIndex((p) => p.id === shipping.id);
    if (index !== -1) {
      shippings.splice(index, 1, shipping);
    }
    state.shippings = JSON.stringify(shippings);
  },
  DELETE_SHIPPING(state, shippingId) {
    state.shippings = JSON.stringify(
      JSON.parse(state.shippings).filter((p) => p.id !== shippingId)
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
