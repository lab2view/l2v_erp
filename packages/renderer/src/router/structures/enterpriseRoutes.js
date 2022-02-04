import store from '../../store';
import { formRoutes } from './formRoutes';

export const enterpriseRoutes = [
  {
    path: '',
    name: 'enterprises',
    component: () =>
      import('/@/views/structures/enterprises/EnterprisesList.vue'),
    meta: {
      code: 'Enterprise.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'enterprise-types',
        name: 'types.entreprise',
        component: () =>
          import('/@/views/structures/enterprises/EnterpriseTypesList.vue'),
        meta: {
          code: 'EnterpriseType.viewAny',
          feather: 'filter',
        },
        children: [
          {
            path: 'form/:id?',
            name: 'types.entreprise.form',
            component: () =>
              import('/@/views/structures/enterprises/EnterpriseTypeForm.vue'),
            beforeEnter: (to) => {
              if (to.params.id) {
                return store
                  .dispatch(
                    'enterpriseTypeConfig/getEnterpriseType',
                    to.params.id
                  )
                  .then(() => {
                    return { name: to.name };
                  })
                  .catch(() => -1);
              }
            },
          },
        ],
      },
      {
        path: 'module/:id',
        name: 'enterprise.module.form',
        component: () =>
          import('/@/views/structures/enterprises/EnterpriseModuleForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('enterprise/getEnterpriseModulesList', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: ':id?/forms',
    component: () =>
      import('/@/components/structures/EnterpriseFormLayout.vue'),
    children: formRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('enterprise/getEnterprise', to.params.id)
          .then(() => {
            return { name: to.name };
          })
          .catch(() => -1);
      }
    },
  },
];
