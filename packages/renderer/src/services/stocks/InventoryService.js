import axios from '/@/config/axios';

export default {
  getInventoriesList(page, field) {
    return axios.post(`/stocks/inventories/list?page=${page}`, field);
  },

  addInventory(inventory) {
    return axios.post(`/stocks/inventories`, inventory);
  },

  getInventory(id) {
    return axios.get(`/stocks/inventories/${id}`);
  },

  updateInventory(inventory, id) {
    return axios.put(`/stocks/inventories/${id}`, inventory);
  },

  deleteInventory(id) {
    return axios.delete(`/stocks/inventories/${id}`);
  },

  restoreInventory(id) {
    return axios.post(`/stocks/inventories/restore/${id}`);
  },

  forceDeleteInventory(id) {
    return axios.delete(`/stocks/inventories/delete/${id}`);
  },
};
