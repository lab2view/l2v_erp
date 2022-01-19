import { productConfigRoutes } from './productConfigRoutes';
import FormLayout from '/@/components/products/FormLayout.vue';
import { productFormRoutes } from './productFormRoutes';
import store from '../store';

const productRoutes = [
  {
    path: '',
    name: 'products',
    component: () => import('/@/views/products/ProductList.vue'),
    meta: {
      code: 'Product.viewAny',
    },
  },
  {
    path: ':id?/forms',
    component: FormLayout,
    children: productFormRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('product/getProduct', to.params.id)
          .then(() => {
            return { name: to.name };
          })
          .catch(() => -1);
      }
    },
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
