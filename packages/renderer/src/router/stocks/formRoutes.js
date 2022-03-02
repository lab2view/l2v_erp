export default [
  {
    path: 'description',
    name: 'stocks.entry.form.desc',
    component: () =>
      import('/@/views/stocks/entries/forms/EntryDescription.vue'),
    meta: {
      code: 'StockEntry.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'articles',
    name: 'stocks.entry.form.line',
    component: () => import('/@/views/stocks/entries/forms/EntryLineList.vue'),
    meta: {
      code: 'StockEntry.form.line',
      icon: 'fa fa-info',
      requireStockEntry: true,
    },
  },
  {
    path: 'provisions',
    name: 'stocks.entry.form.provision',
    component: () =>
      import('/@/views/stocks/entries/forms/EntryProvisionList.vue'),
    meta: {
      code: 'StockEntry.form.provision',
      icon: 'fa fa-cogs',
      requireStockEntry: true,
    },
  },
];
