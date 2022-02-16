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
    name: 'types.customer',
    component: () => import('/@/views/customers/CustomerTypesList.vue'),
    meta: {
      code: 'CustomerType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'types.customer.form',
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
    name: 'groups.customer',
    component: () => import('/@/views/customers/CustomerGroupsList.vue'),
    meta: {
      code: 'CustomerGroup.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'groups.customer.form',
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
