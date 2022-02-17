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
      (p) => p.id.toString() === id
    );
    if (customerGroup !== undefined) {
      commit('SET_CURRENT_CUSTOMER_GROUP', customerGroup);
      return customerGroup;
    } else
      return customerGroupService.getCustomerGroup(id).then(({ data }) => {
        commit('SET_CURRENT_CUSTOMER_GROUP', data);
        return data;
      });
  },

  addCustomerGroup({ commit }, customerGroupField) {
    return customerGroupService
      .addCustomerGroup(customerGroupField)
      .then(({ data }) => {
        commit('ADD_CUSTOMER_GROUP', data);
        notify(
          i18n.global.t('customers.customerGroup.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
