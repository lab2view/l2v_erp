import enterpriseService from '../../../services/structures/EnterpriseService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  enterprises: null,
  hash: null,
  enterprise: null,
  enterprise_modules: null,
};

// getters
const getters = {
  enterprises: (state) => (state.enterprises ? JSON.parse(state.enterprises) : []),
  enterprise: (state) => (state.enterprise ? JSON.parse(state.enterprise) : null),
};

const actions = {
  getEnterprisesList({ commit, getters }, { page, field }) {
    if (getters.enterprises.length > 0) {
      return getters.enterprises;
    } else
      return enterpriseService.getEnterprisesList(page, field).then(({ data }) => {
        commit('SET_ENTERPRISES', data);
        return data;
      });
  },

  getEnterprise({ getters, commit }, id) {
    const enterprise = getters.enterprises.find((p) => p.id.toString() === id);
    if (enterprise !== undefined) {
      commit('SET_CURRENT_ENTERPRISE', enterprise);
      return enterprise;
    } else
      return enterpriseService.getEnterprise(id).then(({ data }) => {
        commit('SET_CURRENT_ENTERPRISE', data);
        return data;
      });
  },

  getEnterpriseModulesList({ getters, commit }, id) {
    const enterprise = getters.enterprises.find((p) => p.id.toString() === id);
    if (enterprise !== undefined) {
      commit('SET_CURRENT_ENTERPRISE', enterprise);
      return enterprise;
    } else
      return enterpriseService.getEnterprise(id).then(({ data }) => {
        commit('SET_CURRENT_ENTERPRISE', data);
        return data;
      });
  },

  addEnterprise({ commit }, enterpriseField) {
    return enterpriseService.addEnterprise(enterpriseField).then(({ data }) => {
      commit('ADD_ENTERPRISE', data);
      notify(i18n.global.t('structures.enterprise.store'), 'Ok', 'theme', 'fa fa-check');
      return data;
    });
  },

  updateEnterprise({ commit }, enterpriseField) {
    return enterpriseService
      .updateEnterprise(enterpriseField, enterpriseField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.enterprise.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ENTERPRISE', data);
        commit('SET_CURRENT_ENTERPRISE', data);
        return data;
      });
  },

  deleteEnterprise({ commit }, enterpriseId) {
    return enterpriseService.deleteEnterprise(enterpriseId).then(({ data }) => {
      commit('DELETE_ENTERPRISE', enterpriseId);
      return data;
    });
  },

  addEnterpriseModule({ commit }, enterpriseField) {
    return enterpriseService.addEnterpriseModule(enterpriseField).then(({ data }) => {
      notify(i18n.global.t('structures.enterpriseModule.store'), 'Ok', 'theme', 'fa fa-check');
      commit('UPDATE_ENTERPRISE', data);
      commit('SET_CURRENT_ENTERPRISE', data);
      return data;
    });
  },

  updateEnterpriseModule({ commit }, enterpriseField) {
    return enterpriseService
      .updateEnterpriseModule(enterpriseField, enterpriseField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.enterpriseModule.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ENTERPRISE', data);
        commit('SET_CURRENT_ENTERPRISE', data);
        return data;
      });
  },

  deleteEnterpriseModule({ commit }, enterpriseId) {
    return enterpriseService.deleteEnterpriseModule(enterpriseId).then(({ data }) => {
      notify(
        i18n.global.t('structures.enterpriseModule.delete'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      commit('UPDATE_ENTERPRISE', data);
      commit('SET_CURRENT_ENTERPRISE', data);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_ENTERPRISES(state, enterprises) {
    state.enterprises = JSON.stringify(enterprises);
  },
  SET_CURRENT_ENTERPRISE(state, enterprise) {
    state.enterprise = enterprise === null ? null : JSON.stringify(enterprise);
    state.enterprise_modules = enterprise === null || enterprise.modules === null ? null : JSON.stringify(enterprise.modules);
  },
  ADD_ENTERPRISE(state, enterprise) {
    let enterprises = JSON.parse(state.enterprises);
    enterprises.push(enterprise);
    state.enterprises = JSON.stringify(enterprises);
  },
  UPDATE_ENTERPRISE(state, enterprise) {
    let enterprises = JSON.parse(state.enterprises);
    const index = enterprises.findIndex((p) => p.id === enterprise.id);
    if (index !== -1) {
      enterprises.splice(index, 1, enterprise);
      state.enterprises = JSON.stringify(enterprises);
    }
  },
  UPDATE_ENTERPRISE_MODULE(state, enterprise, modules) {
    let enterprises = JSON.parse(state.enterprises);
    const index = enterprises.findIndex((p) => p.id === enterprise.id);
    if (index !== -1) {
      enterprise.modules = modules;
      enterprises.splice(index, 1, enterprise);
      state.enterprises = JSON.stringify(enterprises);
    }
  },
  DELETE_ENTERPRISE(state, enterpriseId) {
    state.enterprises = JSON.stringify(
      JSON.parse(state.enterprises).filter((p) => p.id !== enterpriseId)
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
