import customerGroupDiscountService from '../../../services/sales/CustomerGroupDiscountService';

const state = {
  customerGroupDiscounts: null,
  hash: null,
  customerGroupDiscount: null,
};

// getters
const getters = {
  customerGroupDiscounts: (state) =>
    state.customerGroupDiscounts
      ? JSON.parse(state.customerGroupDiscounts)
      : [],
  customerGroupDiscount: (state) =>
    state.customerGroupDiscount
      ? JSON.parse(state.customerGroupDiscount)
      : null,
  getCustomerGroupDiscountByGroupId: (state, getters) => (customer_group_id) =>
    getters.customerGroupDiscounts.filter(
      (l) => l.customer_group_id === customer_group_id
    ),
  getCustomerGroupDiscountByDiscountId: (state, getters) => (discount_id) =>
    getters.customerGroupDiscounts.filter((l) => l.discount_id === discount_id),
};

// privileges
const actions = {
  getCustomerGroupDiscountsList({ commit, getters }, { page, field }) {
    if (getters.customerGroupDiscounts.length > 0) {
      return getters.customerGroupDiscounts;
    } else
      return customerGroupDiscountService
        .getCustomerGroupDiscountsList(page, field)
        .then(({ data }) => {
          commit('SET_CUSTOMER_GROUP_DISCOUNTS', data);
          return data;
        });
  },

  getCustomerGroupDiscount({ getters }, id) {
    const customerGroupDiscount = getters.customerGroupDiscounts.find(
      (p) => p.id.toString() === id
    );
    if (customerGroupDiscount !== undefined) {
      return customerGroupDiscount;
    } else
      return customerGroupDiscountService
        .getCustomerGroupDiscount(id)
        .then(({ data }) => {
          return data;
        });
  },

  addCustomerGroupDiscount({ commit }, customerGroupDiscountField) {
    return customerGroupDiscountService
      .addCustomerGroupDiscount(customerGroupDiscountField)
      .then(({ data }) => {
        commit('ADD_CUSTOMER_GROUP_DISCOUNT', data);
        return data;
      });
  },

  updateCustomerGroupDiscount({ commit }, customerGroupDiscountField) {
    return customerGroupDiscountService
      .updateCustomerGroupDiscount(
        customerGroupDiscountField,
        customerGroupDiscountField.id
      )
      .then(({ data }) => {
        commit('UPDATE_CUSTOMER_GROUP_DISCOUNT', data);
        return data;
      });
  },

  deleteCustomerGroupDiscount({ commit }, customerGroupDiscountId) {
    return customerGroupDiscountService
      .deleteCustomerGroupDiscount(customerGroupDiscountId)
      .then(({ data }) => {
        commit('DELETE_CUSTOMER_GROUP_DISCOUNT', customerGroupDiscountId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_CUSTOMER_GROUP_DISCOUNTS(state, customerGroupDiscounts) {
    state.customerGroupDiscounts = JSON.stringify(customerGroupDiscounts);
  },
  ADD_CUSTOMER_GROUP_DISCOUNT(state, customerGroupDiscount) {
    let customerGroupDiscounts = JSON.parse(state.customerGroupDiscounts);
    customerGroupDiscounts.push(customerGroupDiscount);
    state.customerGroupDiscounts = JSON.stringify(customerGroupDiscounts);
  },
  UPDATE_CUSTOMER_GROUP_DISCOUNT(state, customerGroupDiscount) {
    let customerGroupDiscounts = JSON.parse(state.customerGroupDiscounts);
    const index = customerGroupDiscounts.findIndex(
      (p) => p.id === customerGroupDiscount.id
    );
    if (index !== -1) {
      customerGroupDiscounts.splice(index, 1, customerGroupDiscount);
      state.customerGroupDiscounts = JSON.stringify(customerGroupDiscounts);
    }
  },
  DELETE_CUSTOMER_GROUP_DISCOUNT(state, customerGroupDiscountId) {
    state.customerGroupDiscounts = JSON.stringify(
      JSON.parse(state.customerGroupDiscounts).filter(
        (p) => p.id !== customerGroupDiscountId
      )
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
