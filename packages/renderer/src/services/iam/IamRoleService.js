import axios from '/@/config/axios';

export default {
  getRolesList(page, field) {
    return axios.post(`/roles/list?page=${page}`, field);
  },

  addRole(role) {
    return axios.post(`/roles`, role);
  },

  getRole(id) {
    return axios.get(`/roles/${id}`);
  },

  updateRole(role, id) {
    return axios.put(`/roles/${id}`, role);
  },

  deleteRole(id) {
    return axios.delete(`/roles/${id}`);
  },

  restoreRole(id) {
    return axios.post(`/roles/restore/${id}`);
  },

  forceDeleteRole(id) {
    return axios.delete(`/roles/delete/${id}`);
  },

  addRolePrivileges(privileges, role_id) {
    return axios.post(`/roles/${role_id}/privileges/add`, privileges);
  },

  removeRolePrivileges(privilegesIds, role_id) {
    return axios.post(`/roles/${role_id}/privileges/remove`, privilegesIds);
  },
};
