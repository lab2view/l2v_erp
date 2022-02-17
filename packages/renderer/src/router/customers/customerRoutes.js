import store from '../../store';
import { formRoutes } from './formRoutes';

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
  {
    path: 'customer-groups',
    name: 'customer.config.groups',
    component: () => import('/@/views/customers/CustomerGroupsList.vue'),
    meta: {
      code: 'CustomerGroup.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'customer.config.groups.form',
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
    name: 'customer.config.groups.lines',
    component: () => import('/@/views/customers/CustomerGroupLinesList.vue'),
    meta: {
      code: 'CustomerGroupLine.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'customer.config.groups.lines.form',
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
  {
    path: ':id?/forms',
    component: () => import('/@/components/customers/CustomerFormLayout.vue'),
    children: formRoutes,
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
];
