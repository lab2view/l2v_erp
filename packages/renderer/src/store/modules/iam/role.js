import roleService from '../../../services/iam/IamRoleService';
import actionService from '../../../services/iam/IamActionService';

const state = {
  roles: null,
  role: null,
  actions: null,
  action: null,
};

// getters
const getters = {
  actions: (state) => (state.actions ? JSON.parse(state.actions) : []),
  getActionById: (state, getters) => (id) =>
    getters.actions.find((a) => a.id === id),
  searchActionsByCriteria:
    (state, getters) =>
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
  action: (state) => (state.action ? JSON.parse(state.action) : null),
  currentPrivileges: (state, getters) => {
    return getters.role?.privileges.length ? getters.role.privileges : [];
  },
  getPrivilegesByFilter: (state, getters) => (filter) => {
    return getters.currentPrivileges.filter((privilege) => {
      let select = true;
      if (filter.module_id)
        select = privilege.action?.module_id === filter.module_id;
      if (filter.action_id)
        select = privilege.action?.action_id === filter.action_id;
      return select;
    });
  },
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

  getAction({ getters, commit }, id) {
    const privilege = getters.currentPrivileges.find(
      (p) => p.action.id.toString() === id
    );
    if (privilege !== undefined) {
      commit('SET_CURRENT_ACTION', privilege.action);
      return privilege.action;
    }
    const action = getters.actions.find((p) => p.id.toString() === id);
    if (action !== undefined) {
      commit('SET_CURRENT_ACTION', action);
      return action;
    }
    return actionService.getAction(id).then(({ data }) => {
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

  addRolePrivileges({ getters, commit }, privileges) {
    return roleService
      .addRolePrivileges(privileges, getters.user.id)
      .then(({ data }) => {
        commit('SET_ROLE_PRIVILEGES', data.privileges);
      });
  },

  removeRolePrivileges({ getters, commit }, privileges) {
    return roleService
      .removeRolePrivileges(
        {
          privileges_ids: [...privileges],
        },
        getters.role.id
      )
      .then(() => {
        commit('REMOVE_ROLE_PRIVILEGES', privileges);
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
  SET_CURRENT_ACTION(state, action) {
    state.action = action === null ? null : JSON.stringify(action);
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

  SET_ROLE_PRIVILEGES(state, { role, privileges }) {
    let roles = JSON.parse(state.roles);
    const index = roles.findIndex((p) => p.id === role.id);
    if (index !== -1) {
      roles.splice(index, 1, { ...role, privileges });
    }
    state.role = JSON.stringify(role);
    state.roles = JSON.stringify(roles);
  },

  REMOVE_ROLE_PRIVILEGES(state, privilegeIds) {
    let roles = JSON.parse(state.roles);
    let role = JSON.parse(state.role);
    const index = roles.findIndex((p) => p.id === role.id);
    if (index !== -1) {
      role.privileges = role.privileges.filter(
        (p) => privilegeIds.find((pi) => pi === p.id) === undefined
      );
      roles.splice(index, 1, role);
    }
    state.role = JSON.stringify(role);
    state.roles = JSON.stringify(roles);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
