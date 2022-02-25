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
    children: [
      {
        path: 'form/:id?',
        name: 'sales.sale.form',
        component: () => import('/@/views/sales/SaleForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store.dispatch('sale/getSale', to.params.id)
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
            return store.dispatch('cashier/getCashier', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  // {
  //   path: 'cashier-sessions',
  //   name: 'sales.cashier.sessions',
  //   component: () => import('/@/views/sales/CashierSessionsList.vue'),
  //   meta: {
  //     code: 'CashierSession.viewAny',
  //     feather: 'filter',
  //   },
  //   children: [
  //     {
  //       path: 'form/:id?',
  //       name: 'sales.cashier.session.form',
  //       component: () =>
  //         import('/@/views/sales/CashierSessionForm.vue'),
  //       beforeEnter: (to) => {
  //         if (to.params.id) {
  //           return store.dispatch('cashierSession/getCashierSession', to.params.id)
  //             .then(() => {
  //               return { name: to.name };
  //             })
  //             .catch(() => -1);
  //         }
  //         return -1;
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: 'cashier-session-collections',
  //   name: 'sales.cashier.session.collections',
  //   component: () =>
  //     import('/@/views/sales/CashierSessionCollectionsList.vue'),
  //   meta: {
  //     code: 'CashierSessionCollection.viewAny',
  //     feather: 'filter',
  //   },
  //   children: [
  //     {
  //       path: 'form/:id?',
  //       name: 'sales.cashier.session.collection.form',
  //       component: () =>
  //         import('/@/views/sales/CashierSessionCollectionForm.vue'),
  //       beforeEnter: (to) => {
  //         if (to.params.id) {
  //           return store.dispatch('cashierSessionsCollection/getCashierSessionsCollection', to.params.id)
  //             .then(() => {
  //               return { name: to.name };
  //             })
  //             .catch(() => -1);
  //         }
  //         return -1;
  //       },
  //     },
  //   ],
  // },
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
            return store.dispatch('cashierGroup/getCashierGroup', to.params.id)
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
            return store.dispatch('cashRegister/getCashRegister', to.params.id)
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
        name: 'sales.discount.form',
        component: () => import('/@/views/sales/DiscountForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store.dispatch('discount/getDiscount', to.params.id)
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
        name: 'sales.discount.code.form',
        component: () => import('/@/views/sales/DiscountCodeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store.dispatch('discountCode/getDiscountCode', to.params.id)
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
        name: 'sales.discount.code.usage.form',
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
        name: 'sales.refund.form',
        component: () => import('/@/views/sales/RefundVoucherForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store.dispatch('refundVoucher/getRefundVoucher', to.params.id)
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
            return store.dispatch('discountType/getDiscountType', to.params.id)
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
