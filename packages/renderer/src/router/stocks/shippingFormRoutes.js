import store from '/@/store/index.js';

export default [
  {
    path: 'description',
    name: 'shipping.form.desc',
    component: () => import('/@/views/stocks/shipping/form/ShippingForm.vue'),
    meta: {
      code: 'Shipping.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: ':id/form',
    name: 'shipping.form.article.form',
    component: () =>
      import('/@/views/stocks/shipping/form/ProvisionLinesForm.vue'),
    meta: {
      code: 'Shipping.form.line',
      icon: 'fa fa-list',
      requireShipping: true,
    },
    beforeEnter: (to) => {
      return store
        .dispatch('shipping/getShipping', to.params.id)
        .then((shipping) => {
          if (to.query.stock_entry_id)
            return store
              .dispatch('stock_entry/getStockEntry', to.query.stock_entry_id)
              .then(() => 1)
              .catch(() => -1);
          else return shipping.stock_provisions.length ? 1 : -1;
        })
        .catch(() => -1);
    },
  },
];
