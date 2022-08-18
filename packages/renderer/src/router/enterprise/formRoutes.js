import store from "/@/store";
import {userformRoutes} from "/@/router/enterprise/userformRoutes";

export const formRoutes = [
  {
    path: 'description',
    name: 'enterprise.form.desc',
    component: () =>
      import('/@/views/structures/enterprises/EnterpriseForm.vue'),
    meta: {
      code: 'Enterprise.form.desc',
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
  {
    path: 'iam',
    name: 'enterprise.form.iam',
    component: () =>
      import('/@/views/structures/enterprises/EnterpriseIAM.vue'),
    meta: {
      code: 'enterprise.form.iam',
      icon: 'fa fa-users',
      requireEnterprise: true,
    },
    children:[
      {
        path: ':id?/forms',
        name: 'enterprise.form.iam.user',
        component: () => import('/@/components/enterprise/EnterpriseUserFormLayout.vue'),
        children: userformRoutes,
        beforeEnter: (to) => {
          if (to.params.id) {
            return store.dispatch('user/getUser', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ]

  },
];
