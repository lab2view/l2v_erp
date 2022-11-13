import enterpriseService from '../../../services/enterprise/EnterpriseService';

const state = {
  enterprises: null,
  enterprisesFilter:null,
  hash: null,
  enterprise: null,
  distributions: null,
  request_field: {
    enterprise_type_id: null,
  },
};

// getters
const getters = {
  enterprisesFilter: (state) =>
    state.enterprisesFilter ? JSON.parse(state.enterprisesFilter) : [],
  enterprises: (state) =>
    state.enterprises ? JSON.parse(state.enterprises) : [],
  distributions: (state) =>
    state.distributions ? JSON.parse(state.distributions) : [],
  enterprise: (state) =>
    state.enterprise ? JSON.parse(state.enterprise) : null,
  haveEnterprise: (state) => !!state.enterprise,
  getEnterpriseHash: (state) => state.hash ?? null,
  getEnterpriseById: (state, getters) => (id) =>
    getters.enterprises.find((ent) => ent.id === id) ?? null,
  requestField: (state) => state.request_field,
  getEnterprisesByFilter: (state, getters) => (enterprise_type_id) =>
    getters.enterprises.filter((ent) => ent.enterprise_type_id === enterprise_type_id),
};

const actions = {
  getEnterprisesList({commit, getters}, {page, field}) {
    if (field.requestField?.enterprise_type_id) {
      const data = getters.getEnterprisesByFilter(field.requestField?.enterprise_type_id);
      commit('SET_ENTERPRISES_Filter', data);
      return data;
    } else
      return enterpriseService
        .getEnterprisesList(page, field)
        .then(({data}) => {
          commit('SET_ENTERPRISES', data);
          return data;
        });
  },

  getEnterpriseArticleStats({commit, getters}, next) {
    if (getters.distributions.length > 0 && !next) {
      return getters.distributions;
    } else
      return enterpriseService.getEnterpriseArticleStats().then(({data}) => {
        commit('SET_ARTICLE_STATS', data);
        return data;
      });
  },

  getEnterprise({getters, commit}, id) {
    const enterprise = getters.enterprises.find((p) => p.id.toString() === id);
    if (enterprise !== undefined) {
      commit('SET_CURRENT_ENTERPRISE', enterprise);
      return enterprise;
    } else
      return enterpriseService.getEnterprise(id).then(({data}) => {
        commit('SET_CURRENT_ENTERPRISE', data);
        return data;
      });
  },

  addEnterprise({commit}, enterpriseField) {
    return enterpriseService.addEnterprise(enterpriseField).then(({data}) => {
      commit('ADD_ENTERPRISE', data);
      commit('SET_CURRENT_ENTERPRISE', data);
      return data;
    });
  },

  updateEnterprise({commit}, enterpriseField) {
    return enterpriseService
      .updateEnterprise(enterpriseField, enterpriseField.id)
      .then(({data}) => {
        commit('UPDATE_ENTERPRISE', data);
        return data;
      });
  },

  deleteEnterprise({commit}, enterpriseId) {
    return enterpriseService.deleteEnterprise(enterpriseId).then(({data}) => {
      commit('DELETE_ENTERPRISE', enterpriseId);
      return data;
    });
  },

  addEnterpriseModule({commit}, {moduleId, enterpriseId}) {
    return enterpriseService
      .addEnterpriseModule({
        enterprise_id: enterpriseId,
        module_id: moduleId,
      })
      .then(({data}) => {
        commit('UPDATE_ENTERPRISE_MODULE', {enterpriseModule: data});
        return data;
      });
  },

  deleteEnterpriseModule({commit}, enterpriseModule) {
    return enterpriseService
      .deleteEnterpriseModule(enterpriseModule.id)
      .then(({data}) => {
        // notify(
        //   i18n.global.t('enterprise.enterpriseModule.deleted'),
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
  SET_ENTERPRISE_HASH(state, hash) {
    state.hash = hash;
  },
  SET_ENTERPRISES(state, enterprises) {
    state.enterprises = JSON.stringify(enterprises);
    state.enterprisesFilter = state.enterprises
  },
  SET_ENTERPRISES_Filter(state, enterprises) {
    state.enterprisesFilter = JSON.stringify(enterprises);
  },
  SET_ARTICLE_STATS(state, distributions) {
    state.distributions = JSON.stringify(distributions);
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
  UPDATE_ENTERPRISE_MODULE(state, {enterpriseModule, added = true}) {
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
  SET_REQUEST_FIELD_VALUE(state, {field, value}) {
    state.request_field[field] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
