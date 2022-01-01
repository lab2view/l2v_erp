import { productConfigRoutes } from './productConfigRoutes';
import FormLayout from '/@/components/products/FormLayout.vue';

const productRoutes = [
  {
    path: '',
    name: 'products',
    component: () => import('/@/views/products/ProductList.vue'),
  },
  {
    path: ':id?/forms',
    component: FormLayout,
    children: [
      {
        path: '',
        name: 'product.form',
        component: () =>
          import('/@/views/products/forms/ProductDescription.vue'),
      },
      {
        path: 'properties',
        name: 'product.form.property',
        component: () => import('/@/views/products/forms/ProductProperty.vue'),
        meta: {
          requireProduct: true,
        },
      },
      {
        path: 'taxes',
        name: 'product.form.tax',
        component: () => import('/@/views/products/forms/ProductTax.vue'),
        meta: {
          requireProduct: true,
        },
      },
    ],
  },
  {
    path: ':id/details',
    component: () => import('/@/components/products/DetailLayout.vue'),
    meta: {
      requireProduct: true,
    },
    children: [
      {
        path: '',
        name: 'product.detail',
        component: () => import('/@/views/products/details/Details.vue'),
      },
      {
        path: 'properties',
        name: 'product.detail.property',
        component: () => import('/@/views/products/details/Properties.vue'),
      },
      {
        path: 'taxes',
        name: 'product.detail.tax',
        component: () => import('/@/views/products/details/Taxes.vue'),
      },
    ],
  },
  {
    path: 'configurations',
    component: () => import('/@/components/products/ConfigurationLayout.vue'),
    children: productConfigRoutes,
  },
];
export default productRoutes;
