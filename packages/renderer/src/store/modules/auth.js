import AuthService from '../../services/AuthService';

const state = {
  currentUser: null,
  unlock: true,
};

// getters
const getters = {
  currentUser: (state) => {
    return JSON.parse(state.currentUser);
  },
  token: (state, getters) => {
    return getters.currentUser?.token;
  },
  currentUserEmail: (state, getters) => getters.currentUser?.user?.email,
  currentUserRole: (state, getters) => getters.currentUser?.user?.role?.label,
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
    commit('SET_CURRENT_USER', null);
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
