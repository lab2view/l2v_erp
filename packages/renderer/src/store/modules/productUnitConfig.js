import productUnitService from '../../services/products/ProductUnitService';
import { notify } from '../../helpers/notify';
import i18n from '../../i18n';

const state = {
  productUnits: null,
  hash: null,
  productUnit: null,
};

// getters
const getters = {
  productUnits: (state) => (state.productUnits ? JSON.parse(state.productUnits) : []),
  productUnit: (state) => (state.productUnit ? JSON.parse(state.productUnit) : null),
};

// privileges
const actions = {
  getProductUnitsList({ commit, getters }, { page, field }) {
    if (getters.productUnits.length > 0) {
      return getters.productUnits;
    } else
      return productUnitService.getList(page, field).then(({ data }) => {
        commit('SET_PRODUCT_UNITS', data);
        return data;
      });
  },

  getProductUnit({ getters, commit }, id) {
    const productUnit = getters.productUnits.find((p) => p.id.toString() === id);
    if (productUnit !== undefined) {
      commit('SET_CURRENT_PRODUCT_UNIT', productUnit);
      return productUnit;
    } else
      return productUnitService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PRODUCT_UNIT', data);
        return data;
      });
  },

  addProductUnit({ commit }, productUnitField) {
    return productUnitService.add(productUnitField).then(({ data }) => {
      commit('ADD_PRODUCT_UNIT', data);
      notify(
        i18n.global.t('product.productUnit.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateProductUnit({ commit }, productUnitField) {
    return productUnitService
      .update(productUnitField, productUnitField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('product.productUnit.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PRODUCT_UNIT', data);
        return data;
      });
  },

  deleteProductUnit({ commit }, productUnitId) {
    return productUnitService.delete(productUnitId).then(({ data }) => {
      commit('DELETE_PRODUCT_UNIT', productUnitId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PRODUCT_UNITS(state, productUnits) {
    state.productUnits = JSON.stringify(productUnits);
  },
  SET_CURRENT_PRODUCT_UNIT(state, pack) {
    state.productUnit = JSON.stringify(pack);
  },
  ADD_PRODUCT_UNIT(state, pack) {
    let productUnits = JSON.parse(state.productUnits);
    productUnits.push(pack);
    state.productUnits = JSON.stringify(productUnits);
  },
  UPDATE_PRODUCT_UNIT(state, pack) {
    let productUnits = JSON.parse(state.productUnits);
    const index = productUnits.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      productUnits.splice(index, 1, pack);
      state.productUnits = JSON.stringify(productUnits);
    }
  },
  DELETE_PRODUCT_UNIT(state, productUnitId) {
    state.productUnits = JSON.stringify(
      JSON.parse(state.productUnits).filter((p) => p.id !== productUnitId)
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
