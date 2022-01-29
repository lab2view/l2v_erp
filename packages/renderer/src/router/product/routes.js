import { configRoutes } from './configRoutes';
import FormLayout from '/@/components/products/FormLayout.vue';
import { formRoutes } from './formRoutes';
import store from '../../store';

const routes = [
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

export default routes;
