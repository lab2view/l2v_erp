import axios from '/@/config/axios';

export default {
  getUsersList(page, field) {
    return axios.post(`/users/list?page=${page}`, field);
  },

  addUser(user) {
    return axios.post(`/users`, user);
  },

  getUser(id) {
    return axios.get(`/users/${id}`);
  },

  updateUser(user, id) {
    return axios.put(`/users/${id}`, user);
  },

  updateUserPassword(user, id) {
    return axios.post(`/users/change-password/${id}`, user);
  },

  deleteUser(id) {
    return axios.delete(`/users/${id}`);
  },

  restoreUser(id) {
    return axios.post(`/users/restore/${id}`);
  },

  forceDeleteUser(id) {
    return axios.delete(`/users/delete/${id}`);
  },

  addUserPrivileges(actions, user_id) {
    return axios.post(`/users/${user_id}/privileges/add`, actions);
  },

  removeUserPrivileges(userPrivilegesIds, user_id) {
    return axios.post(`/users/${user_id}/privileges/remove`, userPrivilegesIds);
  },
};
