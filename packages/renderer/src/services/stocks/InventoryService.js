import axios from '/@/config/axios';

export default {
  getInventoriesList(page, field) {
    return axios.post(`/inventories/list?page=${page}`, field);
  },

  addInventory(inventory) {
    return axios.post(`/inventories`, inventory);
  },

  getInventory(id) {
    return axios.get(`/inventories/${id}`);
  },

  updateInventory(inventory, id) {
    return axios.put(`/inventories/${id}`, inventory);
  },

  deleteInventory(id) {
    return axios.delete(`/inventories/${id}`);
  },

  restoreInventory(id) {
    return axios.post(`/inventories/restore/${id}`);
  },

  forceDeleteInventory(id) {
    return axios.delete(`/inventories/delete/${id}`);
  },

  addInventoryArticles(inventoryArticles) {
    return axios.post(`/inventories/articles`, inventoryArticles);
  },

  removeInventoryArticles(inventoryArticles) {
    return axios.post(`/inventories/articles/delete`, inventoryArticles);
  },

  updateInventoryArticle(id, inventoryArticle) {
    return axios.put(`/inventories/articles/${id}`, inventoryArticle);
  },
};
