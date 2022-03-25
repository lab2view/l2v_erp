import store from '../../store';

export const paymentRoutes = [
  {
    path: 'transactions',
    name: 'payments.transactions',
    component: () => import('/@/views/payments/TransactionsList.vue'),
    meta: {
      code: 'Transaction.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'charges',
    name: 'payments.charges',
    component: () => import('/@/views/payments/PaymentChargesList.vue'),
    meta: {
      code: 'Charge.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'transaction-types',
    name: 'config.payments.transaction.types',
    component: () => import('/@/views/payments/TransactionTypesList.vue'),
    meta: {
      code: 'TransactionType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.payments.transaction.type.form',
        component: () => import('/@/views/payments/TransactionTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('transaction_type/getTransactionType', to.params.id)
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
    path: 'methods',
    name: 'config.payments.methods',
    component: () => import('/@/views/payments/PaymentMethodsList.vue'),
    meta: {
      code: 'PaymentMethod.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.payments.method.form',
        component: () => import('/@/views/payments/PaymentMethodForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('payment_method/getPaymentMethod', to.params.id)
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
