import store from '../../store';
import formRoutes from './formRoutes';

export const saleRoutes = [
  {
    path: '',
    name: 'sales.sales',
    component: () => import('/@/views/sales/SalesList.vue'),
    meta: {
      code: 'Sale.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'sessions',
    name: 'sales.session',
    component: () => import('/@/views/sales/session/CashierSessionPage.vue'),
    meta: {
      code: 'Sale.create',
      requireCashierSession: true,
    },
    children: [
      {
        path: 'customers/form',
        name: 'sales.session.customer.form',
        component: () => import('/@/views/customers/CustomerQuickForm.vue'),
      },
      {
        path: 'cashier-sales/:sale_id',
        name: 'sales.session.cashier.sale.detail',
        component: () => import('/@/views/sales/session/SaleDetails.vue'),
        beforeEnter: (to) => {
          return store
            .dispatch('sale/getCashierSale', parseInt(to.params.sale_id))
            .then(() => 1)
            .catch(() => -1);
        },
      },
      {
        path: 'pending-requests',
        name: 'sales.session.request',
        component: () =>
          import('/@/views/sales/session/SalePendingRequest.vue'),
      },
      {
        path: 'current-request-discounts',
        name: 'sales.session.discount',
        component: () => import('/@/views/sales/session/SaleDiscountModal.vue'),
      },
    ],
  },
  {
    path: 'types',
    name: 'config.sales.sale.types',
    component: () => import('/@/views/sales/SaleTypesList.vue'),
    meta: {
      code: 'SaleType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.sales.sale.type.form',
        component: () => import('/@/views/sales/SaleTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('sale_type/getSaleType', to.params.id)
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
    path: 'cashiers',
    name: 'sales.cashiers',
    component: () => import('/@/views/sales/CashiersList.vue'),
    meta: {
      code: 'Cashier.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.cashier.form',
        component: () => import('/@/views/sales/CashierForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashier/getCashier', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'cashier-groups',
    name: 'sales.cashier.groups',
    component: () => import('/@/views/sales/CashierGroupsList.vue'),
    meta: {
      code: 'CashierGroup.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.cashier.group.form',
        component: () => import('/@/views/sales/CashierGroupForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashier_group/getCashierGroup', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'cash-registers',
    name: 'sales.cashRegisters',

    component: () => import('/@/views/sales/CashRegistersList.vue'),
    meta: {
      code: 'CashRegister.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.cashRegister.form',
        component: () => import('/@/views/sales/CashRegisterForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cash_register/getCashRegister', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'discounts',
    name: 'sales.discounts',
    component: () => import('/@/views/sales/DiscountsList.vue'),
    meta: {
      code: 'Discount.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'discounts/:id?/forms',
    name: 'sales.discount.form',
    component: () => import('/@/components/sales/DiscountFormLayout.vue'),
    children: formRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('discount/getDiscount', to.params.id)
          .then(() => {
            return 1;
          })
          .catch(() => -1);
      }
    },
  },
  {
    path: 'discount-types',
    name: 'config.sales.discount.types',
    component: () => import('/@/views/sales/DiscountTypesList.vue'),
    meta: {
      code: 'DiscountType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.sales.discount.type.form',
        component: () => import('/@/views/sales/DiscountTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('discount_type/getDiscountType', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
