export default [
  {
    path: 'description',
    name: 'sales.discount.form.desc',
    component: () => import('/@/views/sales/DiscountFormDesc.vue'),
    meta: {
      code: 'Discount.form.desc',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'articles',
    name: 'sales.discount.form.articles',
    component: () => import('/@/views/sales/DiscountFormArticles.vue'),
    meta: {
      code: 'Discount.form.articles',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
  },
  {
    path: 'customers',
    name: 'sales.discount.form.customers',
    component: () => import('/@/views/sales/DiscountFormCustomers.vue'),
    meta: {
      code: 'Discount.form.customers',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
  },
  {
    path: 'codes',
    name: 'sales.discount.form.codes',
    component: () => import('/@/views/sales/DiscountFormCodes.vue'),
    meta: {
      code: 'Discount.form.codes',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
  },
];
