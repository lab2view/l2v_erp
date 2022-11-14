import localizationService from '../../../services/enterprise/LocalizationService';
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
  selectableLocalizations: (state, getters) =>
    getters.localizations.map((l) => {
      return {
        id: l.id,
        label: `${l.address ? l.address + ' - ' : ''} ${l.city}`,
      };
    }),
  localization: (state) =>
    state.localization ? JSON.parse(state.localization) : null,
  cities: (state, getters) =>
    getters.localizations.map((l) => {
      return {
        id: l.id,
        label: l.city,
      };
    }),
};

const actions = {
  getLocalizationsList({ commit, getters }, { page, field }) {
    if (getters.localizations.length > 0 && !field.next) {
      return getters.localizations;
    } else
      return localizationService
        .getLocalizationsList(page, field)
        .then(({ data }) => {
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
      return localizationService.getLocalization(id).then(({ data }) => {
        commit('SET_CURRENT_LOCALIZATION', data);
        return data;
      });
  },

  addLocalization({ commit }, localizationField) {
    return localizationService
      .addLocalization(localizationField)
      .then(({ data }) => {
        commit('ADD_LOCALIZATION', data);
        notify(
          i18n.global.t('enterprise.localization.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateLocalization({ commit }, localizationField) {
    return localizationService
      .updateLocalization(localizationField, localizationField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('enterprise.localization.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_LOCALIZATION', data);
        return data;
      });
  },

  deleteLocalization({ commit }, localizationId) {
    return localizationService
      .deleteLocalization(localizationId)
      .then(({ data }) => {
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
  SET_CURRENT_LOCALIZATION(state, localization) {
    state.localization = JSON.stringify(localization);
  },
  ADD_LOCALIZATION(state, localization) {
    let localizations = JSON.parse(state.localizations);
    localizations.push(localization);
    state.localizations = JSON.stringify(localizations);
  },
  UPDATE_LOCALIZATION(state, localization) {
    let localizations = JSON.parse(state.localizations);
    const index = localizations.findIndex((p) => p.id === localization.id);
    if (index !== -1) {
      localizations.splice(index, 1, localization);
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
