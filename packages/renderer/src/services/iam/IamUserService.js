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
