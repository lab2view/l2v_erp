import axios from '/@/config/axios';

export default {
  getUsersList(page, field) {
    return axios.post(`/users/list?page=${page}`, field);
  },

  addUser(user) {
    return axios.post(`/users`, user);
  },

  addUserPrivileges({user, user_privileges}) {
    return axios.post(`/users/privileges`, {
      user_id: user.id,
      user_privileges: user_privileges
    });
  },

  removeUserPrivileges(user) {
    return axios.post(`/users`, user);
  },

  getUser(id) {
    return axios.get(`/users/${id}`);
  },

  updateUser(user, id) {
    return axios.put(`/users/${id}`, user);
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
};
