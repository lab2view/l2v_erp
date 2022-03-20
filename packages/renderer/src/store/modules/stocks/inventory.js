import inventoryService from '../../../services/stocks/InventoryService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  inventories: null,
  hash: null,
  inventory: null,
};

// getters
const getters = {
  inventories: (state) => {
    return state.inventories ? JSON.parse(state.inventories) : [];
  },
  inventory: (state) => (state.inventory ? JSON.parse(state.inventory) : null),
};

const actions = {
  getInventoriesList({ commit, getters }, { page, field }) {
    if (getters.inventories.length > 0) {
      return getters.inventories;
    }
    return inventoryService.getInventoriesList(page, field).then(({ data }) => {
      commit('SET_INVENTORIES', data);
      return data;
    });
  },

  getInventory({ getters, commit }, id) {
    const inventory = getters.inventories.find((p) => p.id.toString() === id);
    if (inventory !== undefined) {
      commit('SET_CURRENT_INVENTORY', inventory);
      return inventory;
    }

    return inventoryService.getInventory(id).then(({ data }) => {
      commit('SET_CURRENT_INVENTORY', data);
      return data;
    });
  },

  addInventory({ commit }, inventoryField) {
    return inventoryService.addInventory(inventoryField).then(({ data }) => {
      commit('ADD_INVENTORY', data);
      notify(
        i18n.global.t('stocks.inventory.store'),
        'Ok',
        'theme',
        'fa fa-check'
      );
      return data;
    });
  },

  updateInventory({ commit }, inventoryField) {
    return inventoryService
      .updateInventory(inventoryField, inventoryField.id)
      .then(({ data }) => {
        commit('UPDATE_INVENTORY', data);
        notify(
          i18n.global.t('stocks.inventory.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  deleteInventory({ commit }, inventoryId) {
    return inventoryService.deleteInventory(inventoryId).then(({ data }) => {
      commit('DELETE_INVENTORY', inventoryId);
      return data;
    });
  },
};

// mutations
const mutations = {
  SET_INVENTORIES(state, inventories) {
    state.inventories = JSON.stringify(inventories);
  },
  SET_CURRENT_INVENTORY(state, inventory) {
    state.inventory = JSON.stringify(inventory);
  },
  ADD_INVENTORY(state, inventory) {
    let inventories = null;
    if (state.inventories) {
      inventories = JSON.parse(state.inventories);
      inventories.push(inventory);
    } else {
      inventories = [inventory];
    }
    state.inventories = JSON.stringify(inventories);
  },
  UPDATE_INVENTORY(state, inventory) {
    let inventories = JSON.parse(state.inventories);
    const index = inventories.findIndex((p) => p.id === inventory.id);
    if (index !== -1) {
      inventories.splice(index, 1, inventory);
    }
    state.inventories = JSON.stringify(inventories);
  },
  DELETE_INVENTORY(state, inventoryId) {
    state.inventories = JSON.stringify(
      JSON.parse(state.inventories).filter((p) => p.id !== inventoryId)
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
