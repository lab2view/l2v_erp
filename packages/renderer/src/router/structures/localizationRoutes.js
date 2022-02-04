import store from '../../store';

export const localizationRoutes = [
  {
    path: '',
    name: 'localizations',
    component: () =>
      import('/@/views/structures/localizations/LocalizationsList.vue'),
    meta: {
      code: 'Localization.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'localization.form',
        component: () =>
          import('/@/views/structures/localizations/LocalizationForm.vue'),
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
    path: 'countries',
    name: 'localizations.countries',
    component: () =>
      import('/@/views/structures/localizations/CountriesList.vue'),
    meta: {
      code: 'Country.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'country.form',
        component: () =>
          import('/@/views/structures/localizations/CountryForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store
              .dispatch('country/getCountry', to.params.id)
              .then(() => {
                return { name: to.name };
              })
              .catch(() => -1);
          }
        },
      },
      {
        path: 'activate',
        name: 'country.activate',
        component: () =>
          import('/@/views/structures/localizations/CountryActivationForm.vue'),
      },
    ],
  },
  {
    path: 'regions',
    name: 'localizations.regions',
    component: () =>
      import('/@/views/structures/localizations/RegionsList.vue'),
    meta: {
      code: 'Region.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'region.form',
        component: () =>
          import('/@/views/structures/localizations/RegionForm.vue'),
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
