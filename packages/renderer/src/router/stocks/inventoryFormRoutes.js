export default [
  {
    path: 'description',
    name: 'inventory.form.desc',
    component: () =>
      import('/@/views/stocks/inventories/forms/InventoryDescription.vue'),
    meta: {
      code: 'Inventory.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'articles',
    name: 'inventory.form.article',
    component: () =>
      import('/@/views/stocks/inventories/forms/InventoryLineList.vue'),
    meta: {
      code: 'Inventory.form.line',
      icon: 'fa fa-list',
      requireInventory: true,
    },
    children: [
      {
        path: 'form',
        name: 'inventory.form.article.form',
        component: () =>
          import('/@/views/stocks/inventories/forms/InventoryLinesForm.vue'),
      },
      {
        path: 'csv',
        name: 'inventory.form.article.csv',
        component: () =>
          import('/@/views/stocks/inventories/forms/InventoryLinesCsv.vue'),
      },
    ],
  },
];
