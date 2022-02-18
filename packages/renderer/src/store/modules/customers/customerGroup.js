import customerGroupService from '../../../services/customers/CustomerGroupService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

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
      return customerGroupService
        .getCustomerGroupsList(page, field)
        .then(({ data }) => {
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

    return customerGroupService.getCustomerGroup(id).then(({ data }) => {
      if (data) {
        commit('SET_CURRENT_CUSTOMER_GROUP', data);
        return data;
      }
      return null;
    });
  },

  addCustomerGroup({ commit }, customerGroupField) {
    return customerGroupService
      .addCustomerGroup(customerGroupField)
      .then(({ data }) => {
        commit('ADD_CUSTOMER_GROUP', data);
        return data;
      });
  },

  addCustomerToCustomerGroup({ commit }, { id, customer_id }) {
    return customerGroupService
      .addCustomersToCustomerGroup(id, [customer_id])
      .then(({ data }) => {
        commit('ADD_CUSTOMER_TO_CUSTOMER_GROUP', data);
        return data;
      });
  },

  updateCustomerGroup({ commit }, customerGroupField) {
    return customerGroupService
      .updateCustomerGroup(customerGroupField, customerGroupField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('customers.customerGroup.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_CUSTOMER_GROUP', data);
        return data;
      });
  },

  deleteCustomerGroup({ commit }, customerGroupId) {
    return customerGroupService
      .deleteCustomerGroup(customerGroupId)
      .then(({ data }) => {
        commit('DELETE_CUSTOMER_GROUP', customerGroupId);
        return data;
      });
  },

  deleteCustomerGroupLine({ commit }, customerGroupLine) {
    return customerGroupService
      .forceDeleteCustomersToCustomerGroup(customerGroupLine.id)
      .then(({ data }) => {
        commit('DELETE_CUSTOMER_GROUP_LINE', customerGroupLine);
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
    let customerGroups = JSON.parse(state.customerGroups);
    customerGroups.push(customerGroup);
    state.customerGroups = JSON.stringify(customerGroups);
  },
  ADD_CUSTOMER_TO_CUSTOMER_GROUP(state, data) {
    console.log('good add customer to group');
    console.log(data);
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
  DELETE_CUSTOMER_GROUP_LINE(state, customerGroupLine) {
    let customerGroup = JSON.parse(state.customerGroup);
    customerGroup.customer_group_lines =
      customerGroup.customer_group_lines?.filter(
        (cgl) => cgl.id !== customerGroupLine.id
      );
    state.customerGroup = JSON.stringify(customerGroup);
    state.customerGroups = JSON.stringify(
      JSON.parse(state.customerGroups).map((cg) => {
        return customerGroup.id === cg.id ? customerGroup : cg;
      })
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
