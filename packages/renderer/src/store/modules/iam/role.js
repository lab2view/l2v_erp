import roleService from '../../../services/iam/IamRoleService';
import actionService from '../../../services/iam/IamActionService';

const state = {
  roles: null,
  hash: null,
  actions: null,
};

// getters
const getters = {
  actions: (state) => (state.actions ? JSON.parse(state.actions) : []),
  getActionById: (state, getters) => (id) =>
    getters.actions.find((a) => a.id === id),
  searchActionsByCriteria:
    (state, getters) =>
    // ({ module_id, action_id, keyword }) =>
    ({ module_id, keyword }) =>
      getters.actions.filter((c) => {
        let result = true;
        if (module_id) result = c.module_id.toString() === module_id.toString();
        // if (action_id)
        //   result = c.action_id.toString() === action_id.toString();
        if (keyword && result)
          result = RegExp(`${keyword.toString().toLowerCase()}*`).test(
            `${c.label.toString().toLowerCase()} ${c.code
              .toString()
              .toLowerCase()}`
          );
        return result;
      }),
  roles: (state) => (state.roles ? JSON.parse(state.roles) : []),
  role: (state) => (state.role ? JSON.parse(state.role) : null),
  getRoleById: (state, getters) => (id) =>
    getters.roles.find((a) => a.id === id),
  haveRole: (state) => !!state.role,
  getIamHash: (state) => state.hash ?? null,
};

const actions = {
  getRolesList({ commit, getters }, { page, field }) {
    if (getters.roles.length > 0 && !field.next) {
      return getters.roles;
    } else
      return roleService.getRolesList(page, field).then(({ data }) => {
        commit('SET_ROLES', data);
        return data;
      });
  },

  getActionsList({ commit, getters }, { page, field }) {
    if (getters.actions.length > 0) {
      return getters.actions;
    } else
      return actionService.getActionsList(page, field).then(({ data }) => {
        commit('SET_ACTIONS', data);
        return data;
      });
  },

  getRole({ getters, commit }, id) {
    const role = getters.roles.find((p) => p.id.toString() === id);
    if (role !== undefined) {
      commit('SET_CURRENT_ROLE', role);
      return role;
    } else
      return roleService.getRole(id).then(({ data }) => {
        commit('SET_CURRENT_ROLE', data);
        return data;
      });
  },

  addRole({ commit }, roleField) {
    return roleService.addRole(roleField).then(({ data }) => {
      commit('ADD_ROLE', data);
      return data;
    });
  },

  updateRole({ commit }, roleField) {
    return roleService.updateRole(roleField, roleField.id).then(({ data }) => {
      commit('UPDATE_ROLE', data);
      return data;
    });
  },

  deleteRole({ commit }, roleId) {
    return roleService.deleteRole(roleId).then(({ data }) => {
      commit('DELETE_ROLE', roleId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_IAM_HASH(state, hash) {
    state.hash = hash;
  },
  SET_ROLES(state, roles) {
    state.roles = JSON.stringify(roles);
  },
  SET_ACTIONS(state, actions) {
    state.actions = JSON.stringify(actions);
  },
  SET_CURRENT_ROLE(state, role) {
    state.role = role === null ? null : JSON.stringify(role);
  },
  ADD_ROLE(state, role) {
    let roles = JSON.parse(state.roles);
    roles.push(role);
    state.roles = JSON.stringify(roles);
  },
  UPDATE_ROLE(state, role) {
    let roles = JSON.parse(state.roles);
    const index = roles.findIndex((p) => p.id === role.id);
    if (index !== -1) {
      roles.splice(index, 1, role);
    }
    state.role = JSON.stringify(role);
    state.roles = JSON.stringify(roles);
  },
  DELETE_ROLE(state, roleId) {
    state.roles = JSON.stringify(
      JSON.parse(state.roles).filter((role) => role.id !== roleId)
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
