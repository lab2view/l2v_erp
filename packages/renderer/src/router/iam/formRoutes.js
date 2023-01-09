export const formRoutes = [
  {
    path: '',
    name: 'iam.user.form.desc',
    component: () => import('/@/views/iam/UserFormDesc.vue'),
    meta: {
      code: 'iam.user.form.desc',
      icon: 'fa fa-info',
    },
  },
  {
    path: 'privileges',
    name: 'iam.user.form.privileges',
    component: () => import('/@/views/iam/UserFormPrivilegesList.vue'),
    meta: {
      code: 'iam.user.form.privileges',
      icon: 'fa fa-info',
      requireUser: true,
    },
    children: [
      {
        path: 'form',
        name: 'iam.user.form.privileges.form',
        component: () => import('/@/views/iam/UserFormPrivilegesForm.vue'),
      },
    ],
  },
];
