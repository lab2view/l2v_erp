export const formRoutes = [
  {
    path: 'description',
    name: 'enterprise.form',
    component: () =>
      import('/@/views/structures/enterprises/EnterpriseForm.vue'),
    meta: {
      code: 'Enterprise.form.description',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'settings',
    name: 'enterprise.form.setting',
    component: () =>
      import('/@/views/structures/enterprises/EnterpriseSettings.vue'),
    meta: {
      code: 'Enterprise.form.setting',
      icon: 'fa fa-cogs',
      requireEnterprise: true,
    },
  },
];
