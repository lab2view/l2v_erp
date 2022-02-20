import store from '../../store';

export const stockRoutes = [
  {
    path: '',
    name: 'inventories',
    component: () => import('/@/views/stocks/InventoriesList.vue'),
    meta: {
      code: 'Inventory.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'inventory.form',
        component: () => import('/@/views/stocks/InventoryForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('inventory/getInventory', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
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
              .dispatch('provider/getProvider', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'provisions',
    name: 'stocks.provisions',
    component: () => import('/@/views/stocks/ProvisionsList.vue'),
    meta: {
      code: 'Provision.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'stocks.provision.form',
        component: () => import('/@/views/stocks/ProvisionForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('provision/getProvision', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'shippings',
    name: 'shippings',
    component: () => import('/@/views/stocks/ShippingsList.vue'),
    meta: {
      code: 'Shipping.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'shipping.form',
        component: () => import('/@/views/stocks/ShippingForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('shipping/getShipping', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'exits',
    name: 'stocks.exits',
    component: () => import('/@/views/stocks/StockTypesList.vue'),
    meta: {
      code: 'StockType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'stocks.exit.form',
        component: () => import('/@/views/stocks/StockTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('stock_type/getStockType', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
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
                return { name: to.name };
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
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
