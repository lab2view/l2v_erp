import store from '../../store';

export const saleRoutes = [
  {
    path: '',
    name: 'customers',
    component: () => import('/@/views/customers/CustomersList.vue'),
    meta: {
      code: 'Customer.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'customer-types',
    name: 'customer.config.types',
    component: () => import('/@/views/customers/CustomerTypesList.vue'),
    meta: {
      code: 'CustomerType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'customer.config.types.form',
        component: () => import('/@/views/customers/CustomerTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('customerType/getCustomerType', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
