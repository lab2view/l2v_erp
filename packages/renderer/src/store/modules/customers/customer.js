import customerService from '../../../services/customers/CustomerService';

const state = {
  customers: null,
  hash: null,
  customer: null,
};

// getters
const getters = {
  customers: (state) => (state.customers ? JSON.parse(state.customers) : []),
  customer: (state) => (state.customer ? JSON.parse(state.customer) : null),
  haveCustomer: (state) => !!state.customer,
  searchCustomerByCriteria:
    (state, getters) =>
    ({ customer_type_id, country_id, keyword }) =>
      getters.customers.filter((c) => {
        let result = true;
        if (customer_type_id)
          result = c.customer_type_id.toString() === customer_type_id;
        if (country_id) result = c.country_id.toString() === country_id;
        if (keyword)
          result = RegExp(`${keyword.toString().toLowerCase()}*`).test(
            `${c.name.toString().toLowerCase()} ${c.phone
              .toString()
              .toLowerCase()} ${c.reference.toString().toLowerCase()}`
          );
        return result;
      }),
};

const actions = {
  getCustomersList({ commit, getters }, { page, field }) {
    if (getters.customers.length > 0) {
      return getters.customers;
    } else
      return customerService.getCustomersList(page, field).then(({ data }) => {
        commit('SET_CUSTOMERS', data);
        return data;
      });
  },

  getCustomer({ getters, commit }, id) {
    const customer = getters.customers.find((p) => p.id.toString() === id);
    if (customer !== undefined) {
      commit('SET_CURRENT_CUSTOMER', customer);
      return customer;
    } else
      return customerService.getCustomer(id).then(({ data }) => {
        commit('SET_CURRENT_CUSTOMER', data);
        return data;
      });
  },

  addCustomer({ commit }, customerField) {
    return customerService.addCustomer(customerField).then(({ data }) => {
      commit('ADD_CUSTOMER', data);
      return data;
    });
  },

  updateCustomer({ commit }, customerField) {
    return customerService
      .updateCustomer(customerField, customerField.id)
      .then(({ data }) => {
        commit('UPDATE_CUSTOMER', data);
        return data;
      });
  },

  deleteCustomer({ commit }, customerId) {
    return customerService.deleteCustomer(customerId).then(({ data }) => {
      commit('DELETE_CUSTOMER', customerId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_CUSTOMERS(state, customers) {
    state.customers = JSON.stringify(customers);
  },
  SET_CURRENT_CUSTOMER(state, customer) {
    state.customer = customer === null ? null : JSON.stringify(customer);
  },
  ADD_CUSTOMER(state, customer) {
    let customers = JSON.parse(state.customers);
    customers.push(customer);
    state.customers = JSON.stringify(customers);
  },
  UPDATE_CUSTOMER(state, customer) {
    let customers = JSON.parse(state.customers);
    const index = customers.findIndex((p) => p.id === customer.id);
    if (index !== -1) {
      customers.splice(index, 1, customer);
    }
    state.customer = JSON.stringify(customer);
    state.customers = JSON.stringify(customers);
  },
  DELETE_CUSTOMER(state, customerId) {
    state.customers = JSON.stringify(
      JSON.parse(state.customers).filter(
        (customer) => customer.id !== customerId
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
