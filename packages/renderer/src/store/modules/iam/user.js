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
  getUserByEnterpriseId: (state, getters) => (id) =>
    getters.users.filter((u) => u.enterprise_id === id) ?? [],
  haveUser: (state) => !!state.user,
  getIamHash: (state) => state.hash ?? null,
  getUsersByFilter: (state, getters) => (filter) => {
    return getters.users.filter((user) => {
      let select = true;
      if (filter.enterprise_id)
        select = user.enterprise_id === filter.enterprise_id;
      if (select && filter.country_id)
        select = user.country_id === filter.country_id;
      if (select && filter.role_id) select = user.role_id === filter.role_id;
      return select;
    });
  },
};

const actions = {
  getUsersList({ commit, getters, dispatch }, { page, field }) {
    if (getters.users.length > 0 && !field.next) {
      return getters.users;
    } else
      return userService
        .getUsersList(page, { ...field, paginate: 10 })
        .then(({ data }) => {
          commit('SET_USERS', data);

          dispatch(
            'setGlobalProgress',
            {
              label: 'users',
              min: 0,
              max: data.last_page,
              value: data.current_page,
            },
            { root: true }
          );

          if (data.next_page_url) {
            return dispatch('getUsersList', {
              page: page + 1,
              field: { ...field, next: true },
            });
          } else dispatch('setGlobalProgress', null, { root: true });

          return data;
        })
        .catch((error) => {
          commit('SET_USERS', []);
          return Promise.reject(error);
        });
  },

  getUser({ getters, commit }, id) {
    const user = getters.users.find((p) => p.id.toString() === id.toString());
    if (user !== undefined) {
      commit('SET_CURRENT_USER', user);
      return user;
    } else
      return userService.getUser(id).then(({ data }) => {
        commit('SET_CURRENT_USER', data);
        return data;
      });
  },

  addUserPrivileges({ getters, commit }, actions) {
    return userService
      .addUserPrivileges(actions, getters.user.id)
      .then(({ data }) => {
        commit('ADD_USER_PRIVILEGES', data.actions);
      });
  },

  removeUserPrivileges({ getters, commit }, actions) {
    return userService
      .removeUserPrivileges(
        {
          actions_ids: [...actions],
        },
        getters.user.id
      )
      .then(() => {
        commit('REMOVE_USER_PRIVILEGES', actions);
      });
  },

  addUser({ commit }, userField) {
    return userService.addUser(userField).then(({ data }) => {
      commit('ADD_USER', data);
      commit('SET_CURRENT_USER', data);
      return data;
    });
  },

  updateUser({ commit }, userField) {
    return userService.updateUser(userField, userField.id).then(({ data }) => {
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

  setUserPassword({ commit }, userField) {
    return userService
      .setUserPassword(userField, userField.id)
      .then(({ data }) => {
        commit('UPDATE_USER', data);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_IAM_HASH(state, hash) {
    state.hash = hash;
  },
  SET_USERS(state, { current_page, data }) {
    if (current_page === 1) state.users = JSON.stringify(data);
    else {
      let oldItems = state.users ? JSON.parse(state.users) : [];
      state.users = JSON.stringify([...oldItems, ...data]);
    }
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
      JSON.parse(state.users).filter((user) => user.id !== userId)
    );
  },

  ADD_USER_PRIVILEGES(state, userPrivileges) {
    let users = JSON.parse(state.users);
    let user = JSON.parse(state.user);
    let index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      user.privileges = [...user.privileges, ...userPrivileges];
      users.splice(index, 1, user);
      state.user = JSON.stringify(user);
      state.users = JSON.stringify(users);
    }
  },
  REMOVE_USER_PRIVILEGES(state, actions) {
    let users = JSON.parse(state.users);
    let user = JSON.parse(state.user);
    let index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      user.privileges = user.privileges.filter((p) => {
        return actions.find((act) => act === p.id) === undefined;
      });
      users.splice(index, 1, user);
      state.user = JSON.stringify(user);
      state.users = JSON.stringify(users);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
