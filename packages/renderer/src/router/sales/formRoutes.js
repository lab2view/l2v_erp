export default [
  {
    path: '',
    name: 'sales.discount.form.desc',
    component: () => import('/@/views/sales/DiscountFormDesc.vue'),
    meta: {
      code: 'discount.form.desc',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'articles',
    name: 'sales.discount.form.articles',
    component: () => import('/@/views/sales/DiscountArticlesList.vue'),
    meta: {
      code: 'discount.form.articles',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
    children: [
      {
        path: 'form',
        name: 'sales.discount.form.articles.form',
        component: () =>
          import('/@/views/sales/DiscountArticleForm.vue'),
      },
    ],
  },
  {
    path: 'customers',
    name: 'sales.discount.form.customers',
    component: () => import('/@/views/sales/DiscountFormCustomers.vue'),
    meta: {
      code: 'discount.form.customers',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
  },
  {
    path: 'codes',
    name: 'sales.discount.form.codes',
    component: () => import('/@/views/sales/DiscountFormCodes.vue'),
    meta: {
      code: 'discount.form.codes',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
  },
];
