import store from '../../store';

export const configRoutes = [
  {
    path: 'enterprise-types',
    name: 'config.structures.enterpriseType',
    component: () =>
      import(
        '/@/views/structures/configurations/enterpriseType/EnterpriseTypeList.vue'
      ),
    meta: {
      code: 'EnterpriseType.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.structures.enterpriseType.form',
        component: () =>
          import(
            '/@/views/structures/configurations/enterpriseType/EnterpriseTypeForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('enterpriseTypeConfig/getEnterpriseType', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
];
