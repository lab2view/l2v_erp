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
    path: 'articles',
    name: 'shipping.form.article',
    component: () =>
      import('/@/views/stocks/shipping/form/ProvisionLinesForm.vue'),
    meta: {
      code: 'Shipping.form.line',
      icon: 'fa fa-list',
      requireShipping: true,
    },
  },
];
