import customerGroupService from '../../../services/customers/CustomerGroupService';

const state = {
  customerGroups: null,
  hash: null,
  customerGroup: null,
};

// getters
const getters = {
  customerGroups: (state) =>
    state.customerGroups ? JSON.parse(state.customerGroups) : [],
  customerGroup: (state) =>
    state.customerGroup ? JSON.parse(state.customerGroup) : null,
  getCustomerGroupById: (state, getters) => (customer_group_id) =>
    getters.customerGroups.filter((cg) => cg.id === customer_group_id),
};

const actions = {
  getCustomerGroupsList({ commit, getters }, { page, field }) {
    if (getters.customerGroups.length > 0) {
      return getters.customerGroups;
    } else
      return customerGroupService.getList(page, field).then(({ data }) => {
        commit('SET_CUSTOMER_GROUPS', data);
        return data;
      });
  },

  getCustomerGroup({ getters, commit }, id) {
    const customerGroup = getters.customerGroups.find(
      (cg) => cg.id.toString() === id.toString()
    );
    if (customerGroup !== undefined) {
      commit('SET_CURRENT_CUSTOMER_GROUP', customerGroup);
      return customerGroup;
    }
    return customerGroupService.get(id).then(({ data }) => {
      commit('SET_CURRENT_CUSTOMER_GROUP', data);
      return data;
    });
  },

  addCustomerGroup({ commit }, customerGroupField) {
    return customerGroupService.add(customerGroupField).then(({ data }) => {
      commit('ADD_CUSTOMER_GROUP', data);
      return data;
    });
  },

  updateCustomerGroup({ commit }, customerGroupField) {
    return customerGroupService
      .update(customerGroupField, customerGroupField.id)
      .then(({ data }) => {
        commit('UPDATE_CUSTOMER_GROUP', data);
        return data;
      });
  },

  deleteCustomerGroup({ commit }, customerGroupId) {
    return customerGroupService.delete(customerGroupId).then(({ data }) => {
      commit('DELETE_CUSTOMER_GROUP', customerGroupId);
      return data;
    });
  },

  addCustomerGroupLines({ getters, commit }, customers) {
    return customerGroupService
      .addCustomers(getters.customerGroup.id, customers)
      .then(({ data }) => {
        commit('ADD_CUSTOMER_GROUP_LINE', data.customerGroupLines);
      });
  },

  removeCustomerGroupLine({ commit, getters }, customerGroupLines) {
    return customerGroupService
      .removeCustomers(getters.customerGroup.id, {
        customer_group_line_ids: [...customerGroupLines],
      })
      .then(({ data }) => {
        commit('DELETE_CUSTOMER_GROUP_LINE', customerGroupLines);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_CUSTOMER_GROUPS(state, customerGroups) {
    state.customerGroups = JSON.stringify(customerGroups);
  },
  SET_CURRENT_CUSTOMER_GROUP(state, customerGroup) {
    state.customerGroup =
      customerGroup === null ? null : JSON.stringify(customerGroup);
  },
  ADD_CUSTOMER_GROUP(state, customerGroup) {
    let customer_groups = JSON.parse(state.customerGroups) ?? [];
    customer_groups.push(customerGroup);
    state.customerGroups = JSON.stringify(customer_groups);
  },
  UPDATE_CUSTOMER_GROUP(state, customerGroup) {
    let customerGroups = JSON.parse(state.customerGroups);
    const index = customerGroups.findIndex((p) => p.id === customerGroup.id);
    if (index !== -1) {
      customerGroups.splice(index, 1, customerGroup);
      state.customerGroups = JSON.stringify(customerGroups);
    }
  },
  DELETE_CUSTOMER_GROUP(state, customerGroupId) {
    state.customerGroups = JSON.stringify(
      JSON.parse(state.customerGroups).filter((p) => p.id !== customerGroupId)
    );
  },
  ADD_CUSTOMER_GROUP_LINE(state, customerGroupLines) {
    let customerGroups = JSON.parse(state.customerGroups);
    let customerGroup = JSON.parse(state.customerGroup);
    let index = customerGroups.findIndex((cg) => cg.id === customerGroup.id);
    if (index !== -1) {
      customerGroup.customer_group_lines = [
        ...customerGroup.customer_group_lines,
        ...customerGroupLines,
      ];
      customerGroups.splice(index, 1, customerGroup);
      state.customerGroup = JSON.stringify(customerGroup);
      state.customerGroups = JSON.stringify(customerGroups);
    }
  },
  DELETE_CUSTOMER_GROUP_LINE(state, customerGroupLines) {
    let customerGroups = JSON.parse(state.customerGroups);
    let customerGroup = JSON.parse(state.customerGroup);
    let index = customerGroups.findIndex((cg) => cg.id === customerGroup.id);
    if (index !== -1) {
      customerGroup.customer_group_lines =
        customerGroup.customer_group_lines.filter((cgl) => {
          return customerGroupLines.find((cl) => cl === cgl.id) === undefined;
        });
      customerGroups.splice(index, 1, customerGroup);
      state.customerGroup = JSON.stringify(customerGroup);
      state.customerGroups = JSON.stringify(customerGroups);
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
