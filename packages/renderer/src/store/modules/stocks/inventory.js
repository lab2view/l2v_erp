import inventoryService from '../../../services/stocks/InventoryService';
import { notify } from '/@/helpers/notify';
import i18n from '/@/i18n';
import { privilegeCode } from '/@/helpers/codes';

const state = {
  inventories: [],
  hash: null,
  inventory: null,
  request_field: {
    created_at: null,
    keyword: null,
  },
};

// getters
const getters = {
  inventories: (state) => state.inventories,
  inventory: (state) => state.inventory,
  haveInventory: (state, getters) => !!getters.inventory,
  inventoryLines: (state, getters) => getters.inventory?.inventory_lines ?? [],
  inventoryReference: (state, getters) => getters.inventory?.reference,
  inventoryIsConfirm: (state, getters) => getters.inventory?.validate ?? false,
  requestField: (state) => state.request_field,
};

const actions = {
  getInventoriesList(
    { commit, getters, dispatch, rootGetters },
    { page, field }
  ) {
    if (
      !rootGetters['auth/canShowMenuItem'](
        privilegeCode.stock.inventory.viewAny
      )
    )
      return; //todo update all module to use this specific control

    if (getters.inventories.length > 0 && !field.next) {
      return getters.inventories;
    }
    return inventoryService
      .getInventoriesList(page, { ...field, paginate: 20 })
      .then(({ data }) => {
        commit('SET_INVENTORIES', data);
        dispatch(
          'setGlobalProgress',
          {
            label: 'Inventory',
            min: 0,
            max: data.last_page,
            value: data.current_page,
          },
          { root: true }
        );

        if (data.next_page_url) {
          return dispatch('getInventoriesList', {
            page: page + 1,
            field: { ...field, next: true },
          });
        } else dispatch('setGlobalProgress', null, { root: true });

        return data;
      })
      .catch((error) => {
        commit('SET_INVENTORIES', []);
        return Promise.reject(error);
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
        commit('SET_CURRENT_INVENTORY', data);
        return data;
      });
  },
};

// mutations
const mutations = {
  SET_INVENTORIES(state, { current_page, data }) {
    state.inventories =
      current_page === 1 ? data : [...state.inventories, ...data];
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

  SET_REQUEST_FIELD_VALUE(state, { field, value }) {
    state.request_field[field] = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
