import propertyService from '../../../services/products/PropertyService';
import { notify } from '/@/helpers/notify.js';
import i18n from '../../../i18n';
import productService from '/@/services/products/ProductService.js';

const state = {
  properties: [],
  hash: null,
  property: null,
  property_types: [],
};

// getters
const getters = {
  properties: (state) => state.properties,
  property: (state) => state.property,
  propertyTypes: (state) => state.property_types,
  getPropertyTypeById: (state, getters) => (id) =>
    getters.propertyTypes.find((pt) => pt.id === id) ?? null,
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
    const property = getters.properties.find(
      (p) => p.id.toString() === id.toString()
    );
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
        i18n.global.t('products.property.store'),
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
          i18n.global.t('products.property.update'),
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

  getPropertyTypes({ commit, getters }) {
    if (getters.propertyTypes.length > 0) {
      return getters.propertyTypes;
    } else
      return propertyService.getPropertyTypes().then(({ data }) => {
        commit('SET_PROPERTY_TYPES', data);
        return data;
      });
  },
  updatePropertyType({ commit }, propertyTypeField) {
    return propertyService
      .updatePropertyType(propertyTypeField, propertyTypeField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('products.property.type.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PROPERTY_TYPE', data);
        return data;
      });
  },

  addPropertyValues({ getters, commit }, values) {
    return propertyService
      .addPropertyValues(values, getters.property.id)
      .then(({ data }) => {
        commit('ADD_PROPERTY_VALUES', data.property_values);
        return data;
      });
  },
  updatePropertyValue({ commit }, propertyValue) {
    return propertyService
      .updatePropertyValue(propertyValue)
      .then(({ data }) => {
        commit('UPDATE_PROPERTY_VALUE', data);
        notify(
          i18n.global.t('property.value.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
      });
  },
  removePropertyValues({ getters, commit }, propertyValueIds) {
    return propertyService
      .removePropertyValues(
        {
          property_value_ids: [...propertyValueIds],
        },
        getters.property.id
      )
      .then(() => {
        commit('REMOVE_PROPERTY_VALUES', propertyValueIds);
      });
  },
};

// mutations
const mutations = {
  SET_PROPERTIES(state, properties) {
    state.properties = properties;
  },
  SET_CURRENT_PROPERTY(state, pack) {
    state.property = pack;
  },
  ADD_PROPERTY(state, pack) {
    state.properties.push(pack);
  },
  UPDATE_PROPERTY(state, pack) {
    const index = state.properties.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      state.properties.splice(index, 1, pack);
    }
  },
  DELETE_PROPERTY(state, propertyId) {
    state.properties = state.properties.filter((p) => p.id !== propertyId);
  },

  SET_PROPERTY_TYPES(state, property_types) {
    state.property_types = property_types;
  },
  UPDATE_PROPERTY_TYPE(state, propertyType) {
    const index = state.property_types.findIndex(
      (pt) => pt.id === propertyType.id
    );
    if (index !== -1) {
      state.property_types.splice(index, 1, propertyType);
    }
  },

  ADD_PROPERTY_VALUES(state, property_values) {
    let index = state.properties.findIndex((p) => p.id === state.property.id);
    if (index !== -1) {
      state.property.property_values = [
        ...state.property.property_values,
        ...property_values,
      ];
      state.properties.splice(index, 1, state.property);
    }
  },
  UPDATE_PROPERTY_VALUE(state, propertyValue) {
    let index = state.properties.findIndex((p) => p.id === state.property.id);
    if (index !== -1) {
      let ind = state.property.property_values.findIndex(
        (pv) => pv.id === propertyValue.id
      );
      if (ind !== -1) {
        state.property.property_values.splice(ind, 1, propertyValue);
        state.properties.splice(index, 1, state.property);
      }
    }
  },
  REMOVE_PROPERTY_VALUES(state, propertyValues) {
    let index = state.properties.findIndex((p) => p.id === state.property.id);
    if (index !== -1) {
      state.property.property_values = state.property.property_values.filter(
        (pp) => {
          return propertyValues.find((pv) => pv === pp.id) === undefined;
        }
      );
      state.properties.splice(index, 1, state.property);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
