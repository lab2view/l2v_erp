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
    children: [
      {
        path: 'add-stock-types',
        name: 'stocks.entry.form.desc.stockType',
        component: () => import('/@/views/stocks/StockTypeForm.vue'),
      },
    ],
  },
  {
    path: 'articles',
    name: 'stocks.entry.form.article',
    component: () => import('/@/views/stocks/entries/forms/EntryLineList.vue'),
    meta: {
      code: 'StockEntry.form.line',
      icon: 'fa fa-list',
    },
    children: [
      {
        path: 'form',
        name: 'stocks.entry.form.article.form',
        component: () =>
          import('/@/views/stocks/entries/forms/EntryLinesForm.vue'),
      },
      {
        path: 'csv',
        name: 'stocks.entry.form.article.csv',
        component: () =>
          import('/@/views/stocks/entries/forms/EntryLinesCsv.vue'),
      },
    ],
  },
];
