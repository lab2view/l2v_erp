import customerGroupLineService from '../../../services/customers/CustomerGroupLineService';

const state = {
  customerGroupLines: null,
  hash: null,
  customerGroupLine: null,
};

// getters
const getters = {
  customerGroupLines: (state) =>
    state.customerGroupLines ? JSON.parse(state.customerGroupLines) : [],
  customerGroupLine: (state) =>
    state.customerGroupLine ? JSON.parse(state.customerGroupLine) : null,
  getCustomerGroupLinesByGroupId: (state, getters) => (customer_group_id) =>
    getters.customerGroupLines.filter(
      (l) => l.customer_group_id === customer_group_id
    ),
  getCustomerGroupLinesByCustomerId: (state, getters) => (customer_id) =>
    getters.customerGroupLines.filter((l) => l.customer_id === customer_id),
};

// privileges
const actions = {
  getCustomerGroupLinesList({ commit, getters }, { page, field }) {
    if (getters.customerGroupLines.length > 0) {
      return getters.customerGroupLines;
    } else
      return customerGroupLineService
        .getCustomerGroupLinesList(page, field)
        .then(({ data }) => {
          commit('SET_CUSTOMER_GROUP_LINES', data);
          return data;
        });
  },

  getCustomerGroupLine({ getters }, id) {
    const customerGroupLine = getters.customerGroupLines.find(
      (p) => p.id.toString() === id
    );
    if (customerGroupLine !== undefined) {
      return customerGroupLine;
    } else
      return customerGroupLineService
        .getCustomerGroupLine(id)
        .then(({ data }) => {
          return data;
        });
  },

  addCustomerGroupLine({ commit }, customerGroupLineField) {
    return customerGroupLineService
      .add(customerGroupLineField)
      .then(({ data }) => {
        commit('ADD_CUSTOMER_GROUP_LINE', data);
        return data;
      });
  },

  updateCustomerGroupLine({ commit }, customerGroupLineField) {
    return customerGroupLineService
      .updateCustomerGroupLine(
        customerGroupLineField,
        customerGroupLineField.id
      )
      .then(({ data }) => {
        commit('UPDATE_CUSTOMER_GROUP_LINE', data);
        return data;
      });
  },

  deleteCustomerGroupLine({ commit }, customerGroupLineId) {
    return customerGroupLineService
      .deleteCustomerGroupLine(customerGroupLineId)
      .then(({ data }) => {
        commit('DELETE_CUSTOMER_GROUP_LINE', customerGroupLineId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_CUSTOMER_GROUP_LINES(state, customerGroupLines) {
    state.customerGroupLines = JSON.stringify(customerGroupLines);
  },
  ADD_CUSTOMER_GROUP_LINE(state, customerGroupLine) {
    let customerGroupLines = JSON.parse(state.customerGroupLines);
    customerGroupLines.push(customerGroupLine);
    state.customerGroupLines = JSON.stringify(customerGroupLines);
  },
  UPDATE_CUSTOMER_GROUP_LINE(state, customerGroupLine) {
    let customerGroupLines = JSON.parse(state.customerGroupLines);
    const index = customerGroupLines.findIndex(
      (p) => p.id === customerGroupLine.id
    );
    if (index !== -1) {
      customerGroupLines.splice(index, 1, customerGroupLine);
      state.customerGroupLines = JSON.stringify(customerGroupLines);
    }
  },
  DELETE_CUSTOMER_GROUP_LINE(state, customerGroupLineId) {
    state.customerGroupLines = JSON.stringify(
      JSON.parse(state.customerGroupLines).filter(
        (p) => p.id !== customerGroupLineId
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
