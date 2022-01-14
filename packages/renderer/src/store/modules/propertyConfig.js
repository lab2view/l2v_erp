import propertyService from '../../services/products/PropertyService';
import { notify } from '../../helpers/notify';
import i18n from '../../i18n';

const state = {
  properties: null,
  hash: null,
  property: null,
};

// getters
const getters = {
  properties: (state) => (state.properties ? JSON.parse(state.properties) : []),
  property: (state) => (state.property ? JSON.parse(state.property) : null),
};

// privileges
const actions = {
  getPropertiesList({ commit, getters }, { page, field }) {
    if (getters.properties.length > 0) {
      return getters.properties;
    } else
      return propertyService.getList(page, field).then(({ data }) => {
        commit('SET_PROPERTIES', data);
        return data;
      });
  },

  getProperty({ getters, commit }, id) {
    const property = getters.properties.find((p) => p.id.toString() === id);
    if (property !== undefined) {
      commit('SET_CURRENT_PROPERTY', property);
      return property;
    } else
      return propertyService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PROPERTY', data);
        return data;
      });
  },

  addProperty({ commit }, propertyField) {
    return propertyService.add(propertyField).then(({ data }) => {
      commit('ADD_PROPERTY', data);
      notify(
        i18n.global.t('product.property.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateProperty({ commit }, propertyField) {
    return propertyService
      .update(propertyField, propertyField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('product.property.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PROPERTY', data);
        return data;
      });
  },

  deleteProperty({ commit }, propertyId) {
    return propertyService.delete(propertyId).then(({ data }) => {
      commit('DELETE_PROPERTY', propertyId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PROPERTIES(state, properties) {
    state.properties = JSON.stringify(properties);
  },
  SET_CURRENT_PROPERTY(state, pack) {
    state.property = JSON.stringify(pack);
  },
  ADD_PROPERTY(state, pack) {
    let properties = JSON.parse(state.properties);
    properties.push(pack);
    state.properties = JSON.stringify(properties);
  },
  UPDATE_PROPERTY(state, pack) {
    let properties = JSON.parse(state.properties);
    const index = properties.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      properties.splice(index, 1, pack);
      state.properties = JSON.stringify(properties);
    }
  },
  DELETE_PROPERTY(state, propertyId) {
    state.properties = JSON.stringify(
      JSON.parse(state.properties).filter((p) => p.id !== propertyId)
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
