<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
import { moduleCode } from '/@/helpers/codes';

export default {
  name: 'StockLayout',
  beforeRouteEnter(routeTo, routeFrom, next) {
    const hash = store.getters['stock_entry/getStocksHash'];
    if (hash) {
      return store
        .dispatch('initModuleSynchronisation', {
          module: moduleCode.stocks,
          hash: hash,
          mutation: 'stock_entry',
        })
        .finally(() => next());
    } else {
      const field = { page: 1, field: {} };
      return Promise.all([
        store.dispatch('stock_state/getStockStatesList', field),
        store.dispatch('stock_type/getStockTypesList', field),
        store.dispatch('stock_provider/getStockProvidersList', field),
        store.dispatch('provision/getProvisionsList', field),
        store.dispatch('inventory/getInventoriesList', field),
        store.dispatch('shipping/getShippingsList', field),
        store.dispatch('stock_exit/getStockExitsList', field),
        store.dispatch('stock_entry/getStockEntriesList', field),
        store.dispatch('getLastHash', moduleCode.stocks).then((data) => {
          store.commit('stock_entry/SET_STOCKS_HASH', data.hash);
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
