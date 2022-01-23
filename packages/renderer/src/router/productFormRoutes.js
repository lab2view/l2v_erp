export const productFormRoutes = [
  {
    path: '',
    name: 'product.form',
    component: () => import('/@/views/products/forms/ProductDescription.vue'),
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
    component: () => import('/@/views/products/forms/ProductStock.vue'),
    meta: {
      code: 'Product.form.stock',
      icon: 'fa fa-history',
      requireProduct: true,
    },
  },
];
