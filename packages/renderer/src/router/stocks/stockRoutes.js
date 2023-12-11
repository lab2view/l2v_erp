import store from '../../store';
import exitFormRoutes from '/@/router/stocks/exitFormRoutes.js';
import entryFormRoutes from '/@/router/stocks/entryFormRoutes.js';
import shippingFormRoutes from '/@/router/stocks/shippingFormRoutes';
import inventoryFormRoutes from '/@/router/stocks/inventoryFormRoutes';

export const stockRoutes = [
  {
    path: 'inventories',
    name: 'inventories',
    component: () => import('/@/views/stocks/inventories/InventoriesList.vue'),
    meta: {
      code: 'Inventory.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'inventories/:id?/forms',
    component: () =>
      import('/@/components/stocks/inventories/InventoryFormLayout.vue'),
    children: inventoryFormRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('inventory/getInventory', to.params.id)
          .then(() => 1)
          .catch(() => -1);
      }
    },
  },
  {
    path: 'providers',
    name: 'providers',
    component: () => import('/@/views/stocks/ProvidersList.vue'),
    meta: {
      code: 'Provider.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'provider.form',
        component: () => import('/@/views/stocks/ProviderForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('provider/getStockProvider', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'entries',
    name: 'stocks.entries',
    component: () => import('/@/views/stocks/entries/StockEntriesList.vue'),
    meta: {
      code: 'StockEntry.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'entries/:id?/forms',
    component: () => import('/@/components/stocks/EntryFormLayout.vue'),
    children: entryFormRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('stock_entry/getStockEntry', to.params.id)
          .then(() => {
            return 1;
          })
          .catch(() => -1);
      }
    },
  },
  {
    path: 'exits',
    name: 'stocks.exits',
    component: () => import('/@/views/stocks/exits/StockExitsList.vue'),
    meta: {
      code: 'StockExit.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'crossings',
    name: 'stocks.crossings',
    component: () => import('/@/views/stocks/crossings/StockCrossings.vue'),
    meta: {
      code: 'StockCrossing.make',
      feather: 'eye',
    },
  },
  {
    path: 'exits/:id?/forms',
    component: () => import('/@/components/stocks/ExitFormLayout.vue'),
    children: exitFormRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('stock_exit/getStockExit', to.params.id)
          .then(() => {
            return 1;
          })
          .catch(() => -1);
      }
    },
  },
  {
    path: 'shippings',
    name: 'shippings',
    component: () => import('/@/views/stocks/shipping/ShippingsList.vue'),
    meta: {
      code: 'Shipping.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'shippings/:id?/forms',
    component: () => import('/@/components/stocks/ShippingFormLayout.vue'),
    children: shippingFormRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('shipping/getShipping', to.params.id)
          .then(() => 1)
          .catch(() => -1);
      }
    },
  },
  {
    path: 'types',
    name: 'config.stocks.types',
    component: () => import('/@/views/stocks/StockTypesList.vue'),
    meta: {
      code: 'StockType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.stocks.type.form',
        component: () => import('/@/views/stocks/StockTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('stock_type/getStockType', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'states',
    name: 'config.stocks.states',
    component: () => import('/@/views/stocks/StockStatesList.vue'),
    meta: {
      code: 'StockState.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.stocks.state.form',
        component: () => import('/@/views/stocks/StockStateForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('stock_state/getStockState', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
