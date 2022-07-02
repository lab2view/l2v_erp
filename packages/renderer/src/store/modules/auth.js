import AuthService from '../../services/AuthService';
import { roleAdminCode, roleCashierCode } from '/@/helpers/codes.js';
import userService from '/@/services/iam/IamUserService';
import { removeStorage } from '/@/helpers/utils.js';

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
  isCashierRole: (state, getters) =>
    getters.currentUser?.role?.code === roleCashierCode,
  currentEnterprise: (state, getters) => getters.currentUser?.enterprise,
};

// privileges
const actions = {
  updateAuthUser({ commit }, userFields) {
    return userService
      .updateUser(userFields, userFields.id)
      .then(({ data }) => {
        commit('UPDATE_CURRENT_USER', data);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },

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
    removeStorage();
    commit('SET_CURRENT_USER', null);
  },
};

// mutations
const mutations = {
  SET_CURRENT_USER(state, user) {
    state.currentUser = user ? JSON.stringify(user) : null;
    setTimeout(() => {
      if (window?.ipcRenderer)
        window?.ipcRenderer?.send('reload', 'User connexion');
      else location.reload();
    }, 2000);
  },
  UPDATE_CURRENT_USER(state, user) {
    user = {
      ...JSON.parse(state.currentUser),
      ...user,
    };
    state.currentUser = user ? JSON.stringify(user) : null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
