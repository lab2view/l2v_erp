import userService from '../../../services/iam/IamUserService';

const state = {
  users: null,
  hash: null,
  user: null,
};

// getters
const getters = {
  users: (state) => (state.users ? JSON.parse(state.users) : []),
  user: (state) => (state.user ? JSON.parse(state.user) : null),
  getUserById: (state, getters) => (id) =>
    getters.users.find((a) => a.id === id),
  haveUser: (state) => !!state.user,
  getIamHash: (state) => state.hash ?? null,
};

const actions = {
  getUsersList({ commit, getters }, { page, field }) {
    if (getters.users.length > 0) {
      return getters.users;
    } else
      return userService.getUsersList(page, field).then(({ data }) => {
        commit('SET_USERS', data);
        return data;
      });
  },

  getUser({ getters, commit }, id) {
    const user = getters.users.find((p) => p.id.toString() === id);
    if (user !== undefined) {
      commit('SET_CURRENT_USER', user);
      return user;
    } else
      return userService.getUser(id).then(({ data }) => {
        commit('SET_CURRENT_USER', data);
        return data;
      });
  },

  addUser({ commit }, userField) {
    return userService.addUser(userField).then(({ data }) => {
      commit('ADD_USER', data);
      return data;
    });
  },

  updateUser({ commit }, userField) {
    return userService
      .updateUser(userField, userField.id)
      .then(({ data }) => {
        commit('UPDATE_USER', data);
        return data;
      });
  },

  deleteUser({ commit }, userId) {
    return userService.deleteUser(userId).then(({ data }) => {
      commit('DELETE_USER', userId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_IAM_HASH(state, hash) {
    state.hash = hash;
  },
  SET_USERS(state, users) {
    state.users = JSON.stringify(users);
  },
  SET_CURRENT_USER(state, user) {
    state.user = user === null ? null : JSON.stringify(user);
  },
  ADD_USER(state, user) {
    let users = JSON.parse(state.users);
    users.push(user);
    state.users = JSON.stringify(users);
  },
  UPDATE_USER(state, user) {
    let users = JSON.parse(state.users);
    const index = users.findIndex((p) => p.id === user.id);
    if (index !== -1) {
      users.splice(index, 1, user);
    }
    state.user = JSON.stringify(user);
    state.users = JSON.stringify(users);
  },
  DELETE_USER(state, userId) {
    state.users = JSON.stringify(
      JSON.parse(state.users).filter(
        (user) => user.id !== userId
      )
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
