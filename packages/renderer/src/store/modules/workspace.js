import EnterpriseService from '../../services/EnterpriseService';
import { removeStorage } from '/@/helpers/utils.js';
import { replace } from 'lodash';

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
  isWoodinWorkspace: (state, getters) => {
    if (getters.currentWorkspace)
      return RegExp('woodin*').test(getters.currentWorkspace.domain);
    else return false;
  },
  isGilsSportWorkspace: (state, getters) => {
    if (getters.currentWorkspace)
      return RegExp('gils-sport*').test(getters.currentWorkspace.domain);
    else return false;
  },
  isEscaleMarketWorkspace: (state, getters) => {
    if (getters.currentWorkspace)
      return RegExp('escale-market*').test(getters.currentWorkspace.domain);
    else return false;
  },
  currency: (state, getters) => getters.currentWorkspace?.currency ?? 'XAF',
  databaseName: (state, getters) =>
    getters.currentWorkspace?.database ?? 'kitbusiness',
  currentDomain: (state, getters, rootState) => {
    return getters.currentWorkspace?.domain ?? rootState.landlordDomain;
  },
  workspaceExternalShopLink: (state, getters, rootState) => {
    return (
      'https://' +
      replace(
        getters.currentDomain,
        rootState.landlordDomain,
        `shop.${rootState.landlordDomain}`
      )
    );
  },
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
            commit('ADD_WORKSPACES', data);
            return data;
          })
          .catch((err) => {
            if (err.response) return Promise.reject(err.response.data);
            else return Promise.reject(err);
          });
      }
    }
  },

  findWorkspaceById({ commit, getters }, id) {
    const workspace = getters.workspaces.find((w) => w.id === id);
    if (workspace !== undefined) {
      commit('SET_CURRENT_WORKSPACE', workspace);
      return workspace;
    }
  },

  forgetCurrentWorkspace({ commit }) {
    commit('SET_CURRENT_WORKSPACE', null);
  },

  setCurrentWorkspace({ commit }, workspace) {
    commit('SET_CURRENT_WORKSPACE', workspace);
    return workspace;
  },
};

// mutations
const mutations = {
  SET_CURRENT_WORKSPACE(state, workspace) {
    if (workspace) {
      localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
      if (window?.ipcRenderer)
        window?.ipcRenderer?.send('reload', 'Changing workspace');
      else location.reload();
    } else {
      removeStorage()
        .then(() => {
          localStorage.removeItem('currentWorkspace');
          if (window?.ipcRenderer)
            window?.ipcRenderer?.send('reload', 'Changing workspace');
          else location.reload();
        })
        .catch((err) => console.log(err));
    }
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
