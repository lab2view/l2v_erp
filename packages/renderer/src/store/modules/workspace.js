import EnterpriseService from "../../../services/EnterpriseService";

const state = {
  workspaces: [],
  currentWorkspace: null,
};

// getters
const getters = {};

// privileges
const actions = {
  findWorkspaceByDomain({ commit, state }, domain) {
    if (state.currentWorkspace && state.currentWorkspace.domain === domain)
      return state.currentWorkspace;
    else {
      const workspace = state.workspaces.find((w) => w.domain === domain);
      if (workspace !== undefined) {
        commit("SET_CURRENT_WORKSPACE", workspace);
        return workspace;
      } else {
        return EnterpriseService.findByDomain(domain)
          .then(({ data }) => {
            commit("SET_CURRENT_WORKSPACE", data);
            return data;
          })
          .catch((err) => {
            return Promise.reject(err.response.data);
          });
      }
    }
  },
};

// mutations
const mutations = {
  SET_CURRENT_WORKSPACE(state, workspace) {
    state.currentWorkspace = workspace;
    //Intialisation de la BD
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
