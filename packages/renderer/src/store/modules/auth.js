import AuthService from '../../services/AuthService';
import { roleAdminCode, roleCashierCode } from '/@/helpers/codes.js';
import userService from '/@/services/iam/IamUserService';
import { removeStorage } from '/@/helpers/utils.js';

const state = {
  currentUser: null,
  unlock: true,
  resetPasswordResponse: null,
  resetPasswordToken: null,
};

// getters
const getters = {
  currentUser: (state) => {
    return JSON.parse(state.currentUser)?.user;
  },
  token: (state) => {
    return JSON.parse(state.currentUser)?.token;
  },
  unlock: (state) => {
    return state.unlock;
  },
  phone: (state) => {
    return JSON.parse(state.resetPasswordResponse)?.phone;
  },
  requestId: (state) => {
    return JSON.parse(state.resetPasswordResponse)?.request_id;
  },
  currentUserEmail: (state, getters) => getters.currentUser?.email,
  currentUserRole: (state, getters) => getters.currentUser?.role?.label,
  isRoleAdmin: (state, getters) =>
    getters.currentUser?.role?.code === roleAdminCode,
  isCashierRole: (state, getters) =>
    getters.currentUser?.role?.code === roleCashierCode,
  currentEnterprise: (state, getters) => getters.currentUser?.enterprise,
  currentEnterpriseId: (state, getters) => getters.currentEnterprise?.id,
};

// privileges
const actions = {
  updateAuthUserPassword({ commit }, userFields) {
    return userService
      .updateUserPassword(userFields, userFields.id)
      .then(({ data }) => {
        commit('UPDATE_CURRENT_USER', data);
        return data;
      })
      .catch((err) => {
        if (err.response) return Promise.reject(err.response.data);
        else return Promise.reject(err);
      });
  },
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
    return AuthService.login(credential).then(({ data }) => {
      commit('SET_CURRENT_USER', data);
    });
  },

  sendResetPasswordCode({ commit }, phone) {
    return AuthService.sendResetPasswordCode({ phone }).then(({ data }) => {
      commit('SET_RESET_PASSWORD_RESPONSE', data);
      return data;
    });
  },

  verifyOtpCode({ commit }, inputField) {
    return AuthService.verifyOtpCode(inputField).then(({ data }) => {
      commit('SET_CURRENT_OTP', data);
      return data;
    });
  },

  resetPassword({ commit }, inputField) {
    return AuthService.resetPassword(inputField).then(({ data }) => {
      commit('UPDATE_CURRENT_USER', data);
      return data;
    });
  },

  checkPassword({ commit }, passwordField) {
    return AuthService.checkPassword(passwordField).then(({ data }) => {
      commit('SET_UNLOCK_SCREEN', data.unlock);
      return data;
    });
  },
  logout({ commit }) {
    return removeStorage().finally(commit('SET_CURRENT_USER', null));
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
    }, 3000);
  },
  UPDATE_CURRENT_USER(state, user) {
    user = {
      ...JSON.parse(state.currentUser),
      ...user,
    };
    state.currentUser = user ? JSON.stringify(user) : null;
  },
  SET_UNLOCK_SCREEN(state, unlock) {
    state.unlock = unlock;
  },
  SET_RESET_PASSWORD_RESPONSE(state, passwordResponse) {
    state.resetPasswordResponse = passwordResponse
      ? JSON.stringify(passwordResponse)
      : null;
  },
  SET_CURRENT_OTP(state, { token }) {
    state.resetPasswordToken = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
