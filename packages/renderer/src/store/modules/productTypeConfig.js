import productTypeService from '../../services/products/ProductTypeService';
import { notify } from '../../helpers/notify';
import i18n from '../../i18n';

const state = {
  productTypes: null,
  hash: null,
  productType: null,
};

// getters
const getters = {
  productTypes: (state) => (state.productTypes ? JSON.parse(state.productTypes) : []),
  productType: (state) => (state.productType ? JSON.parse(state.productType) : null),
};

// privileges
const actions = {
  getProductTypesList({ commit, getters }, { page, field }) {
    if (getters.productTypes.length > 0) {
      return getters.productTypes;
    } else
      return productTypeService.getList(page, field).then(({ data }) => {
        commit('SET_PRODUCT_TYPES', data);
        return data;
      });
  },

  getProductType({ getters, commit }, id) {
    const productType = getters.productTypes.find((p) => p.id.toString() === id);
    if (productType !== undefined) {
      commit('SET_CURRENT_PRODUCT_TYPE', productType);
      return productType;
    } else
      return productTypeService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PRODUCT_TYPE', data);
        return data;
      });
  },

  addProductType({ commit }, productTypeField) {
    return productTypeService.add(productTypeField).then(({ data }) => {
      commit('ADD_PRODUCT_TYPE', data);
      notify(
        i18n.global.t('product.productType.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateProductType({ commit }, productTypeField) {
    return productTypeService
      .update(productTypeField, productTypeField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('product.productType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PRODUCT_TYPE', data);
        return data;
      });
  },

  deleteProductType({ commit }, productTypeId) {
    return productTypeService.delete(productTypeId).then(({ data }) => {
      commit('DELETE_PRODUCT_TYPE', productTypeId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_PRODUCT_TYPES(state, productTypes) {
    state.productTypes = JSON.stringify(productTypes);
  },
  SET_CURRENT_PRODUCT_TYPE(state, pack) {
    state.productType = JSON.stringify(pack);
  },
  ADD_PRODUCT_TYPE(state, pack) {
    let productTypes = JSON.parse(state.productTypes);
    productTypes.push(pack);
    state.productTypes = JSON.stringify(productTypes);
  },
  UPDATE_PRODUCT_TYPE(state, pack) {
    let productTypes = JSON.parse(state.productTypes);
    const index = productTypes.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      productTypes.splice(index, 1, pack);
      state.productTypes = JSON.stringify(productTypes);
    }
  },
  DELETE_PRODUCT_TYPE(state, productTypeId) {
    state.productTypes = JSON.stringify(
      JSON.parse(state.productTypes).filter((p) => p.id !== productTypeId)
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
