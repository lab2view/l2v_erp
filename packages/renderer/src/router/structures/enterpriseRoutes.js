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
        path: 'module/:id',
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
    path: 'create/:id?',
    name: 'enterprise.form',
    component: () =>
      import('/@/views/structures/enterprises/EnterpriseForm.vue'),
    meta: {
      code: 'enterprise.form',
      feather: 'pencil',
    },
    beforeEnter: (to) => {
      if (to.params.id) {
        return store
          .dispatch('enterprise/getEnterprise', to.params.id)
          .then(() => {
            this.meta = 'enterprise.update';
            return { name: to.name };
          })
          .catch(() => -1);
      }
    },
  },
];

export const enterpriseConfigRoutes = [
  {
    path: '',
    name: 'modules',
    component: () =>
      import(
        '/@/views/structures/modules/ModulesList.vue'
        ),
    meta: {
      code: 'Module.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'module.form',
        component: () =>
          import(
            '/@/views/structures/modules/ModuleForm.vue'
            ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('module/getModule', to.params.id)
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
    path: 'enterprise-types',
    name: 'types.entreprise',
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
        name: 'types.entreprise.form',
        component: () =>
          import(
            '/@/views/structures/enterprises/EnterpriseTypeForm.vue'
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

