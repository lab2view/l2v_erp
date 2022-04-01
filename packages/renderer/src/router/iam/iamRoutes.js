import store from '../../store';
import { formRoutes } from './formRoutes';

export const iamRoutes = [
  {
    path: 'roles',
    name: 'iam.roles',
    component: () => import('/@/views/iam/RolesList.vue'),
    meta: {
      code: 'Role.viewAny',
      feather: 'filter',
    },
    children: [
      {
        path: 'form/:id?',
        name: 'iam.role.form',
        component: () => import('/@/views/iam/RoleForm.vue'),
        beforeEnter: (to) => {
          if (to.params.id) {
            return store.dispatch('role/getRole', to.params.id)
              .then(() => {
                return 1;
              })
              .catch(() => -1);
          }
        },
      },
    ],
  },
  {
    path: 'config-role/:id',
    name: 'iam.config.role',
    component: () => import('/@/views/iam/RoleConfig.vue'),
    beforeEnter: (to) => {
      if (to.params.id) {
        return store.dispatch('role/getRole', to.params.id)
          .then(() => {
            return 1;
          })
          .catch(() => -1);
      }

      return -1;
    },
  },
  {
    path: 'users',
    name: 'iam.users',
    component: () => import('/@/views/iam/UsersList.vue'),
    meta: {
      code: 'User.viewAny',
      feather: 'filter',
    },
  },
  {
    path: 'users/:id?/forms',
    name: 'iam.users.form',
    component: () => import('/@/components/iam/UserFormLayout.vue'),
    children: formRoutes,
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
  {
    path: 'histories',
    name: 'iam.histories',
    component: () => import('/@/views/iam/HistoriesList.vue'),
    meta: {
      code: 'History.viewAny',
      feather: 'filter',
    },
  },
];
