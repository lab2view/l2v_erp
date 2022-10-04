import customerTypeService from '../../../services/customers/CustomerTypeService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  customerTypes: null,
  hash: null,
  customerType: null,
};

// getters
const getters = {
  customerTypes: (state) =>
    state.customerTypes ? JSON.parse(state.customerTypes) : [],
  customerType: (state) =>
    state.customerType ? JSON.parse(state.customerType) : null,
};

const actions = {
  getCustomerTypesList({ commit, getters }, { page, field }) {
    if (getters.customerTypes.length > 0 && !field.next) {
      return getters.customerTypes;
    } else
      return customerTypeService
        .getCustomerTypesList(page, field)
        .then(({ data }) => {
          commit('SET_CUSTOMER_TYPES', data);
          return data;
        });
  },

  getCustomerType({ getters, commit }, id) {
    const customerType = getters.customerTypes.find(
      (p) => p.id.toString() === id
    );
    if (customerType !== undefined) {
      commit('SET_CURRENT_CUSTOMER_TYPE', customerType);
      return customerType;
    } else
      return customerTypeService.getCustomerType(id).then(({ data }) => {
        commit('SET_CURRENT_CUSTOMER_TYPE', data);
        return data;
      });
  },

  addCustomerType({ commit }, customerTypeField) {
    return customerTypeService
      .addCustomerType(customerTypeField)
      .then(({ data }) => {
        commit('ADD_CUSTOMER_TYPE', data);
        notify(
          i18n.global.t('customers.customerType.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  updateCustomerType({ commit }, customerTypeField) {
    return customerTypeService
      .updateCustomerType(customerTypeField, customerTypeField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('customers.customerType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_CUSTOMER_TYPE', data);
        return data;
      });
  },

  deleteCustomerType({ commit }, customerTypeId) {
    return customerTypeService
      .deleteCustomerType(customerTypeId)
      .then(({ data }) => {
        commit('DELETE_CUSTOMER_TYPE', customerTypeId);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_CUSTOMER_TYPES(state, customerTypes) {
    state.customerTypes = JSON.stringify(customerTypes);
  },
  SET_CURRENT_CUSTOMER_TYPE(state, customerType) {
    state.customerType =
      customerType === null ? null : JSON.stringify(customerType);
  },
  ADD_CUSTOMER_TYPE(state, customerType) {
    let customerTypes = JSON.parse(state.customerTypes);
    customerTypes.push(customerType);
    state.customerTypes = JSON.stringify(customerTypes);
  },
  UPDATE_CUSTOMER_TYPE(state, customerType) {
    let customerTypes = JSON.parse(state.customerTypes);
    const index = customerTypes.findIndex((p) => p.id === customerType.id);
    if (index !== -1) {
      customerTypes.splice(index, 1, customerType);
      state.customerTypes = JSON.stringify(customerTypes);
    }
  },
  DELETE_CUSTOMER_TYPE(state, customerTypeId) {
    state.customerTypes = JSON.stringify(
      JSON.parse(state.customerTypes).filter((p) => p.id !== customerTypeId)
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
