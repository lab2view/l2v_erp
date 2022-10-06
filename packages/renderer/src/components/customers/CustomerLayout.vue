<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
import { moduleCode } from '/@/helpers/codes';
import ModuleSyncMixin from '/@/mixins/ModuleSyncMixin';

export default {
  name: 'CustomerLayout',
  mixins: [ModuleSyncMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['customer/getCustomersHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.customers,
          hash: hash,
          mutation: 'customer',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('customer_type/getCustomerTypesList', field),
        store.dispatch('customer/getCustomersList', field),
        store.dispatch('customer_group/getCustomerGroupsList', field),
        store.dispatch('getLastHash', moduleCode.customers).then((data) => {
          store.commit('customer/SET_CUSTOMERS_HASH', data.hash);
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
  created() {
    this.initEchoSync(moduleCode.customers, 'customer');
  },
};
</script>

<style scoped></style>
