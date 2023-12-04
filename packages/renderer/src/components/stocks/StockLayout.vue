<template>
  <router-view></router-view>
</template>

<script>
import store from '/@/store';
// import { moduleCode } from '/@/helpers/codes';
import ModuleSyncMixin from '/@/mixins/ModuleSyncMixin';

export default {
  name: 'StockLayout',
  mixins: [ModuleSyncMixin],
  beforeRouteEnter(routeTo, routeFrom, next) {
    // const hash = store.getters['stock_entry/getStocksHash'];
    // if (hash) {
    //   return store
    //     .dispatch('initModuleSynchronisation', {
    //       module: moduleCode.stocks,
    //       hash: hash,
    //       mutation: 'stock_entry',
    //     })
    //     .finally(() => next());
    // } else {
    const field = { page: 1, field: {} };
    return Promise.all([
      store.dispatch('stock_state/getStockStatesList', field),
      store.dispatch('article/getArticlesList', field),
      store.dispatch('stock_type/getStockTypesList', field),
      store.dispatch('provider/getStockProvidersList', field),
      store.dispatch('inventory/getInventoriesList', field),
      store.dispatch('shipping/getShippingsList', field),
      store.dispatch('stock_exit/getStockExitsList', field),
      store.dispatch('stock_entry/getStockEntriesList', field),
      // store.dispatch('getLastHash', moduleCode.stocks).then((data) => {
      //   store.commit('stock_entry/SET_STOCKS_HASH', data.hash);
      //   return data;
      // }),
    ])
      .then(() => next())
      .catch((error) => {
        console.log(error);
        next();
      });
    // }
  },
  // created() {
  //   this.initEchoSync(moduleCode.stocks, 'stock_entry');
  //   this.$store.dispatch('getLastHash', moduleCode.stocks).then((data) => {
  //     store.commit('stock_entry/SET_STOCKS_HASH', data.hash);
  //     return data;
  //   });
  // },
  created() {
    this.$store.commit('article/SET_CURRENT_ARTICLE', null);
  },
};
</script>

<style scoped></style>
