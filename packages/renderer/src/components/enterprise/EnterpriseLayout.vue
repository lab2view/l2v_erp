<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
import { moduleCode } from '/@/helpers/codes';

export default {
  name: 'EnterpriseLayout',
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['enterprise/getEnterpriseHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.enterprise,
          hash: hash,
          mutation: 'enterprise',
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
        store.dispatch('country/getCountriesList', field),
        store.dispatch('region/getRegionsList', field),
        store.dispatch('localization/getLocalizationsList', field),
        store.dispatch('module/getModulesList', field),
        store.dispatch('enterprise_type/getEnterpriseTypesList', field),
        store.dispatch('enterprise/getEnterprisesList', field),
        store.dispatch('getLastHash', moduleCode.enterprise).then((data) => {
          store.commit('enterprise/SET_ENTERPRISE_HASH', data.hash);
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
