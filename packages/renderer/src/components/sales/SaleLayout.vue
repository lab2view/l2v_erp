<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
import { moduleCode } from '/@/helpers/codes';
import ModuleSyncMixin from '/@/mixins/ModuleSyncMixin';

export default {
  mixins: [ModuleSyncMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['discount/getSalesHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.sales,
          hash: hash,
          mutation: 'discount',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('sale_type/getSaleTypesList', field),
        store.dispatch('cash_register/getCashRegistersList', field),
        store.dispatch('cashier_group/getCashierGroupsList', field),
        store.dispatch('cashier/getCashiersList', field),
        store.dispatch('discount_type/getDiscountTypesList', field),
        store.dispatch('discount/getDiscountsList', field),
        store.dispatch('discount_code/getDiscountCodesList', field),
        store.dispatch('getLastHash', moduleCode.sales).then((data) => {
          store.commit('discount/SET_SALES_HASH', data.hash);
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
    this.initEchoSync(moduleCode.sales, 'discount');
  },
};
</script>

<style scoped></style>
