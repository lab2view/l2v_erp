import shippingService from '../../../services/stocks/ShippingService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  shippings: null,
  hash: null,
  shipping: null,
};

// getters
const getters = {
  shippings: (state) => {
    return state.shippings ? JSON.parse(state.shippings) : [];
  },
  shipping: (state) => (state.shipping ? JSON.parse(state.shipping) : null),
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
    const shipping = getters.shippings.find((p) => p.id.toString() === id);
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
    state.shippings = JSON.stringify(shippings);
  },
  SET_CURRENT_SHIPPING(state, shipping) {
    state.shipping = JSON.stringify(shipping);
  },
  ADD_SHIPPING(state, shipping) {
    let shippings = null;
    if (state.shippings) {
      shippings = JSON.parse(state.shippings);
      shippings.push(shipping);
    } else {
      shippings = [shipping];
    }
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
