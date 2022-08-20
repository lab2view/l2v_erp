export const userformRoutes = [
  {
    path: '',
    name: 'enterprise.form.user.des',
    component: () => import('/@/views/structures/enterprises/EnterpriseUserFormDesc.vue'),
    meta: {
      code: 'enterprise.form.user.desc',
      icon: 'fa fa-users',
    },
  },
  {
    path: 'privileges',
    name: 'enterprise.form.iam.user.privileges',
    component: () => import('/@/views/structures/enterprises/EnterpriseUserFormPrivilegesList.vue'),
    meta: {
      code: 'enterprise.form.user.privileges',
      icon: 'fa fa-info',
      requireUser: true,
    },
    children: [
      {
        path: 'form',
        name: 'enterprise.form.iam.user.privileges.form',
        component: () =>
          import('/@/views/structures/enterprises/EnterpriseUserFormPrivileges.vue'),
      },
    ],
  },
];
