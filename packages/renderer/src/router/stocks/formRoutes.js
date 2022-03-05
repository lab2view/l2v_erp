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
    name: 'stocks.entry.form.article',
    component: () => import('/@/views/stocks/entries/forms/EntryLineList.vue'),
    meta: {
      code: 'StockEntry.form.line',
      icon: 'fa fa-list',
      requireStockEntry: true,
    },
    children: [
      {
        path: 'form',
        name: 'stocks.entry.form.article.form',
        component: () =>
          import('/@/views/stocks/entries/forms/EntryLinesForm.vue'),
      },
    ],
  },
];
