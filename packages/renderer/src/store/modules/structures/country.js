import countryService from '../../../services/structures/CountryService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  countries: null,
  hash: null,
  country: null,
};

// getters
const getters = {
  countries: (state) => {
    return state.countries ? JSON.parse(state.countries) : [];
  },
  activeCountries: (state, getters) =>
    getters.countries.filter((c) => c.is_active),
  country: (state) => (state.country ? JSON.parse(state.country) : null),
};

const actions = {
  getCountriesList({ commit, getters }, { page, field }) {
    if (getters.countries.length > 0) {
      return getters.countries;
    }
    return countryService.getCountriesList(page, field).then(({ data }) => {
      commit('SET_COUNTRIES', data);
      return data;
    });
  },

  getCountry({ getters, commit }, id) {
    const country = getters.countries.find((p) => p.id.toString() === id);
    if (country !== undefined) {
      commit('SET_CURRENT_COUNTRY', country);
      return country;
    }

    return countryService.getCountry(id).then(({ data }) => {
      commit('SET_CURRENT_COUNTRY', data);
      return data;
    });
  },

  addCountry({ commit }, countryField) {
    return countryService.addCountry(countryField).then(({ data }) => {
      commit('ADD_COUNTRY', data);
      notify(
        i18n.global.t('structures.country.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateCountry({ commit }, countryField) {
    return countryService
      .updateCountry(countryField, countryField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.country.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_COUNTRY', data);
        return data;
      });
  },

  deleteCountry({ commit }, countryId) {
    return countryService.deleteCountry(countryId).then(({ data }) => {
      commit('DELETE_COUNTRY', countryId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = JSON.stringify(countries);
  },
  SET_CURRENT_COUNTRY(state, country) {
    state.country = JSON.stringify(country);
  },
  ADD_COUNTRY(state, country) {
    let countries = null;
    if (state.countries) {
      countries = JSON.parse(state.countries);
      countries.push(country);
    } else {
      countries = [country];
    }
    state.countries = JSON.stringify(countries);
  },
  UPDATE_COUNTRY(state, country) {
    let countries = JSON.parse(state.countries);
    const index = countries.findIndex((p) => p.id === country.id);
    if (index !== -1) {
      countries.splice(index, 1, country);
    }
    state.countries = JSON.stringify(countries);
  },
  DELETE_COUNTRY(state, countryId) {
    state.countries = JSON.stringify(
      JSON.parse(state.countries).filter((p) => p.id !== countryId)
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
