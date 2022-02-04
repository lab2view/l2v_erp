import regionService from '../../../services/structures/RegionService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  regions: null,
  hash: null,
  region: null,
};

// getters
const getters = {
  regions: (state) => (state.regions ? JSON.parse(state.regions) : []),
  region: (state) => (state.region ? JSON.parse(state.region) : null),
};

const actions = {
  getRegionsList({ commit, getters }, { page, field }) {
    if (getters.regions.length > 0) {
      return getters.regions;
    } else
      return regionService.getRegionsList(page, field).then(({ data }) => {
        commit('SET_REGIONS', data);
        return data;
      });
  },

  getRegion({ getters, commit }, id) {
    const region = getters.regions.find((p) => p.id.toString() === id);
    if (region !== undefined) {
      commit('SET_CURRENT_REGION', region);
      return region;
    } else
      return regionService.getRegion(id).then(({ data }) => {
        commit('SET_CURRENT_REGION', data);
        return data;
      });
  },

  addRegion({ commit }, regionField) {
    return regionService.addRegion(regionField).then(({ data }) => {
      commit('ADD_REGION', data);
      notify(
        i18n.global.t('structures.region.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateRegion({ commit }, regionField) {
    return regionService
      .updateRegion(regionField, regionField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.region.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_REGION', data);
        return data;
      });
  },

  deleteRegion({ commit }, regionId) {
    return regionService.deleteRegion(regionId).then(({ data }) => {
      commit('DELETE_REGION', regionId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_REGIONS(state, regions) {
    state.regions = JSON.stringify(regions);
  },
  SET_CURRENT_REGION(state, region) {
    state.region = JSON.stringify(region);
  },
  ADD_REGION(state, region) {
    let regions = JSON.parse(state.regions);
    regions.push(region);
    state.regions = JSON.stringify(regions);
  },
  UPDATE_REGION(state, region) {
    let regions = JSON.parse(state.regions);
    const index = regions.findIndex((p) => p.id === region.id);
    if (index !== -1) {
      regions.splice(index, 1, region);
      state.regions = JSON.stringify(regions);
    }
  },
  DELETE_REGION(state, regionId) {
    state.regions = JSON.stringify(
      JSON.parse(state.regions).filter((p) => p.id !== regionId)
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
