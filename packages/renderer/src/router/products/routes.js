import configRoutes from './configRoutes';
import formRoutes from './formRoutes';
import store from '../../store';

export default [
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
    component: () => import('/@/components/products/FormLayout.vue'),
    children: formRoutes,
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
    path: 'configurations',
    component: () => import('/@/components/products/ConfigurationLayout.vue'),
    children: configRoutes,
  },
];
