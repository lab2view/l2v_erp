import productService from '../../../services/products/ProductService';
import { notify } from '/@/helpers/notify.js';
import i18n from '../../../i18n';

const state = {
  products: null,
  hash: null,
  product: null,
};

// getters
const getters = {
  products: (state) => (state.products ? JSON.parse(state.products) : []),
  product: (state) => (state.product ? JSON.parse(state.product) : null),
  haveProduct: (state) => !!state.product,
  product_properties: (state, getters) =>
    getters.product ? getters.product.product_properties : [],
};

// privileges
const actions = {
  getProductsList({ commit, getters }, { page, field }) {
    if (getters.products.length > 0) {
      return getters.products;
    } else
      return productService.getList(page, field).then(({ data }) => {
        commit('SET_PRODUCTS', data);
        return data;
      });
  },

  getProduct({ getters, commit }, id) {
    const product = getters.products.find((p) => p.id.toString() === id);
    if (product !== undefined) {
      commit('SET_CURRENT_PRODUCT', product);
      return product;
    } else
      return productService.get(id).then(({ data }) => {
        commit('SET_CURRENT_PRODUCT', data);
        return data;
      });
  },

  addProduct({ commit }, productField) {
    return productService.add(productField).then(({ data }) => {
      commit('ADD_PRODUCT', data);
      commit('article/ADD_ARTICLE', data.articles[0], { root: true });
      commit('SET_CURRENT_PRODUCT', data);
      notify(i18n.global.t('product.form.store'), 'Ok', 'theme', 'fa fa-check');
      return data;
    });
  },

  updateProduct({ commit }, productField) {
    return productService
      .update(productField, productField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('product.form.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_PRODUCT', data);
        data.articles.forEach((article) =>
          commit('article/UPDATE_ARTICLE', article, { root: true })
        );
        commit('SET_CURRENT_PRODUCT', data);
        return data;
      });
  },

  deleteProduct({ commit }, productId) {
    return productService.delete(productId).then(({ data }) => {
      commit('DELETE_PRODUCT', productId);
      commit('article/DELETE_ARTICLE_BY_PRODUCT', productId, { root: true });
      return data;
    });
  },

  saveProperties({ getters, commit }, properties) {
    return productService
      .saveProperties(properties, getters.product.id)
      .then(({ data }) => {
        commit('PUSH_PRODUCT_PROPERTIES', data.properties);
        return data;
      });
  },

  saveTaxes({ getters, commit }, productTaxes) {
    return productService
      .saveTaxes(productTaxes, getters.product.id)
      .then(({ data }) => {
        commit('PUSH_PRODUCT_PROPERTIES', data.properties);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = JSON.stringify(products);
  },
  SET_CURRENT_PRODUCT(state, product) {
    if (state.product !== product)
      state.product = product === null ? null : JSON.stringify(product);
  },
  ADD_PRODUCT(state, product) {
    let products = state.products ? JSON.parse(state.products) : [];
    products.push(product);
    state.products = JSON.stringify(products);
  },
  UPDATE_PRODUCT(state, product) {
    let products = state.products ? JSON.parse(state.products) : [];
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products.splice(index, 1, product);
      state.products = JSON.stringify(products);
    }
  },
  DELETE_PRODUCT(state, productId) {
    state.products = JSON.stringify(
      JSON.parse(state.products).filter((p) => p.id !== productId)
    );
  },
  PUSH_PRODUCT_PROPERTIES(state, properties) {
    let products = state.products ? JSON.parse(state.products) : [];
    let product = JSON.parse(state.product);
    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      properties.forEach((property) =>
        product.product_properties.push(property)
      );
      state.product = JSON.stringify(product);
      products.splice(index, 1, product);
      state.products = JSON.stringify(products);
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
