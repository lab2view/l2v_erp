import productService from '/@/services/products/ProductService';
import { notify } from '/@/helpers/notify.js';
import i18n from '/@/i18n';

const state = {
  products: null,
  hash: null,
  product: null,
};

// getters
const getters = {
  products: (state) => (state.products ? JSON.parse(state.products) : []),
  getProductsByFilter: (state, getters) => (filter) => {
    return getters.products.filter((product) => {
      let select = true;
      if (select && filter.product_type_id)
        select = product.product_type_id === filter.product_type_id;
      if (select && filter.product_unit_id)
        select = product.product_unit_id === filter.product_unit_id;
      if (select && filter.properties !== {}) {
        for (const [key, value] of Object.entries(filter.properties)) {
          if (key && value) {
            select =
              product.product_properties.find(
                (pp) =>
                  pp.property_id === parseInt(key) &&
                  pp.value === value.toString()
              ) !== undefined;
          }
        }
      }
      return select;
    });
  },
  product: (state) => (state.product ? JSON.parse(state.product) : null),
  haveProduct: (state) => !!state.product,
  product_properties: (state, getters) =>
    getters.product ? getters.product.product_properties : [],
  getProductsHash: (state) => state.hash ?? null,
  getProductById: (state, getters) => (id) =>
    getters.products.find((p) => p.id === id) ?? null,
};

// privileges
const actions = {
  getProductsList({ commit, getters, dispatch }, { page, field }) {
    if (getters.products.length > 0 && !field.next) {
      return getters.products;
    } else
      return productService
        .getList(page, { ...field, paginate: 50 })
        .then(({ data }) => {
          commit('SET_PRODUCTS', data);
          dispatch(
            'setGlobalProgress',
            {
              label: 'products',
              min: 0,
              max: data.last_page,
              value: data.current_page,
            },
            { root: true }
          );

          if (data.next_page_url) {
            return dispatch('getProductsList', {
              page: page + 1,
              field: { ...field, next: true },
            });
          } else dispatch('setGlobalProgress', null, { root: true });

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
      notify(
        i18n.global.t('products.form.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateProduct({ commit }, productField) {
    return productService
      .update(productField, productField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('products.form.update'),
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

  addProperties({ getters, commit }, productProperties) {
    return productService
      .addProperties({ properties: productProperties }, getters.product.id)
      .then(({ data }) => {
        commit('ADD_PROPERTIES', data.product_properties);
        return data;
      });
  },

  updateProperty({ commit }, productProperty) {
    return productService.updateProperty(productProperty).then(({ data }) => {
      commit('UPDATE_PROPERTY', data);
      notify(
        i18n.global.t('products.property.update'),
        'Ok',
        'theme',
        'fa fa-check'
      );
    });
  },

  removeProperties({ getters, commit }, productPropertyIds) {
    return productService
      .removeProperties(
        {
          product_property_ids: [...productPropertyIds],
        },
        getters.product.id
      )
      .then(() => {
        commit('REMOVE_PROPERTIES', productPropertyIds);
      });
  },

  addTaxes({ getters, commit }, productTaxes) {
    return productService
      .addTaxes({ taxes: productTaxes }, getters.product.id)
      .then(({ data }) => {
        commit('ADD_TAXES', data.product_taxes);
        return data;
      });
  },

  updateTax({ commit }, productTax) {
    return productService.updateTax(productTax).then(({ data }) => {
      commit('UPDATE_TAX', data);
      notify(
        i18n.global.t('products.tax.update'),
        'Ok',
        'theme',
        'fa fa-check'
      );
    });
  },

  removeTaxes({ getters, commit }, productTaxIds) {
    return productService
      .removeTaxes(
        {
          product_tax_ids: [...productTaxIds],
        },
        getters.product.id
      )
      .then(() => {
        commit('REMOVE_TAXES', productTaxIds);
      });
  },
};

// mutations
const mutations = {
  SET_PRODUCTS_HASH(state, hash) {
    state.hash = hash;
  },

  SET_PRODUCTS(state, { current_page, data }) {
    if (current_page === 1) state.products = JSON.stringify(data);
    else {
      let oldProducts = state.products ? JSON.parse(state.products) : [];
      state.products = JSON.stringify([...oldProducts, ...data]);
    }
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

  ADD_PROPERTIES(state, product_properties) {
    let products = JSON.parse(state.products);
    let product = JSON.parse(state.product);
    let index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      product.product_properties = [
        ...product.product_properties,
        ...product_properties,
      ];
      products.splice(index, 1, product);
      state.product = JSON.stringify(product);
      state.products = JSON.stringify(products);
    }
  },
  UPDATE_PROPERTY(state, productProperty) {
    let products = JSON.parse(state.products);
    let product = JSON.parse(state.product);
    let index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      let ind = product.product_properties.findIndex(
        (pp) => pp.id === productProperty.id
      );
      if (ind !== -1) {
        product.product_properties.splice(ind, 1, productProperty);
        products.splice(index, 1, product);
        state.product = JSON.stringify(product);
        state.products = JSON.stringify(products);
      }
    }
  },
  REMOVE_PROPERTIES(state, productPropertyIds) {
    let products = JSON.parse(state.products);
    let product = JSON.parse(state.product);
    let index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      product.product_properties = product.product_properties.filter((pp) => {
        return productPropertyIds.find((id) => id === pp.id) === undefined;
      });
      products.splice(index, 1, product);
      state.product = JSON.stringify(product);
      state.products = JSON.stringify(products);
    }
  },

  ADD_TAXES(state, product_taxes) {
    let products = JSON.parse(state.products);
    let product = JSON.parse(state.product);
    let index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      product.product_taxes = [...product.product_taxes, ...product_taxes];
      products.splice(index, 1, product);
      state.product = JSON.stringify(product);
      state.products = JSON.stringify(products);
    }
  },
  UPDATE_TAX(state, productTax) {
    let products = JSON.parse(state.products);
    let product = JSON.parse(state.product);
    let index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      let ind = product.product_taxes.findIndex(
        (pt) => pt.id === productTax.id
      );
      if (ind !== -1) {
        product.product_taxes.splice(ind, 1, productTax);
        products.splice(index, 1, product);
        state.product = JSON.stringify(product);
        state.products = JSON.stringify(products);
      }
    }
  },
  REMOVE_TAXES(state, productTaxIds) {
    let products = JSON.parse(state.products);
    let product = JSON.parse(state.product);
    let index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      product.product_taxes = product.product_taxes.filter((pt) => {
        return productTaxIds.find((id) => id === pt.id) === undefined;
      });
      products.splice(index, 1, product);
      state.product = JSON.stringify(product);
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
