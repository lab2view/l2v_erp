import inventoryService from '../../../services/stocks/InventoryService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';

const state = {
  inventories: [],
  hash: null,
  inventory: null,
};

// getters
const getters = {
  inventories: (state) => state.inventories,
  inventory: (state) => state.inventory,
  haveInventory: (state, getters) => !!getters.inventory,
  inventoryLines: (state, getters) => getters.inventory?.inventory_lines ?? [],
  inventoryReference: (state, getters) => getters.inventory?.reference,
  inventoryIsConfirm: (state, getters) => getters.inventory?.validate ?? false,
};

const actions = {
  getInventoriesList({ commit, getters }, { page, field }) {
    if (getters.inventories.length > 0 && !field.next) {
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
      commit('SET_CURRENT_INVENTORY', data);
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
        commit('SET_CURRENT_INVENTORY', data);
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

  addInventoryLines({ commit, getters }, inventoryLines) {
    return inventoryService
      .addInventoryLines(getters.inventory.id, inventoryLines)
      .then(({ data }) => {
        commit('ADD_INVENTORY_LINES', data.inventory_lines);
        return data;
      });
  },
  updateInventoryLine({ commit }, inventoryLine) {
    return inventoryService
      .updateInventoryLine(inventoryLine)
      .then(({ data }) => {
        commit('UPDATE_INVENTORY_LINE', data);
        notify(
          i18n.global.t('stocks.inventoryLine.update'),
          'Ok',
          'theme',
          'fa fa-check'
        );
        return data;
      });
  },

  removeInventoryLines({ getters, commit }, inventoryLineIds) {
    return inventoryService
      .removeInventoryLines(getters.inventory.id, {
        inventory_line_ids: [...inventoryLineIds],
      })
      .then(() => {
        commit('REMOVE_INVENTORY_LINES', inventoryLineIds);
        return true;
      });
  },

  processToInventoryStockBalancing({ commit }, inventory) {
    return inventoryService
      .processToInventoryStockBalancing(inventory.id)
      .then(({ data }) => {
        console.log(data);
        commit('SET_CURRENT_INVENTORY', data);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_INVENTORIES(state, inventories) {
    state.inventories = inventories;
  },
  SET_CURRENT_INVENTORY(state, inventory) {
    state.inventory = inventory;
  },
  ADD_INVENTORY(state, inventory) {
    if (state.inventories.find((i) => i.id === inventory.id) === undefined)
      state.inventories.push(inventory);
  },
  UPDATE_INVENTORY(state, inventory) {
    const index = state.inventories.findIndex((p) => p.id === inventory.id);
    if (index !== -1) {
      state.inventories.splice(index, 1, inventory);
    }
  },
  DELETE_INVENTORY(state, inventoryId) {
    state.inventories = state.inventories.filter((p) => p.id !== inventoryId);
  },

  ADD_INVENTORY_LINES(state, inventory_lines) {
    let index = state.inventories.findIndex((i) => i.id === state.inventory.id);
    if (index !== -1) {
      state.inventory.inventory_lines = [
        ...state.inventory.inventory_lines,
        ...inventory_lines,
      ];
      state.inventories.splice(index, 1, state.inventory);
    }
  },
  UPDATE_INVENTORY_LINE(state, inventoryLine) {
    let index = state.inventories.findIndex((i) => i.id === state.inventory.id);
    if (index !== -1) {
      let invLineIndex = state.inventory.inventory_lines.findIndex(
        (p) => p.id === inventoryLine.id
      );
      if (invLineIndex !== -1) {
        state.inventory.inventory_lines.splice(invLineIndex, 1, inventoryLine);
        state.inventories.splice(index, 1, state.inventory);
      }
    }
  },
  REMOVE_INVENTORY_LINES(state, inventory_lines_ids) {
    let index = state.inventories.findIndex((i) => i.id === state.inventory.id);
    if (index !== -1) {
      state.inventory.inventory_lines = state.inventory.inventory_lines.filter(
        (il) => {
          return inventory_lines_ids.find((id) => id === il.id) === undefined;
        }
      );
      state.inventories.splice(index, 1, state.inventory);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
