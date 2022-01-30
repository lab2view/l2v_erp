import store from '../../store';

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
        path: 'form/:id?',
        name: 'enterprise.form',
        component: () =>
          import(
            '/@/views/structures/enterprises/EnterpriseForm.vue'
            ),
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
      {
        path: 'module/:id?',
        name: 'enterprise.module.form',
        component: () =>
          import(
            '/@/views/structures/enterprises/EnterpriseModuleForm.vue'
            ),
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
    path: 'types',
    name: 'enterprise.types',
    component: () =>
      import(
        '/@/views/structures/enterprises/EnterpriseTypesList.vue'
        ),
    meta: {
      code: 'EnterpriseType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'enterprise.type.form',
        component: () =>
          import(
            '/@/views/structures/enterprises/EnterpriseTypeForm.vue'
            ),
        beforeEnter: (to) => {
          if (to.params.id) {
            console.log('enter route');
            return store
              .dispatch('enterpriseTypeConfig/getEnterpriseType', to.params.id)
              .then(() => {
                console.log('enter enter route');
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
