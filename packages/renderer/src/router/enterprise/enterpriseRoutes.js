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
  },
  {
    path: 'enterprise-types',
    name: 'types.enterprise',
    component: () =>
      import('/@/views/structures/enterprises/EnterpriseTypesList.vue'),
    meta: {
      code: 'EnterpriseType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'types.enterprise.form',
        component: () =>
          import('/@/views/structures/enterprises/EnterpriseTypeForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('enterprise_type/getEnterpriseType', to.params.id)
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
      import('/@/components/enterprise/EnterpriseFormLayout.vue'),
    children: formRoutes,
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('enterprise/getEnterprise', to.params.id)
          .then((data) => {
            store.commit('enterprise/SET_CURRENT_ENTERPRISE', data);
            return { name: to.name };
          })
          .catch(() => -1);
      }
    },
  },
];
