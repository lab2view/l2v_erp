export default [
  {
    path: 'description',
    name: 'stocks.exit.form.desc',
    component: () => import('/@/views/stocks/exits/forms/ExitDescription.vue'),
    meta: {
      code: 'StockExit.form.description',
      icon: 'fa fa-info',
    },
    children: [
      {
        path: 'add-stock-types',
        name: 'stocks.exit.form.desc.stockType',
        component: () => import('/@/views/stocks/StockTypeForm.vue'),
      },
    ],
  },
  {
    path: 'multiple',
    name: 'stocks.exit.form.multiple',
    component: () =>
      import('/@/views/stocks/exits/forms/ExitMultipleStructure.vue'),
    meta: {
      code: 'StockExit.form.multiple',
      icon: 'fa fa-hashtag',
      requireMultipleStockExit: true,
    },
    children: [
      {
        path: 'form',
        name: 'stocks.exit.form.multiple.form',
        component: () =>
          import('/@/views/stocks/exits/forms/ExitLinesForm.vue'),
      },
    ],
  },
  {
    path: 'articles',
    name: 'stocks.exit.form.article',
    component: () => import('/@/views/stocks/exits/forms/ExitLineList.vue'),
    meta: {
      code: 'StockExit.form.line',
      icon: 'fa fa-list',
      requireStockExit: true,
    },
    children: [
      {
        path: 'form',
        name: 'stocks.exit.form.article.form',
        component: () =>
          import('/@/views/stocks/exits/forms/ExitLinesForm.vue'),
      },
      {
        path: 'csv',
        name: 'stocks.exit.form.article.csv',
        component: () => import('/@/views/stocks/exits/forms/ExitLinesCsv.vue'),
      },
    ],
  },
];
