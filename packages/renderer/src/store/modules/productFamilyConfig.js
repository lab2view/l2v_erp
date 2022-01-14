import productFamilyService from '../../services/products/ProductFamilyService';
import { notify } from '../../helpers/notify';
import i18n from '../../i18n';

const state = {
  productFamilies: null,
  hash: null,
  productFamily: null,
};

// getters
const getters = {
  productFamilies: (state) => (state.productFamilies ? JSON.parse(state.productFamilies) : []),
  productFamily: (state) => (state.productFamily ? JSON.parse(state.productFamily) : null),
};

// privileges
const actions = {
  getProductFamiliesList({ commit, getters }, { page, field }) {
    if (getters.productFamilies.length > 0) {
      return getters.productFamilies;
    } else
      return productFamilyService.getList(page, field).then(({ data }) => {
        commit('SET_PRODUCT_FAMILIES', data);
        return data;
      });
  },

  getProductFamily({ getters, commit }, id) {
    const productFamily = getters.productFamilies.find((p) => p.id.toString() === id);
    if (productFamily !== undefined) {
      commit('SET_CURRENT_PRODUCT_FAMILY', productFamily);
      return productFamily;
    } else
      return productFamilyService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PRODUCT_FAMILY', data);
        return data;
      });
  },

  addProductFamily({ commit }, productFamilyField) {
    return productFamilyService.add(productFamilyField).then(({ data }) => {
      commit('ADD_PRODUCT_FAMILY', data);
      notify(
        i18n.global.t('product.productFamily.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateProductFamily({ commit }, productFamilyField) {
    return productFamilyService
      .update(productFamilyField, productFamilyField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('product.productFamily.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PRODUCT_FAMILY', data);
        return data;
      });
  },

  deleteProductFamily({ commit }, productFamilyId) {
    return productFamilyService.delete(productFamilyId).then(({ data }) => {
      commit('DELETE_PRODUCT_FAMILY', productFamilyId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PRODUCT_FAMILIES(state, productFamilies) {
    state.productFamilies = JSON.stringify(productFamilies);
  },
  SET_CURRENT_PRODUCT_FAMILY(state, pack) {
    state.productFamily = JSON.stringify(pack);
  },
  ADD_PRODUCT_FAMILY(state, pack) {
    let productFamilies = JSON.parse(state.productFamilies);
    productFamilies.push(pack);
    state.productFamilies = JSON.stringify(productFamilies);
  },
  UPDATE_PRODUCT_FAMILY(state, pack) {
    let productFamilies = JSON.parse(state.productFamilies);
    const index = productFamilies.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      productFamilies.splice(index, 1, pack);
      state.productFamilies = JSON.stringify(productFamilies);
    }
  },
  DELETE_PRODUCT_FAMILY(state, productFamilyId) {
    state.productFamilies = JSON.stringify(
      JSON.parse(state.productFamilies).filter((p) => p.id !== productFamilyId)
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
