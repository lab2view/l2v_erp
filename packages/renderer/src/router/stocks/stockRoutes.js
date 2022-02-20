export const stockRoutes = [
  /*
    {
      path: '',
      name: 'stock.entries',
      component: () => import('/@/views/stocks/StockEntriesList.vue'),
      meta: {
        code: 'StockEntry.viewAny',
        feather: 'filter',
      },
      children: [
        {
          path: 'form/:id?',
          name: 'stock.entries.form',
          component: () => import('/@/views/stocks/StockEntryForm.vue'),
          beforeEnter: (to) => {
            if (to.params.id) {
              return store
                .dispatch('stockEntry/getStockEntry', to.params.id)
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
          name: 'inventories.form',
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
      path: 'inventory-lines',
      name: 'inventory.lines',
      component: () => import('/@/views/stocks/InventoryLinesList.vue'),
      meta: {
        code: 'InventoryLine.viewAny',
        feather: 'filter',
      },
      children: [
        {
          path: 'form/:id?',
          name: 'inventory.lines.form',
          component: () => import('/@/views/stocks/InventoryLineForm.vue'),
          beforeEnter: (to) => {
            if (to.params.id) {
              return store
                .dispatch('inventoryLine/getInventoryLine', to.params.id)
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
      path: '',
      name: 'providers',
      component: () => import('/@/views/stocks/ProvidersList.vue'),
      meta: {
        code: 'Provider.viewAny',
        feather: 'filter',
      },
      children: [
        {
          path: 'form/:id?',
          name: 'providers.form',
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
      path: '',
      name: 'provisions',
      component: () => import('/@/views/stocks/ProvisionsList.vue'),
      meta: {
        code: 'Provision.viewAny',
        feather: 'filter',
      },
      children: [
        {
          path: 'form/:id?',
          name: 'provisions.form',
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
      path: '',
      name: 'shippings',
      component: () => import('/@/views/stocks/ShippingsList.vue'),
      meta: {
        code: 'Shipping.viewAny',
        feather: 'filter',
      },
      children: [
        {
          path: 'form/:id?',
          name: 'shippings.form',
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
    */
];
