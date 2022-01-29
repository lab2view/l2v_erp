import store from '../../store';

export const enterpriseRoutes = [
  {
    path: 'enterprises',
    name: 'config.structures.enterprises',
    component: () =>
      import(
        '/@/views/structures/enterprises/EnterprisesList.vue'
        ),
    meta: {
      code: 'Enterprise.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.structures.enterpriseType.form',
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
    ],
  },
];
