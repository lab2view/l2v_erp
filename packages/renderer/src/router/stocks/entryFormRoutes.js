import store from '/@/store/index.js';

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
    beforeEnter: (to) => {
      return store
        .dispatch('stock_entry/getStockEntry', to.params.id)
        .then(() => {
          return 1;
        })
        .catch(() => -1);
    },
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
    ],
  },
];
