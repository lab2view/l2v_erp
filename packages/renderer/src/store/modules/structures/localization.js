import localizationService from '../../../services/structures/LocalizationService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  localizations: null,
  hash: null,
  localization: null,
};

// getters
const getters = {
  localizations: (state) =>
    state.localizations ? JSON.parse(state.localizations) : [],
  localization: (state) =>
    state.localization ? JSON.parse(state.localization) : null,
};

const actions = {
  getLocalizationsList({ commit, getters }, { page, field }) {
    if (getters.localizations.length > 0) {
      return getters.localizations;
    } else
      return localizationService.getList(page, field).then(({ data }) => {
        commit('SET_LOCALIZATIONS', data);
        return data;
      });
  },

  getLocalization({ getters, commit }, id) {
    const localization = getters.localizations.find(
      (p) => p.id.toString() === id
    );
    if (localization !== undefined) {
      commit('SET_CURRENT_LOCALIZATION', localization);
      return localization;
    } else
      return localizationService.get(id).then(({ data }) => {
        commit('SET_CURRENT_LOCALIZATION', data);
        return data;
      });
  },

  addLocalization({ commit }, localizationField) {
    return localizationService.add(localizationField).then(({ data }) => {
      commit('ADD_LOCALIZATION', data);
      notify(
        i18n.global.t('structures.localization.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateLocalization({ commit }, localizationField) {
    return localizationService
      .update(localizationField, localizationField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.localization.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_LOCALIZATION', data);
        return data;
      });
  },

  deleteLocalization({ commit }, localizationId) {
    return localizationService.delete(localizationId).then(({ data }) => {
      commit('DELETE_LOCALIZATION', localizationId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_LOCALIZATIONS(state, localizations) {
    state.localizations = JSON.stringify(localizations);
  },
  SET_CURRENT_LOCALIZATION(state, pack) {
    state.localization = JSON.stringify(pack);
  },
  ADD_LOCALIZATION(state, pack) {
    let localizations = JSON.parse(state.localizations);
    localizations.push(pack);
    state.localizations = JSON.stringify(localizations);
  },
  UPDATE_LOCALIZATION(state, pack) {
    let localizations = JSON.parse(state.localizations);
    const index = localizations.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      localizations.splice(index, 1, pack);
      state.localizations = JSON.stringify(localizations);
    }
  },
  DELETE_LOCALIZATION(state, localizationId) {
    state.localizations = JSON.stringify(
      JSON.parse(state.localizations).filter((p) => p.id !== localizationId)
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
