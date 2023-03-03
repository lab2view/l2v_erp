import customerService from '/@/services/customers/CustomerService';
import SaleService from '/@/services/sales/SaleService';
import i18n from '/@/i18n';

const state = {
  customers: null,
  hash: null,
  customer: null,
  stats: null,
  year: null,
};

// getters
const getters = {
  customers: (state) => (state.customers ? JSON.parse(state.customers) : []),
  customer: (state) => (state.customer ? JSON.parse(state.customer) : null),
  getCustomerById: (state, getters) => (id) =>
    getters.customers.find((a) => a.id === id),
  haveCustomer: (state) => !!state.customer,
  getCustomersHash: (state) => state.hash ?? null,
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
  getCustomerForSelect2: (state, getters) =>
    getters.customers.map((c) => {
      return {
        id: c.id,
        label: `${c.reference} / ${c.phone} ${
          c.first_name ? ' - ' + c.first_name : ''
        }
        ${c.name ? ' - ' + c.name : ''}`,
      };
    }),
  getCustomerByFilter: (state, getters) => (filter) => {
    return getters.customers.filter((customer) => {
      let select = true;
      if (filter.customer_type_id)
        select = customer.customer_type_id === filter.customer_type_id;
      if (select && filter.country_id)
        select = customer.country_id === filter.country_id;
      if (select && filter.localization_id)
        select = customer.localization_id === filter.localization_id;
      return select;
    });
  },
  stats: (state) => (state.stats ? JSON.parse(state.stats) : null),
  year: (state) => state.year,
  getStatsChartData: (state, getters) => {
    return {
      labels: getters.stats.map((stat) => stat.month),
      datasets: [
        {
          label: i18n.global.t('common.attributes.total_amount_buying'),
          backgroundColor: '#24695c',
          data: getters.stats.map((stat) => (stat.amount ?? 0).toFixed()),
        },
        {
          label: i18n.global.t('common.attributes.discount'),
          backgroundColor: '#ba895d',
          data: getters.stats.map((stat) => (stat.discount ?? 0).toFixed()),
        },
      ],
    };
  },
};

const actions = {
  getCustomersList({ commit, getters, dispatch }, { page, field }) {
    if (getters.customers.length > 0 && !field.next) {
      return getters.customers;
    } else
      return customerService
        .getCustomersList(page, { ...field, paginate: 50 })
        .then(({ data }) => {
          commit('SET_CUSTOMERS', data);
          dispatch(
            'setGlobalProgress',
            {
              label: 'customers',
              min: 0,
              max: data.last_page,
              value: data.current_page,
            },
            { root: true }
          );

          if (data.next_page_url) {
            return dispatch('getCustomersList', {
              page: page + 1,
              field: { ...field, next: true },
            });
          } else dispatch('setGlobalProgress', null, { root: true });

          return data;
        });
  },

  getCustomer({ getters, commit }, id) {
    const customer = getters.customers.find(
      (p) => p.id.toString() === id.toString()
    );
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

  getCustomerStats({ commit, getters }, { customer_id, year }) {
    if (getters.year && getters.year === year) return getters.stats;
    else
      return SaleService.getCustomerStats(customer_id, year).then(
        ({ data }) => {
          commit('SET_META_STATS', { data, year });
          return data;
        }
      );
  },
};

// mutations
const mutations = {
  SET_CUSTOMERS_HASH(state, hash) {
    state.hash = hash;
  },
  SET_CUSTOMERS(state, { current_page, data }) {
    if (current_page === 1) state.customers = JSON.stringify(data);
    else {
      let oldCustomers = state.customers ? JSON.parse(state.customers) : [];
      state.customers = JSON.stringify([...oldCustomers, ...data]);
    }
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

  SET_META_STATS(state, { data, year }) {
    state.year = year ?? new Date().getFullYear();
    state.stats = JSON.stringify(data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
