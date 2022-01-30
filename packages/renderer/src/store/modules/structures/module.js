import moduleService from '../../../services/structures/ModuleService';
import { notify } from '/@/helpers/notify';
import i18n from '../../../i18n';

const state = {
  modules: null,
  hash: null,
  module: null,
};

// getters
const getters = {
  modules: (state) =>
    state.modules ? JSON.parse(state.modules) : [],
  module: (state) =>
    state.module ? JSON.parse(state.module) : null,
};

const actions = {
  getModulesList({ commit, getters }, { page, field }) {
    if (getters.modules.length > 0) {
      return getters.modules;
    } else
      return moduleService.getModulesList(page, field).then(({ data }) => {
        commit('SET_MODULES', data);
        return data;
      });
  },

  getModule({ getters, commit }, id) {
    const module = getters.modules.find(
      (p) => p.id.toString() === id
    );
    if (module !== undefined) {
      commit('SET_CURRENT_MODULE', module);
      return module;
    } else
      return moduleService.get(id).then(({ data }) => {
        commit('SET_CURRENT_MODULE', data);
        return data;
      });
  },

  addModule({ commit }, moduleField) {
    return moduleService.add(moduleField).then(({ data }) => {
      commit('ADD_MODULE', data);
      notify(
        i18n.global.t('structures.module.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateModule({ commit }, moduleField) {
    return moduleService
      .update(moduleField, moduleField.id)
      .then(({ data }) => {
        notify(
          i18n.global.t('structures.module.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        commit('UPDATE_MODULE', data);
        return data;
      });
  },

  deleteModule({ commit }, moduleId) {
    return moduleService.delete(moduleId).then(({ data }) => {
      commit('DELETE_MODULE', moduleId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_MODULES(state, modules) {
    state.modules = JSON.stringify(modules);
  },
  SET_CURRENT_MODULE(state, pack) {
    state.module = JSON.stringify(pack);
  },
  ADD_MODULE(state, pack) {
    let modules = JSON.parse(state.modules);
    modules.push(pack);
    state.modules = JSON.stringify(modules);
  },
  UPDATE_MODULE(state, pack) {
    let modules = JSON.parse(state.modules);
    const index = modules.findIndex((p) => p.id === pack.id);
    if (index !== -1) {
      modules.splice(index, 1, pack);
      state.modules = JSON.stringify(modules);
    }
  },
  DELETE_MODULE(state, moduleId) {
    state.modules = JSON.stringify(
      JSON.parse(state.modules).filter((p) => p.id !== moduleId)
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
