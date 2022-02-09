import enterpriseService from '../../../services/structures/EnterpriseService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  enterprises: null,
  hash: null,
  enterprise: null,
};

// getters
const getters = {
  enterprises: (state) =>
    state.enterprises ? JSON.parse(state.enterprises) : [],
  enterprise: (state) =>
    state.enterprise ? JSON.parse(state.enterprise) : null,
  haveEnterprise: (state) => !!state.enterprise,
};

const actions = {
  getEnterprisesList({ commit, getters }, { page, field }) {
    if (getters.enterprises.length > 0) {
      return getters.enterprises;
    } else
      return enterpriseService
        .getEnterprisesList(page, field)
        .then(({ data }) => {
          commit('SET_ENTERPRISES', data);
          return data;
        });
  },

  findEnterprise({ getters, commit }, id) {
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

  getEnterprise({ commit }, id) {
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
      notify(
        i18n.global.t('structures.enterprise.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
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
        return data;
      });
  },

  deleteEnterprise({ commit }, enterpriseId) {
    return enterpriseService.deleteEnterprise(enterpriseId).then(({ data }) => {
      commit('DELETE_ENTERPRISE', enterpriseId);
      return data;
    });
  },

  addEnterpriseModule({ commit }, { enterpriseId, moduleId }) {
    return enterpriseService
      .addEnterpriseModule({
        enterprise_id: enterpriseId,
        module_id: moduleId,
      })
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.enterpriseModule.store'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ENTERPRISE_MODULE', { enterpriseId, fields: data });
        return data;
      });
  },

  deleteEnterpriseModule({ commit }, enterpriseModuleId) {
    return enterpriseService
      .deleteEnterpriseModule(enterpriseModuleId)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.enterpriseModule.delete'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ENTERPRISE_MODULE', {
          enterpriseModuleId,
          fields: null,
        });
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
  UPDATE_ENTERPRISE_MODULE(
    state,
    { enterpriseId = null, enterpriseModuleId = null, fields = null }
  ) {
    let enterprises = JSON.parse(state.enterprises);
    let enterprise = JSON.parse(state.enterprise);
    let index =
      enterpriseId !== null || enterprise === null
        ? enterprises.findIndex((p) => p.id === enterpriseId)
        : enterprises.findIndex((p) => p.id === enterprise.id);
    if (
      enterpriseModuleId &&
      (fields == null || !fields.state || fields.state !== 'ACTIVE')
    ) {
      if (enterprise) {
        enterprise.enterprise_modules = enterprise.enterprise_modules.filter(
          (enterpriseModule) =>
            enterpriseModule.id.toString() !== enterpriseModuleId.toString()
        );
      }
      if (index !== -1) {
        enterprises[index].enterprise_modules =
          enterprises[index].enterprise_modules ?? [];
        enterprises[index].enterprise_modules.push(fields);
      }
      state.enterprise = JSON.stringify(enterprise);
    } else {
      if (index !== -1) {
        enterprises[index].enterprise_modules =
          enterprises[index].enterprise_modules ?? [];
        enterprises[index].enterprise_modules.push(fields);
      }
      if (enterprise) {
        enterprise.enterprise_modules.push(fields);
        state.enterprise = JSON.stringify(enterprise);
      }
    }
    state.enterprises = JSON.stringify(enterprises);
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
