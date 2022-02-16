export const formRoutes = [
  {
    path: 'description',
    name: 'customer.form.desc',
    component: () => import('/@/views/structures/customers/CustomerForm.vue'),
    meta: {
      code: 'Customer.form.desc',
      icon: 'fa fa-info',
    },
  },
];
