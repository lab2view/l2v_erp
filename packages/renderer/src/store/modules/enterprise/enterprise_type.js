import enterpriseTypeService from '../../../services/enterprise/EnterpriseTypeService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  enterpriseTypes: null,
  hash: null,
  enterpriseType: null,
};

// getters
const getters = {
  enterpriseTypes: (state) => (state.enterpriseTypes ? JSON.parse(state.enterpriseTypes) : []),
  enterpriseType: (state) => (state.enterpriseType ? JSON.parse(state.enterpriseType) : null),
};

const actions = {
  getEnterpriseTypesList({ commit, getters }, { page, field }) {
    if (getters.enterpriseTypes.length > 0) {
      return getters.enterpriseTypes;
    } else
      return enterpriseTypeService.getEnterpriseTypesList(page, field).then(({ data }) => {
        commit('SET_ENTERPRISE_TYPES', data);
        return data;
      });
  },

  getEnterpriseType({ getters, commit }, id) {
    const enterpriseType = getters.enterpriseTypes.find((p) => p.id.toString() === id);
    if (enterpriseType !== undefined) {
      commit('SET_CURRENT_ENTERPRISE_TYPE', enterpriseType);
      return enterpriseType;
    } else
      return enterpriseTypeService.getEnterpriseType(id).then(({ data }) => {
        commit('SET_CURRENT_ENTERPRISE_TYPE', data);
        return data;
      });
  },

  addEnterpriseType({ commit }, enterpriseTypeField) {
    return enterpriseTypeService.addEnterpriseType(enterpriseTypeField).then(({ data }) => {
      commit('ADD_ENTERPRISE_TYPE', data);
      notify(
        i18n.global.t('enterprise.enterpriseType.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateEnterpriseType({ commit }, enterpriseTypeField) {
    return enterpriseTypeService
      .updateEnterpriseType(enterpriseTypeField, enterpriseTypeField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('enterprise.enterpriseType.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_ENTERPRISE_TYPE', data);
        return data;
      });
  },

  deleteEnterpriseType({ commit }, enterpriseTypeId) {
    return enterpriseTypeService.deleteEnterpriseType(enterpriseTypeId).then(({ data }) => {
      commit('DELETE_ENTERPRISE_TYPE', enterpriseTypeId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_ENTERPRISE_TYPES(state, enterpriseTypes) {
    state.enterpriseTypes = JSON.stringify(enterpriseTypes);
  },
  SET_CURRENT_ENTERPRISE_TYPE(state, enterpriseType) {
    state.enterpriseType = enterpriseType === null ? null : JSON.stringify(enterpriseType);
  },
  ADD_ENTERPRISE_TYPE(state, enterpriseType) {
    let enterpriseTypes = JSON.parse(state.enterpriseTypes);
    enterpriseTypes.push(enterpriseType);
    state.enterpriseTypes = JSON.stringify(enterpriseTypes);
  },
  UPDATE_ENTERPRISE_TYPE(state, enterpriseType) {
    let enterpriseTypes = JSON.parse(state.enterpriseTypes);
    const index = enterpriseTypes.findIndex((p) => p.id === enterpriseType.id);
    if (index !== -1) {
      enterpriseTypes.splice(index, 1, enterpriseType);
      state.enterpriseTypes = JSON.stringify(enterpriseTypes);
    }
  },
  DELETE_ENTERPRISE_TYPE(state, enterpriseTypeId) {
    state.enterpriseTypes = JSON.stringify(
      JSON.parse(state.enterpriseTypes).filter((p) => p.id !== enterpriseTypeId)
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
