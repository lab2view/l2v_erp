<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
import { moduleCode } from '/@/helpers/codes';

export default {
  name: 'IAMLayout',
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['user/getIamHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.iam,
          hash: hash,
          mutation: 'user',
        })
        .then((data) => {
          console.log('data');
          console.log(data);
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('role/getRolesList', field),
        store.dispatch('role/getActionsList', field),
        store.dispatch('user/getUsersList', field),
        store.dispatch('getLastHash', moduleCode.iam).then((data) => {
          store.commit('user/SET_IAM_HASH', data.hash);
          return data;
        }),
      ])
        .then(() => next())
        .catch((error) => {
          console.log(error);
          next();
        });
    }
  },
};
</script>

<style scoped></style>
