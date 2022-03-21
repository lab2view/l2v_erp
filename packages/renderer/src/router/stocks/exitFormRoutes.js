import store from '/@/store/index.js';

export default [
  {
    path: 'description',
    name: 'stocks.exit.form.desc',
    component: () => import('/@/views/stocks/exits/forms/ExitDescription.vue'),
    meta: {
      code: 'StockExit.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'articles',
    name: 'stocks.exit.form.article',
    component: () => import('/@/views/stocks/exits/forms/ExitLineList.vue'),
    meta: {
      code: 'StockExit.form.line',
      icon: 'fa fa-list',
    },
    beforeEnter: (to) => {
      return store
        .dispatch('stock_exit/getStockExit', to.params.id)
        .then(() => {
          return 1;
        })
        .catch(() => -1);
    },
    children: [
      {
        path: 'form',
        name: 'stocks.exit.form.article.form',
        component: () =>
          import('/@/views/stocks/exits/forms/ExitLinesForm.vue'),
      },
    ],
  },
];
