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

  addInventoryLines(inventoryId, inventoryLines) {
    return axios.post(`/inventories/${inventoryId}/lines/add`, inventoryLines);
  },
  updateInventoryLine(inventoryLine) {
    return axios.put(
      `/inventories/lines/${inventoryLine.id}/update`,
      inventoryLine
    );
  },
  removeInventoryLines(inventoryId, inventoryLineIds) {
    return axios.post(
      `/inventories/${inventoryId}/lines/remove`,
      inventoryLineIds
    );
  },
};
