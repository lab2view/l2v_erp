import productService from '../../services/products/ProductService';
import { notify } from '../../helpers/notify';
import i18n from '../../i18n';

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
        return data;
      });
  },

  deleteProduct({ commit }, productId) {
    return productService.delete(productId).then(({ data }) => {
      commit('DELETE_PRODUCT', productId);
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
    if (state.product !== product) state.product = JSON.stringify(product);
  },
  ADD_PRODUCT(state, product) {
    let products = JSON.parse(state.products);
    products.push(product);
    state.products = JSON.stringify(products);
  },
  UPDATE_PRODUCT(state, product) {
    let products = JSON.parse(state.products);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
