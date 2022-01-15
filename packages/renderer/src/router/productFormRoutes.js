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
    path: 'properties',
    name: 'product.form.property',
    component: () => import('/@/views/products/forms/ProductProperty.vue'),
    meta: {
      code: 'Product.form.property',
      icon: 'fa fa-cogs',
      requireProduct: true,
    },
  },
  {
    path: 'taxes',
    name: 'product.form.tax',
    component: () => import('/@/views/products/forms/ProductTax.vue'),
    meta: {
      code: 'Product.form.tax',
      icon: 'fa fa-percent',
      requireProduct: true,
    },
  },
];
