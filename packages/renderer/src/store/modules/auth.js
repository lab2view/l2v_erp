import AuthService from '../../services/AuthService';
import { roleAdminCode } from '/@/helpers/codes.js';

const state = {
  currentUser: null,
  unlock: true,
};

// getters
const getters = {
  currentUser: (state) => {
    return JSON.parse(state.currentUser)?.user;
  },
  token: (state) => {
    return JSON.parse(state.currentUser)?.token;
  },
  currentUserEmail: (state, getters) => getters.currentUser?.email,
  currentUserRole: (state, getters) => getters.currentUser?.role?.label,
  isRoleAdmin: (state, getters) =>
    getters.currentUser?.role?.code === roleAdminCode,
  currentEnterprise: (state, getters) => getters.currentUser?.enterprise,
};

// privileges
const actions = {
  login({ commit }, credential) {
    return AuthService.login(credential)
      .then(({ data }) => {
        commit('SET_CURRENT_USER', data);
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },

  logout({ commit }) {
    if (confirm('Do you realy want to logout?')) {
      commit('SET_CURRENT_USER', null);
    } else {
      return;
    }
  },
};

// mutations
const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user ? JSON.stringify(user) : null;
    if (window?.ipcRenderer)
      window?.ipcRenderer?.send('reload', 'User connexion');
    else location.reload();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
