import store from '../../store';

export const customerRoutes = [
  {
    path: '',
    name: 'customers',
    component: () => import('/@/views/customers/CustomersList.vue'),
    meta: {
      code: 'Customer.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: ':id?/forms',
        name: 'customer.form',
        component: () => import('/@/views/customers/CustomerForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('customer/getCustomer', to.params.id)
              .then((data) => {
                store.commit('customer/SET_CURRENT_CUSTOMER', data);
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'customer-types',
    name: 'config.customers.types',
    component: () => import('/@/views/customers/CustomerTypesList.vue'),
    meta: {
      code: 'CustomerType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.customers.types.form',
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
  {
    path: 'customer-groups',
    name: 'config.customers.groups',
    component: () => import('/@/views/customers/CustomerGroupsList.vue'),
    meta: {
      code: 'CustomerGroup.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.customers.groups.form',
        component: () => import('/@/views/customers/CustomerGroupForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('customerGroup/getCustomerGroup', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'customer-group-lines/:id',
    name: 'config.customers.groups.lines',
    component: () => import('/@/views/customers/CustomerGroupLinesList.vue'),
    meta: {
      code: 'CustomerGroupLine.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.customers.groups.lines.form',
        component: () => import('/@/views/customers/CustomerGroupLineForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('customerGroupLine/getCustomerGroupLine', to.params.id)
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
