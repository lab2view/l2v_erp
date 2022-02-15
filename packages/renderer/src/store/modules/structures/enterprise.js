import enterpriseService from '../../../services/structures/EnterpriseService';

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

  addEnterprise({ commit }, enterpriseField) {
    return enterpriseService.addEnterprise(enterpriseField).then(({ data }) => {
      commit('ADD_ENTERPRISE', data);
      commit('SET_CURRENT_ENTERPRISE', data);
      return data;
    });
  },

  updateEnterprise({ commit }, enterpriseField) {
    return enterpriseService
      .updateEnterprise(enterpriseField, enterpriseField.id)
      .then(({ data }) => {
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

  addEnterpriseModule({ commit }, { moduleId, enterpriseId }) {
    return enterpriseService
      .addEnterpriseModule({
        enterprise_id: enterpriseId,
        module_id: moduleId,
      })
      .then(({ data }) => {
        commit('UPDATE_ENTERPRISE_MODULE', { enterpriseModule: data });
        return data;
      });
  },

  deleteEnterpriseModule({ commit }, enterpriseModule) {
    return enterpriseService
      .deleteEnterpriseModule(enterpriseModule.id)
      .then(({ data }) => {
        // notify(
        //   i18n.global.t('structures.enterpriseModule.deleted'),
        //   'Ok',
        //   'theme',
        //   'fa fa-check'
        // );
        commit('UPDATE_ENTERPRISE_MODULE', {
          enterpriseModule,
          added: false,
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
    }
    state.enterprise = JSON.stringify(enterprise);
    state.enterprises = JSON.stringify(enterprises);
  },
  UPDATE_ENTERPRISE_MODULE(state, { enterpriseModule, added = true }) {
    let enterprises = JSON.parse(state.enterprises);
    let enterprise = JSON.parse(state.enterprise);
    let enterprise_modules = enterprise.enterprise_modules ?? [];
    let index = enterprises.findIndex(
      (ent) => ent.id === enterpriseModule.enterprise_id
    );

    if (added) {
      enterprise_modules.push(enterpriseModule);
    } else {
      enterprise_modules = enterprise_modules.filter(
        (em) => em.id !== enterpriseModule.id
      );
    }

    enterprise.enterprise_modules = enterprise_modules;

    if (index !== -1) {
      enterprises.splice(index, 1, enterprise);
    }

    state.enterprise = JSON.stringify(enterprise);
    state.enterprises = JSON.stringify(enterprises);
  },
  DELETE_ENTERPRISE(state, enterpriseId) {
    state.enterprises = JSON.stringify(
      JSON.parse(state.enterprises).filter(
        (enterprise) => enterprise.id !== enterpriseId
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
