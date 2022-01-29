import store from '../../store';

export const localizationRoutes = [
  {
    path: 'localizations',
    name: 'config.structures.localization',
    component: () =>
      import(
        '/@/views/structures/localizations/LocalizationList.vue'
      ),
    meta: {
      code: 'Localization.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.structures.localization.form',
        component: () =>
          import(
            '/@/views/structures/localizations/LocalizationForm.vue'
          ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('localization/getLocalization', to.params.id)
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
    path: 'modules',
    name: 'config.structures.module',
    component: () =>
      import(
        '/@/views/structures/modules/ModuleList.vue'
        ),
    meta: {
      code: 'Module.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.structures.module.form',
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
    path: 'regions',
    name: 'config.structures.region',
    component: () =>
      import(
        '/@/views/structures/regions/RegionList.vue'
        ),
    meta: {
      code: 'Region.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'config.structures.region.form',
        component: () =>
          import(
            '/@/views/structures/regions/RegionForm.vue'
            ),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('region/getRegion', to.params.id)
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
