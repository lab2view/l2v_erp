export default [
  {
    path: 'description',
    name: 'product.form.desc',
    component: () => import('/@/views/products/forms/ProductPresentation.vue'),
    meta: {
      code: 'Product.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'settings',
    name: 'product.form.setting',
    component: () => import('/@/views/products/forms/ProductSettings.vue'),
    meta: {
      code: 'Product.form.setting',
      icon: 'fa fa-cogs',
      requireProduct: true,
    },
    children: [
      {
        path: '',
        redirect: (to) => {
          return {
            name: 'product.form.setting.gallery',
            params: to.params,
            query: to.query,
          };
        },
      },
      {
        path: 'gallery',
        name: 'product.form.setting.gallery',
        component: () => import('/@/views/products/forms/ProductGallery.vue'),
      },
      {
        path: 'taxes',
        name: 'product.form.setting.tax',
        component: () => import('/@/views/products/forms/ProductTaxList.vue'),
      },
      {
        path: 'description',
        name: 'product.form.setting.desc',
        component: () =>
          import('/@/views/products/forms/ProductDescription.vue'),
      },
    ],
  },
  {
    path: 'articles',
    name: 'product.form.article',
    component: () => import('/@/views/products/forms/ProductArticleList.vue'),
    meta: {
      code: 'Product.form.article',
      icon: 'fa fa-shopping-cart',
      requireProduct: true,
    },
    children: [
      {
        path: 'form',
        name: 'product.form.article.form',
        component: () =>
          import('/@/views/products/forms/ProductArticleForm.vue'),
        children: [
          {
            path: 'add-package',
            name: 'product.form.article.form.package',
            component: () =>
              import(
                '/@/views/products/configurations/package/PackageForm.vue'
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'stocks',
    name: 'product.form.stock',
    component: () => import('/@/views/products/forms/ProductStockLayout.vue'),
    meta: {
      code: 'Stock.manage',
      icon: 'fa fa-history',
      requireProduct: true,
    },
    children: [
      {
        path: '',
        redirect: (to) => {
          return {
            name: 'product.form.stock.stats',
            params: to.params,
            query: to.query,
          };
        },
      },
      {
        path: 'entries',
        name: 'product.form.stock.entry',
        props: () => ({ useCurrentProduct: true }),
        component: () =>
          import('/@/views/stocks/entries/StockProvisionList.vue'),
      },
      {
        path: 'exits',
        name: 'product.form.stock.exit',
        props: () => ({ useCurrentProduct: true }),
        component: () => import('/@/views/stocks/exits/StockExitLineList.vue'),
      },
    ],
  },
];
