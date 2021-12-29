import EnterpriseService from '../../../services/EnterpriseService';

const state = {};

// getters
const getters = {
  workspaces: () =>
    localStorage.getItem('workspaces')
      ? JSON.parse(localStorage.getItem('workspaces'))
      : [],
  currentWorkspace: () =>
    localStorage.getItem('currentWorkspace')
      ? JSON.parse(localStorage.getItem('currentWorkspace'))
      : null,
};

// privileges
const actions = {
  findWorkspaceByDomain({ commit, getters }, domain) {
    if (getters.currentWorkspace && getters.currentWorkspace.domain === domain)
      return getters.currentWorkspace;
    else {
      const workspace = getters.workspaces.find((w) => w.domain === domain);
      if (workspace !== undefined) {
        commit('SET_CURRENT_WORKSPACE', workspace);
        return workspace;
      } else {
        return EnterpriseService.findByDomain(domain)
          .then(({ data }) => {
            commit('SET_CURRENT_WORKSPACE', data);
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
    localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
    window?.ipcRenderer?.send('reload', 'Reload from vue');
  },

  ADD_WORKSPACES(state, workspace) {
    let workspaces = localStorage.getItem('workspaces')
      ? JSON.parse(localStorage.getItem('workspaces'))
      : [];
    const index = workspaces.findIndex((w) => w.id === workspace.id);
    if (index === -1) {
      workspaces.push(workspace);
      localStorage.setItem('workspaces', JSON.stringify(workspaces));
    }
  },

  REMOVE_WORKSPACES(state, workspaceId) {
    let workspaces = localStorage.getItem('workspaces')
      ? JSON.parse(localStorage.getItem('workspaces'))
      : [];
    workspaces = workspaces.filter((w) => w.id !== workspaceId);
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  },

  REMOVE_ALL_WORKSPACES() {
    let workspaces = [];
    localStorage.setItem('workspaces', JSON.stringify(workspaces));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
