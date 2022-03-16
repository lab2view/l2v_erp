import stockEntryProvisionService from '../../../services/stocks/StockEntryProvisionService';
import stockEntryService from '../../../services/stocks/StockEntryService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  provisions: null,
  hash: null,
  provision: null,
};

// getters
const getters = {
  provisions: (state) =>
    state.provisions ? JSON.parse(state.provisions) : [],
  provision: (state) =>
    state.provision ? JSON.parse(state.provision) : null,
  getProvisionByProductId: (state, getters) => (product_id) =>
    getters.provisions.filter(
      (a) => a.article?.product_id === product_id
    ),
};

// privileges
const actions = {
  getProvisionsList({ commit, getters }, { page, field }) {
    if (getters.provisions.length > 0) {
      return getters.provisions;
    } else
      return stockEntryService.getStockEntriesList(page, field).then(({ data }) => {
        commit('SET_PROVISIONS', data);
        return data;
      });
  },

  getProvision({ getters, commit }, id) {
    const provision = getters.provisions.find(
      (p) => p.id.toString() === id
    );
    if (provision !== undefined) {
      commit('SET_CURRENT_PROVISION', provision);
      return provision;
    } else
      return stockEntryProvisionService.getStockEntryProvision(id).then(({ data }) => {
        commit('SET_CURRENT_PROVISION', data);
        return data;
      });
  },

  addProvision({ commit }, provisionField) {
    return stockEntryProvisionService.addStockEntryProvision(provisionField).then(({ data }) => {
      commit('ADD_PROVISION', data);
      notify(
        i18n.global.t('stocks.provision.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateProvision({ commit }, provisionField) {
    return stockEntryProvisionService
      .updateStockEntryProvision(provisionField, provisionField.id)
      .then(({ data }) => {
        commit('UPDATE_PROVISION', data);
        notify(
          i18n.global.t('stocks.provision.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteProvision({ commit }, provisionId) {
    return stockEntryProvisionService.deleteStockEntryProvision(provisionId).then(({ data }) => {
      commit('DELETE_PROVISION', provisionId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PROVISIONS(state, provisions) {
    state.provisions = JSON.stringify(provisions);
  },
  SET_CURRENT_PROVISION(state, provision) {
    state.provision = JSON.stringify(provision);
  },
  ADD_PROVISION(state, provision) {
    let provisions = JSON.parse(state.provisions);
    provisions.push(provision);
    state.provisions = JSON.stringify(provisions);
  },
  UPDATE_PROVISION(state, provision) {
    let provisions = JSON.parse(state.provisions);
    const index = provisions.findIndex((p) => p.id === provision.id);
    if (index !== -1) {
      provisions.splice(index, 1, provision);
      state.provisions = JSON.stringify(provisions);
    }
  },
  DELETE_PROVISION(state, provisionId) {
    state.provisions = JSON.stringify(
      JSON.parse(state.provisions).filter(
        (p) => p.id !== provisionId
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
