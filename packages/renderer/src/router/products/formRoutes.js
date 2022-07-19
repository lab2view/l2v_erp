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
        path: 'gallery',
        name: 'product.form.setting.gallery',
        component: () => import('/@/views/products/forms/ProductGallery.vue'),
      },
      {
        path: 'taxes',
        name: 'product.form.setting.tax',
        component: () => import('/@/views/products/forms/ProductTaxList.vue'),
        children: [
          {
            path: ':product_tax_id?/form',
            name: 'product.form.setting.tax.form',
            component: () =>
              import('/@/views/products/forms/ProductTaxForm.vue'),
            children: [
              {
                path: 'add-tax',
                name: 'product.form.setting.tax.form.tax',
                component: () =>
                  import('/@/views/products/configurations/tax/TaxForm.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'description',
        name: 'product.form.setting.desc',
        component: () =>
          import('/@/views/products/forms/ProductDescription.vue'),
      },
      {
        path: 'properties',
        name: 'product.form.setting.property',
        component: () =>
          import('/@/views/products/forms/ProductProperties.vue'),
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
      code: 'Stocks.manage',
      icon: 'fa fa-history',
      requireProduct: true,
    },
    children: [
      {
        path: '',
        redirect: (to) => {
          return {
            name: 'product.form.stocks.entry',
            params: to.params,
            query: to.query,
          };
        },
      },
      {
        path: 'entries',
        name: 'product.form.stocks.entry',
        props: () => ({useCurrentProduct: true}),
        component: () =>
          import('/@/views/products/forms/ProductStockEntries.vue'),
      },
      {
        path: 'supply',
        name: 'product.form.stocks.entry.supply',
        component: () =>
          import('/@/views/products/forms/Supply.vue'),
      },
      {
        path: 'exits',
        name: 'product.form.stocks.exit',
        props: () => ({useCurrentProduct: true}),
        component: () =>
          import('/@/views/products/forms/ProductStockExits.vue'),
      },
    ],
  },
];
