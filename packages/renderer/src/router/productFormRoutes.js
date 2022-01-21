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
    component: () => import('/@/views/products/forms/ProductArticleForm.vue'),
    meta: {
      code: 'Product.form.article',
      icon: 'fa fa-shopping-cart',
      requireProduct: true,
    },
  },
  {
    path: 'stocks',
    name: 'product.form.stock',
    component: () => import('/@/views/products/forms/ProductStock.vue'),
    meta: {
      code: 'Article.create',
      icon: 'fa fa-history',
      requireProduct: true,
    },
  },
];
