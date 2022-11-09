import store from '/@/store/index.js';

export default [
  {
    path: '',
    name: 'sales.discount.form.desc',
    component: () => import('/@/views/sales/DiscountFormDesc.vue'),
    meta: {
      code: 'discount.form.desc',
      icon: 'fa fa-info',
    },
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('discount/getDiscount', to.params.id)
          .then(() => 1)
          .catch(() => -1);
      }
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
        component: () => import('/@/views/sales/DiscountArticleForm.vue'),
      },
    ],
  },
  {
    path: 'customers',
    name: 'sales.discount.form.customers',
    component: () => import('/@/views/sales/DiscountCustomersList.vue'),
    meta: {
      code: 'discount.form.customers',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
    children: [
      {
        path: 'form',
        name: 'sales.discount.form.customers.form',
        component: () => import('/@/views/sales/DiscountCustomerForm.vue'),
      },
    ],
  },
  {
    path: 'codes',
    name: 'sales.discount.form.codes',
    component: () => import('/@/views/sales/DiscountCodesList.vue'),
    meta: {
      code: 'discount.form.codes',
      icon: 'fa fa-info',
      requireDiscount: true,
    },
  },
];
