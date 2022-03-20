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
  },
  {
    path: ':id?/forms',
    name: 'customer.form',
    component: () => import('/@/views/customers/CustomerForm.vue'),
    meta: {
      code: 'Customer.create',
      feather: 'filter',
    },
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
  {
    path: 'types',
    name: 'config.customers.types',
    component: () => import('/@/views/customers/CustomerTypesList.vue'),
    meta: {
      code: 'CustomerType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.customers.type.form',
        component: () => import('/@/views/customers/CustomerTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('customer_type/getCustomerType', to.params.id)
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
    path: 'groups',
    name: 'customers.groups',
    component: () => import('/@/views/customers/CustomerGroupsList.vue'),
    meta: {
      code: 'CustomerGroup.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'customers.group.form',
        component: () => import('/@/views/customers/CustomerGroupForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('customer_group/getCustomerGroup', to.params.id)
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
    path: 'groups/:id/details',
    name: 'customerGroup.details',
    component: () => import('/@/views/customers/CustomerGroupLinesList.vue'),
    meta: {
      code: 'CustomerGroupLine.viewAny',
      feather: 'filter',
    },
    beforeEnter: (to) => {
      return store
        .dispatch('customer_group/getCustomerGroup', to.params.id)
        .then(() => 1)
        .catch(() => -1);
    },
    children: [
      {
        path: 'form',
        name: 'customers.groups.line.form',
        component: () => import('/@/views/customers/CustomerGroupLineForm.vue'),
        meta: {
          requireCustomerGroup: true,
        },
      },
    ],
  },
];
