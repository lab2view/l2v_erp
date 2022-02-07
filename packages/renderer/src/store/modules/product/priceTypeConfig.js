import priceTypeService from '../../../services/articles/PriceTypeService';
import { notify } from '../../../helpers/notify';
import i18n from '../../../i18n';

const state = {
  priceTypes: null,
  hash: null,
  priceType: null,
};

// getters
const getters = {
  priceTypes: (state) => (state.priceTypes ? JSON.parse(state.priceTypes) : []),
  priceType: (state) => (state.priceType ? JSON.parse(state.priceType) : null),
};

// privileges
const actions = {
  getPriceTypeList({ commit, getters }, { page, field }) {
    if (getters.priceTypes.length > 0) {
      return getters.priceTypes;
    } else
      return priceTypeService.getList(page, field).then(({ data }) => {
        commit('SET_PRICE_TYPES', data);
        return data;
      });
  },

  getPriceType({ getters, commit }, id) {
    const priceType = getters.priceTypes.find((p) => p.id.toString() === id);
    if (priceType !== undefined) {
      commit('SET_CURRENT_PRICE_TYPE', priceType);
      return priceType;
    } else
      return priceTypeService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PRICE_TYPE', data);
        return data;
      });
  },

  addPriceType({ commit }, priceTypeField) {
    return priceTypeService.add(priceTypeField).then(({ data }) => {
      commit('ADD_PRICE_TYPE', data);
      notify(
        i18n.global.t('article.priceType.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updatePriceType({ commit }, priceTypeField) {
    return priceTypeService
      .update(priceTypeField, priceTypeField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('article.priceType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PRICE_TYPE', data);
        return data;
      });
  },

  deletePriceType({ commit }, priceTypeId) {
    return priceTypeService.delete(priceTypeId).then(({ data }) => {
      commit('DELETE_PRICE_TYPE', priceTypeId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PRICE_TYPES(state, priceTypes) {
    state.priceTypes = JSON.stringify(priceTypes);
  },
  SET_CURRENT_PRICE_TYPE(state, pack) {
    state.priceType = JSON.stringify(pack);
  },
  ADD_PRICE_TYPE(state, pack) {
    let priceTypes = JSON.parse(state.priceTypes);
    priceTypes.push(pack);
    state.priceTypes = JSON.stringify(priceTypes);
  },
  UPDATE_PRICE_TYPE(state, pack) {
    let priceTypes = JSON.parse(state.priceTypes);
    const index = priceTypes.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      priceTypes.splice(index, 1, pack);
      state.priceTypes = JSON.stringify(priceTypes);
    }
  },
  DELETE_PRICE_TYPE(state, priceTypeId) {
    state.priceTypes = JSON.stringify(
      JSON.parse(state.priceTypes).filter((p) => p.id !== priceTypeId)
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
