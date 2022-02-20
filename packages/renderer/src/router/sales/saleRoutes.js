import store from '../../store';

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
    path: 'cashiers',
    name: 'sales.cashiers',
    component: () => import('/@/views/sales/cashiers/CashiersList.vue'),
    meta: {
      code: 'Cashier.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.cashiers.form',
        component: () => import('/@/views/sales/cashiers/CashierForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashier/getCashier', to.params.id)
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
    path: 'cashier-sessions',
    name: 'sales.cashier.sessions',
    component: () => import('/@/views/sales/cashiers/CashierSessionsList.vue'),
    meta: {
      code: 'CashierSession.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.cashier.sessions.form',
        component: () =>
          import('/@/views/sales/cashiers/CashierSessionForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashier/getCashier', to.params.id)
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
    path: 'cashier-session-collections',
    name: 'sales.cashier.session.collections',
    component: () =>
      import('/@/views/sales/cashiers/CashierSessionCollectionsList.vue'),
    meta: {
      code: 'CashierSessionCollection.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.cashier.session.collections.form',
        component: () =>
          import('/@/views/sales/cashiers/CashierSessionCollectionForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashier/getCashier', to.params.id)
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
    path: 'cashier-groups',
    name: 'config.sales.cashier.groups',
    component: () => import('/@/views/sales/cashiers/CashierGroupsList.vue'),
    meta: {
      code: 'CashierGroup.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.sales.cashier.groups.form',
        component: () => import('/@/views/sales/cashiers/CashierGroupForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashierGroup/getCashierGroup', to.params.id)
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
    path: 'cash-registers',
    name: 'config.sales.cashRegisters',

    component: () => import('/@/views/sales/cashiers/CashRegistersList.vue'),
    meta: {
      code: 'CashierRegister.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.sales.cashRegisters.form',
        component: () => import('/@/views/sales/cashiers/CashRegisterForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('cashRegister/getCashRegister', to.params.id)
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
    path: 'discounts',
    name: 'sales.discounts',
    component: () => import('/@/views/sales/DiscountsList.vue'),
    meta: {
      code: 'Discount.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.discounts.form',
        component: () => import('/@/views/sales/DiscountForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('discount/getDiscount', to.params.id)
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
    path: 'discount-codes',
    name: 'sales.discount.codes',
    component: () => import('/@/views/sales/DiscountCodesList.vue'),
    meta: {
      code: 'DiscountCode.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.discount.codes.form',
        component: () => import('/@/views/sales/DiscountCodeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('discountCode/getDiscountCode', to.params.id)
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
    path: 'discount-code-usages',
    name: 'sales.discount.code.usages',
    component: () => import('/@/views/sales/DiscountCodeUsagesList.vue'),
    meta: {
      code: 'DiscountCodeUsage.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.discount.code.usages.form',
        component: () => import('/@/views/sales/DiscountCodeUsageForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('discountCodeUsage/getDiscountCodeUsage', to.params.id)
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
    path: 'refunds',
    name: 'sales.refunds',
    component: () => import('/@/views/sales/RefundVouchersList.vue'),
    meta: {
      code: 'RefundVoucher.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'sales.refunds.form',
        component: () => import('/@/views/sales/RefundVoucherForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('refundVoucher/getRefundVoucher', to.params.id)
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
    path: 'discount-types',
    name: 'config.sales.discount.types',
    component: () => import('/@/views/sales/DiscountTypesList.vue'),
    meta: {
      code: 'Discount.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.sales.discount.types.form',
        component: () => import('/@/views/sales/DiscountTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('discount/getDiscount', to.params.id)
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
